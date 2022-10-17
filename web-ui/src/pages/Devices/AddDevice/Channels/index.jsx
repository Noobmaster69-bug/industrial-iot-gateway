import Table from "components/Table";
import { useProtocol } from "apis";
import style from "./index.module.scss";
export default function Channels({
  formData,
  onChange = () => {},
  onAdd = () => {},
  onDeleteRow = () => {},
  onEditRow = () => {},
}) {
  const downServices = (useProtocol().data || []).filter(
    (protocol) => protocol.type === "downService"
  );
  const downService = (downServices || []).find(
    (service) => service.id === formData.downProtocol.ServiceId
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
    ...(downService?.channelsProps || []).map((props) => ({
      id: props.key,
      numberic: false,
      label:
        props.label || props.key.charAt(0).toUpperCase() + props.key.slice(1),
    })),
  ];
  const tableData = (formData?.channels || []).map((channel) => {
    const channelProps = Object.keys(channel);
    const channelData = channelProps.reduce((pre, curr) => {
      return {
        ...pre,
        [curr]: {
          value: <div>{channel[curr]}</div>,
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
                ServiceId: Number(e.target.value),
              },
            });
          }}
          name="ServiceId"
          value={formData.downProtocol.ServiceId}
        >
          {downServices.map((protocol, index) => {
            return (
              <option value={protocol.id} key={index + "protocol"}>
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
          onDeleteRow={onDeleteRow}
          onEditRow={onEditRow}
        />
      </div>
    </div>
  );
}
