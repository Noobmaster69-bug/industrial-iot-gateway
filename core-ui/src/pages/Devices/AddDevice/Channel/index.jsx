import { OldTable as Table } from "components/Table";
import { useProtocols } from "apis";
import style from "./index.module.scss";
import _ from "lodash";

export default function Channels({
  formData,
  onChange = () => {},
  onAdd = () => {},
  onDeleteRow = () => {},
  onEditRow = () => {},
}) {
  const {
    data: { southBound },
  } = useProtocols();
  const downService = southBound.find(
    (plugin) => plugin.name === formData.downProtocol?.plugin
  );
  const head = [
    {
      id: "name",
      numberic: false,
      label: "Name",
    },
    {
      id: "readWrite",
      numberic: false,
      label: "Read Write",
    },
    {
      id: "offset",
      numberic: false,
      label: "Offset",
    },
    {
      id: "scale",
      numberic: false,
      label: "Scale",
    },
    {
      id: "precision",
      numberic: false,
      label: "Precision",
    },
    ...Object.entries(downService?.channels || {}).map(([key, value]) => ({
      id: key,
      numberic: false,
      label: value?.label || key?.charAt(0)?.toUpperCase() + key.slice(1),
    })),
  ];
  const tableData = (formData?.channels || []).map((channel) => {
    const channelProps = Object.keys(channel);
    const channelData = channelProps.reduce((pre, curr) => {
      return {
        ...pre,
        [curr]: {
          value: <div>{channel[curr] || "_"}</div>,
          key: channel[curr],
        },
      };
    }, {});
    return channelData;
  });
  return (
    <div className={style["channel-panel"]}>
      <div className={style["panel-header"]}>
        <h3>Channel Panel</h3>
        <select
          onChange={(e) => {
            onChange({
              downProtocol: {
                ...formData.downProtocol,
                plugin: e.target.value,
              },
            });
          }}
          name="plugin"
          value={formData.downProtocol.plugin}
        >
          {southBound.map((protocol, index) => {
            return (
              <option value={protocol.name} key={index + "protocol"}>
                {protocol.name}
              </option>
            );
          })}
        </select>
      </div>
      <hr />
      <div className={style["table-container"]}>
        <Table
          head={head}
          className={style.table}
          data={tableData}
          checkbox
          onAdd={onAdd}
          onDeleteRow={(row) => {
            const index = tableData.findIndex((channel) => {
              return _.isEqual(row, channel);
            });
            onDeleteRow(
              formData.channels.filter((channel, id) => id !== index)
            );
          }}
          onEditRow={onEditRow}
        />
      </div>
    </div>
  );
}
