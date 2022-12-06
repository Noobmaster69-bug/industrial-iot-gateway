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
}
export { DeviceController };
