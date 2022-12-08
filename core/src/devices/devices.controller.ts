import type { Request, Response } from "express";
import { sequelize } from "ultils";
import logger from "logger";
import { Devices, Channels, Protocols } from "./models";
import { southBound, northBound } from "plugin";
import _ from "lodash";
import pluralize from "pluralize";
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
    } = req.body as unknown as DeviceBody;
    try {
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
                // Eager loading plugin table
                [pluralize.singular(downPlugin?.Protocols.getTableName() + "")]:
                  downPluginProps,
              },
              upProtocol: {
                name: upProtocol?.name,
                plugin: upProtocol?.plugin,
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
      } else {
        throw new Error("invalid plugin");
      }
    } catch (err) {
      console.log(err);
      logger.warn(err);
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
      _orderBy = [{ model: Protocols, as: orderBy[0] }, "name"];
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
    const device = await Devices.findByPk(id);
    await device?.destroy();
    res.send(200);
  }
  public static async getDeviceStatus(_req: Request, res: Response) {
    const active = await Devices.count({ where: { status: "active" } });
    const dormant = await Devices.count({ where: { status: "dormant" } });
    const total = await Devices.count();
    res.send({ active, dormant, total });
  }
}
export { DeviceController };
