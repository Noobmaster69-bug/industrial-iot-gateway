import Table from "components/Table";
import { useProtocol } from "hooks";
import { useEffect, useState } from "react";
import style from "./AddDevice.module.scss";
import { BsArrowLeft } from "react-icons/bs";
import AddChanel from "./AddChannel";
import clsx from "clsx";
import { useNavigate } from "react-router-dom";
export default function AddBox() {
  const { data: protocols, isLoading } = useProtocol();
  const downServices = (protocols || []).filter(
    (protocol) => protocol.type === "downService"
  );
  const upServices = (protocols || []).filter(
    (protocol) => protocol.type === "upService"
  );
  const [downService, setDownService] = useState(downServices[0]);
  const [upService, setUpService] = useState(upServices[0]);
  const nevigate = useNavigate();
  useEffect(() => {
    setDownService(downServices[0]);
    setUpService(upServices[0]);
  }, [downServices, upServices]);
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
    ...(downService?.channelsProps || []).map((props) => ({
      id: props.key,
      numberic: false,
      label:
        props.label || props.key.charAt(0).toUpperCase() + props.key.slice(1),
    })),
  ];
  const tableData = [];
  function onSubmit(event) {
    event.preventDefault();
    const result = new FormData(event.target);
    const submitData = Object.fromEntries(result);
    console.log(submitData);
  }
  return (
    <form onSubmit={onSubmit} className={style.container}>
      <div className={style.header}>
        <div
          className={style["back"]}
          onClick={() => {
            nevigate(-1);
          }}
        >
          <BsArrowLeft size={24} />
        </div>
        <h2>Add Device</h2>
        <span style={{ flex: "1 1" }} />
        <input
          type="submit"
          value="Create"
          className={clsx(["button", "confirm"])}
        />
      </div>
      <div className={style.body}>
        <div className={style["basic-panel"]}>
          <h3 className={style["panel-header"]}>Basic Details</h3>
          <hr />
          <div className={style["form-container"]}>
            <table>
              <tbody>
                <tr>
                  <td>
                    <label>
                      <h4>Name</h4>
                    </label>
                  </td>
                  <td>
                    <input
                      type="text"
                      name="name"
                      placeholder="Inverter 1,..."
                    />
                  </td>
                </tr>
                <tr>
                  <td>
                    <label>
                      <h4>Manufacturer</h4>
                    </label>
                  </td>
                  <td>
                    <input
                      type="text"
                      name="manufacturer"
                      placeholder="Schneider,..."
                    />
                  </td>
                </tr>
                <tr>
                  <td>
                    <label>
                      <h4>Model</h4>
                    </label>
                  </td>
                  <td>
                    <input
                      type="text"
                      name="modelName"
                      placeholder="SUN2000,..."
                    />
                  </td>
                </tr>
                <tr>
                  <td>
                    <label>
                      <h4>Type</h4>
                    </label>
                  </td>
                  <td>
                    <input type="text" name="type" placeholder="Inverter,..." />
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <div className={style["protocol-panel"]}>
          <div className={style["panel-header"]}>
            <h3>Protocol panel</h3>
            <select
              onChange={(event) => {
                const value = event.target.value;
                setUpService(value);
              }}
            >
              {(protocols || [])
                .filter((protocol) => protocol.type === "upService")
                .map((protocol, index) => {
                  return (
                    <option value={protocol} key={index + "protocol"}>
                      {protocol.name}
                    </option>
                  );
                })}
            </select>
          </div>
          <hr />
          <div className={style["form-container"]}>
            <table>
              <tbody>
                <tr>
                  <td>
                    <label>
                      <h4>Name</h4>
                    </label>
                  </td>
                  <td>
                    <input name="protocol>>name" placeholder="AWS Server,..." />
                  </td>
                </tr>
                {(upService?.protocolProps || []).map((props, key) => (
                  <tr key={"protocol" + key}>
                    <td>
                      <label>
                        <h4>
                          {props.key[0].toUpperCase() + props.key.slice(1)}
                        </h4>
                      </label>
                    </td>
                    <td>
                      {props.type === "ENUM" ? (
                        <select name={"protocol>>" + props.key}>
                          {JSON.parse(props.values).map((value, index) => (
                            <option value={value} key={"protocol>>" + index}>
                              {value}
                            </option>
                          ))}
                        </select>
                      ) : (
                        <input
                          name={"protocol>>" + props.key}
                          placeholder={props.placeholder}
                          required={props.allowNull}
                        />
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className={style["channel-panel"]}>
          <div className={style["panel-header"]}>
            <h3>Channel Panel</h3>
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
            </select>
          </div>
          <hr />
          <div className={style["table-container"]}>
            <Table
              head={head}
              className={style.table}
              data={tableData}
              checkbox
              // onDeleteRow={onDeleteRow}
              // onAdd = {() =}
            />
          </div>
        </div>
      </div>
    </form>
  );
}
