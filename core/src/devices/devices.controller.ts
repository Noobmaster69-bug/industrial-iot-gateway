import type { Request, Response } from "express";
import { sequelize } from "ultils";
import logger from "logger";
import { Devices, Channels, Protocols } from "./models";
import { southBound, northBound } from "plugin";
import _ from "lodash";
import pluralize from "pluralize";
import { Schedules } from "scheduler/scheduler.models";
import Scheduler from "scheduler/scheduler";
import Mainflux from "plugin/northBound/Mainflux/mainflux";
interface DeviceBody {
  name: string;
  modelName?: string;
  manufacturer?: string;
  type?: string;
  upProtocol?: {
    name: string;
    plugin: string;
  };
  downProtocol?: {
    name: string;
    plugin: string;
  };
  channels?: Array<{
    name: string;
    readWrite: "R" | "W" | "WR";
    offset: number;
    scale: number;
    precision: number;
  }>;
  key: string;
}

class DeviceController {
  public static async newDevice(req: Request, res: Response) {
    const {
      name,
      modelName,
      manufacturer,
      type,
      channels,
      downProtocol,
      upProtocol,
      key,
    } = req.body as unknown as DeviceBody;
    try {
      console.log(req.body);
      // parse downProtocol object
      const downPlugin = await southBound.getPlugin(downProtocol?.plugin);
      const downPluginProps: any = _.omit(downProtocol, ["name", "plugin"]);

      // parse upProtocol object
      const upPlugin = await northBound.getPlugin(upProtocol?.plugin);
      const upPluginProps: any = _.omit(upProtocol, ["name", "plugin"]);
      if (downPlugin && upPlugin) {
        await sequelize.transaction(async (t) => {
          const result = await Devices.create(
            {
              name,
              modelName,
              manufacturer,
              type,
              downProtocol: {
                name: downProtocol?.name,
                plugin: downProtocol?.plugin,
                type: "downProtocol",
                // Eager loading plugin table
                [pluralize.singular(downPlugin?.Protocols.getTableName() + "")]:
                  downPluginProps,
              },
              upProtocol: {
                name: upProtocol?.name,
                plugin: upProtocol?.plugin,
                type: "upProtocol",
                // Eager loading plugin table
                [pluralize.singular(upPlugin?.Protocols.getTableName() + "")]:
                  upPluginProps,
              },
              Channels: channels?.map((channel) => {
                // Parse channels object
                const {
                  name,
                  readWrite,
                  offset,
                  scale,
                  precision,
                  ...pluginChannelProps
                } = channel;
                return {
                  name,
                  readWrite,
                  offset,
                  scale,
                  precision,
                  // add plugin props
                  plugin: downProtocol?.plugin,
                  // Eager loading plugin channel table
                  [pluralize.singular(downPlugin.Channels.getTableName() + "")]:
                    pluginChannelProps,
                };
              }),
              deviceKey: key,
            },
            {
              // Include other table
              include: [
                {
                  model: Protocols,
                  as: "upProtocol",
                  include: [{ model: upPlugin.Protocols }],
                },
                {
                  model: Protocols,
                  as: "downProtocol",
                  include: [
                    {
                      model: downPlugin.Protocols,
                    },
                  ],
                },
                {
                  model: Channels,
                  include: [
                    {
                      model: downPlugin.Channels,
                    },
                  ],
                },
              ],
              transaction: t,
            }
          );
          res.send(result);
        });
        await Mainflux.reload();
      } else {
        throw new Error("invalid plugin");
      }
    } catch (err) {
      logger.warn(err);
      console.log(err);
      res.status(400).send(err);
    }
  }
  public static async getAllDevices(req: Request, res: Response) {
    const { name, limit, start, order, orderBy } = req.query as unknown as {
      name: string;
      limit: number;
      start: number;
      order: "desc" | "asc";
      orderBy:
        | "name"
        | "modelName"
        | "upProtocol"
        | "downProtocol"
        | "createAt";
    };
    let _orderBy: Array<any> = [orderBy || "name"];
    if (_orderBy[0] === "downProtocol" || _orderBy[0] === "upProtocol") {
      _orderBy = [_orderBy[0], "name"];
    }
    const result = await Devices.findAndCountAll({
      where: JSON.parse(
        JSON.stringify({
          name,
        })
      ),
      limit: limit || 10,
      offset: start || 0,
      include: [
        {
          model: Protocols,
          as: "upProtocol",
          attributes: ["name"],
        },
        {
          model: Protocols,
          as: "downProtocol",
          attributes: ["name"],
        },
        {
          model: Channels,
        },
      ],
      //@ts-ignore
      order: [[..._orderBy, (order || "DESC").toUpperCase()]],
    });
    res.send({
      limit: limit || 10,
      start: start || 0,
      devices: result.rows.map((e) => e.toJSON()),
      total: result.count,
    });
  }
  public static async getDevice(req: Request, res: Response) {
    const { id, name } = req.query as unknown as { id: number; name: string };
    const result = (
      await Devices.findOne({
        where: JSON.parse(
          JSON.stringify({
            name,
            id,
          })
        ),
        include: [
          {
            model: Protocols,
            as: "upProtocol",
            include: (await northBound.list()).map((pln) => pln.Protocols),
          },
          {
            model: Protocols,
            as: "downProtocol",
            include: (await southBound.list()).map((pln) => pln.Protocols),
          },
          {
            model: Channels,
            include: (await southBound.list()).map((pln) => pln.Channels),
          },
        ],
      })
    )?.toJSON();
    if (result) {
      const {
        name,
        modelName,
        manufacturer,
        type,
        upProtocol,
        downProtocol,
        deviceKey,
        Channels: channels,
      } = result as unknown as any;
      const downPlugin = await southBound.getPlugin(downProtocol.plugin);
      const downProtocolProps =
        downProtocol[
          pluralize.singular(downPlugin?.Protocols.getTableName() + "")
        ];
      const upPlugin = await northBound.getPlugin(upProtocol.plugin);
      const upProtocolProps =
        upProtocol[pluralize.singular(upPlugin?.Protocols.getTableName() + "")];
      const channelsProps = channels.map((channel: any) => {
        return {
          ...channel,
          ...channel[
            pluralize.singular(downPlugin?.Channels.getTableName() + "")
          ],
        };
      });
      res.send({
        name,
        modelName,
        manufacturer,
        type,
        deviceKey,
        downProtocol: { plugin: downProtocol.plugin, ...downProtocolProps },
        upProtocol: { plugin: upProtocol.plugin, ...upProtocolProps },
        channels: channelsProps,
      });
    } else {
      res.sendStatus(401);
    }
  }
  public static async deleteDevices(req: Request, res: Response) {
    const { id } = req.query as unknown as { id: number };
    const device = await Devices.findByPk(id, {
      include: Schedules,
    });
    try {
      sequelize.transaction(async (t) => {
        //@ts-ignore
        const schedules = device?.toJSON().Schedules;

        await device?.destroy({ transaction: t });
        //@ts-ignore
        schedules.forEach((schedule) => {
          Scheduler.delete(schedule.id);
        });
      });
    } catch (err) {
      return res.sendStatus(400);
    }
    return res.send(200);
  }
  public static async getDeviceStatus(_req: Request, res: Response) {
    const active = await Devices.count({ where: { status: "active" } });
    const dormant = await Devices.count({ where: { status: "dormant" } });
    const total = await Devices.count();
    res.send({ active, dormant, total });
  }

  public static async getConnections(req: Request, res: Response) {
    const {
      types = ["upProtocol", "downProtocol"],
      start,
      limit,
    } = req.query as unknown as {
      types: Array<"upProtocol" | "downProtocol">;
      start: number;
      limit: number;
    };
    const includes = (
      await Promise.all(
        types.map(async (type) => {
          if (type === "upProtocol") {
            const temp = await northBound.list();
            return temp.map((plugin) => plugin.Protocols);
          } else {
            const temp = await southBound.list();
            return temp.map((plugin) => plugin.Protocols);
          }
        })
      )
    ).flat();
    const { rows, count } = await Protocols.findAndCountAll({
      where: {
        type: types,
      },
      limit: limit || 10,
      offset: start || 0,
      //@ts-ignore
      include: includes,
    });

    res.send({
      connections: rows.map((row) => {
        return {
          name: row.name,
          plugin: row.plugin,
          //@ts-ignore
          ...row[
            row.plugin[0]?.toUpperCase() + row.plugin.slice(1) + "Protocol"
          ].toJSON(),
        };
      }),
      total: count,
      limit: limit || 10,
      start: start || 0,
    });
  }
}
export { DeviceController };
