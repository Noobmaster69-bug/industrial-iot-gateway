//To do refactor me

import { SortTable as Table } from "components/Table";
import { useDevice, usePlugins } from "apis";
import style from "./index.module.scss";
import _ from "lodash";

export default function Channels({
  formData,
  onChange = () => {},
  onAdd = () => {},
  onDeleteRow = () => {},
}) {
  const {
    data: { southBound },
  } = usePlugins();
  const { data: thisDevice } = useDevice({ id: formData?.Device?.id });

  const thisDownProtocol = (southBound || []).find(
    (plugin) => plugin.name === thisDevice?.downProtocol?.plugin
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
    ...Object.entries(thisDownProtocol?.channels || {}).map(([key, value]) => ({
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
          editBox={false}
        />
      </div>
    </div>
  );
}
