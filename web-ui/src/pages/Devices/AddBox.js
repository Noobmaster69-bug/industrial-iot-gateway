import Table from "components/Table";
import { useProtocol } from "hooks";
import { useState } from "react";
import style from "./AddBox.module.scss";
import AddChanel from "./AddChannel";
export default function AddBox() {
  const { data: protocols, isLoading } = useProtocol();
  const downServices = (protocols || []).filter(
    (protocol) => protocol.type === "downService"
  );
  const [downService, setDownService] = useState(downServices[0]);
  if (isLoading) {
    return <div></div>;
  }
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
    ...downService.channelsProps.map((props) => ({
      id: props.key,
      numberic: false,
      label:
        props.label || props.key.charAt(0).toUpperCase() + props.key.slice(1),
    })),
  ];
  const tableData = [];
  return (
    <div className={style.container}>
      <h2 className={style.header}>Add Device</h2>
      <div className={style.body}>
        <form>
          <label>Name</label>
          <input />
          <label>Model</label>
          <input />
          <label>Manufacture</label>
          <input />
          <label>Type</label>
          <input />
          <label>Device Protocol</label>
          <select
            onChange={(event) => {
              const value = event.target.value;
              setDownService(value);
            }}
          >
            {(protocols || [])
              .filter((protocol) => protocol.type === "downService")
              .map((protocol, index) => {
                return (
                  <option value={protocol} key={index + "protocol"}>
                    {protocol.name}
                  </option>
                );
              })}
            <option value="test">Test</option>
          </select>
        </form>
        <div>
          <Table
            head={head}
            className={style.table}
            data={tableData}
            checkbox
            // onDeleteRow={onDeleteRow}
            AddContent={<AddChanel />}
          />
        </div>
      </div>
    </div>
  );
}
