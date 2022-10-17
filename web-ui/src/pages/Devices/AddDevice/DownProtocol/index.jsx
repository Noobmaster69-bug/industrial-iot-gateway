import { useProtocol } from "apis";
import { useEffect } from "react";
import style from "./index.module.scss";

export default function DownProtocol({ formData = {}, onChange = () => {} }) {
  const downServices = (useProtocol().data || []).filter(
    (protocol) => protocol.type === "downService"
  );
  function DataTypetoInputType(type) {
    switch (type) {
      case "INTEGER":
        return "number";
      default:
        return "text";
    }
  }
  function handleChange(e) {
    onChange({
      downProtocol: {
        ...formData.downProtocol,
        [e.target.name]: e.target.value,
      },
    });
  }
  useEffect(() => {
    onChange({
      downProtocol: { ...formData.downProtocol, ServiceId: downServices[0].id },
    });
  }, []);
  return (
    <div className={style["protocol-panel"]}>
      <div className={style["panel-header"]}>
        <h3>Down Protocol Panel</h3>
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
                  name="name"
                  placeholder="AWS Server,..."
                  value={formData.downProtocol.name || ""}
                  onChange={handleChange}
                />
              </td>
            </tr>
            {(
              downServices.find(
                (service) => service.id == formData.downProtocol.ServiceId
              )?.protocolProps || []
            ).map((props, key) => {
              return (
                <tr key={"downProtocol" + key}>
                  <td>
                    <label>
                      <h4>{props.key[0].toUpperCase() + props.key.slice(1)}</h4>
                    </label>
                  </td>
                  <td>
                    {props.type === "ENUM" ? (
                      <select
                        name={props.key}
                        value={
                          formData.downProtocol[props.key] ||
                          props.defaultValue ||
                          ""
                        }
                        onChange={handleChange}
                      >
                        {JSON.parse(props.values).map((value, index) => (
                          <option value={value} key={"downProtocol>>" + index}>
                            {value}
                          </option>
                        ))}
                      </select>
                    ) : (
                      <input
                        name={props.key}
                        placeholder={props.placeholder}
                        required={!props.allowNull}
                        type={DataTypetoInputType(props.type)}
                        value={
                          formData.downProtocol[props.key] ||
                          props.defaultValue ||
                          ""
                        }
                        onChange={handleChange}
                      />
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
