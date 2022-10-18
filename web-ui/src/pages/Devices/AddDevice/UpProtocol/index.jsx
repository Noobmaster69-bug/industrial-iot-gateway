import { useProtocol } from "apis";
import { useEffect } from "react";
import style from "./index.module.scss";

export default function UpProtocol({ formData = {}, onChange = () => {} }) {
  const upServices = (useProtocol().data || []).filter(
    (protocol) => protocol.type === "upService"
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
      upProtocol: { ...formData.upProtocol, [e.target.name]: e.target.value },
    });
  }
  useEffect(() => {
    onChange({
      upProtocol: { ...formData.upProtocol, ServiceId: upServices[0].id },
    });
    // eslint-disable-next-line
  }, []);
  return (
    <div className={style["protocol-panel"]}>
      <div className={style["panel-header"]}>
        <h3>Up Protocol Panel</h3>
        <select
          onChange={(e) => {
            onChange({
              upProtocol: {
                ...formData.upProtocol,
                ServiceId: Number(e.target.value),
              },
            });
          }}
          name="ServiceId"
          value={formData.upProtocol.ServiceId || upServices[0].id}
        >
          {upServices.map((protocol, index) => {
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
                  value={formData.upProtocol.name || ""}
                  onChange={handleChange}
                />
              </td>
            </tr>
            {(
              upServices.find(
                (service) => service.id === formData.upProtocol.ServiceId
              )?.protocolProps || []
            ).map((props, key) => {
              return (
                <tr key={"upProtocol" + key}>
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
                          formData.upProtocol[props.key] ||
                          props.defaultValue ||
                          ""
                        }
                        onChange={handleChange}
                      >
                        {JSON.parse(props.values).map((value, index) => (
                          <option value={value} key={"upProtocol>>" + index}>
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
                          formData.upProtocol[props.key] ||
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
