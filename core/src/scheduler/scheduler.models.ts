import { DataTypes, Model } from "sequelize";
import { sequelize } from "ultils";
import cron from "node-cron";
import { Devices, Channels, Protocols } from "devices";
import { northBound, southBound } from "plugin";
import pluralize from "pluralize";
class Schedules extends Model {
  declare id: number;
  declare cron: string;
  declare state: "running" | "stopping";

  static async getAllTask({ limit = Number.MAX_SAFE_INTEGER, start = 0 }) {
    const { count, rows: schedules } = await this.findAndCountAll({
      include: [
        {
          model: Devices,
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
          ],
        },
        {
          model: Channels,
          include: (await southBound.list()).map((pln) => pln.Channels),
        },
      ],
      limit,
      offset: start,
    });
    const arr = await Promise.all(
      schedules.map(async (schedule) => {
        const {
          Device: { upProtocol, downProtocol },
          Device,
          Channels: channels,
          id,
          cron,
          state,
          createdAt,
          updatedAt,
        } = schedule.toJSON() as unknown as any;
        const downPlugin = await southBound.getPlugin(downProtocol.plugin);
        const downProtocolProps =
          downProtocol[
            pluralize.singular(downPlugin?.Protocols.getTableName() + "")
          ];

        const upPlugin = await northBound.getPlugin(upProtocol.plugin);
        const upProtocolProps =
          upProtocol[
            pluralize.singular(upPlugin?.Protocols.getTableName() + "")
          ];
        const channelsProps = channels.map((channel: any) => {
          return {
            ...channel,
            ...channel[
              pluralize.singular(downPlugin?.Channels.getTableName() + "")
            ],
          };
        });
        return {
          id,
          cron,
          state,
          downProtocol: downProtocolProps,
          upProtocol: upProtocolProps,
          channels: channelsProps,
          createdAt,
          updatedAt,
          Device,
        };
      })
    );
    return { total: count, limit, start, schedules: arr };
  }

  static async getTask(id: number) {
    const scheduler = (
      await this.findByPk(id, {
        include: [
          {
            model: Devices,
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
            ],
          },
          {
            model: Channels,
            include: (await southBound.list()).map((pln) => pln.Channels),
          },
        ],
      })
    )?.toJSON();
    if (scheduler) {
      const {
        Device: { upProtocol, downProtocol },
        Device,
        Channels: channels,
        id,
        cron,
        state,
        createdAt,
        updatedAt,
      } = scheduler as unknown as any;
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
      return {
        id,
        cron,
        state,
        createdAt,
        updatedAt,
        Device,
        downProtocol: downProtocolProps,
        upProtocol: upProtocolProps,
        channels: channelsProps,
        downPlugin,
        upPlugin,
      };
    } else {
      return {};
    }
  }
}

Schedules.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: true,
    },
    cron: {
      type: DataTypes.STRING,
      validate: {
        isCron(value: string) {
          if (!cron.validate(value)) {
            throw new Error("Invalid cron");
          }
        },
      },
    },
    state: {
      type: DataTypes.ENUM,
      values: ["running", "stopping"],
      defaultValue: "running",
    },
  },
  {
    sequelize,
  }
);
export { Schedules };
