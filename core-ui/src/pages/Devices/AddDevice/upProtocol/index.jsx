import { useProtocols } from "apis";
import { useEffect } from "react";
import style from "./index.module.scss";

export default function UpProtocol({ formData = {}, onChange = () => {} }) {
  const {
    data: { northBound },
  } = useProtocols();
  function DataTypetoInputType(type) {
    switch (type) {
      case "INTEGER":
      case "REAL":
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
      upProtocol: { ...formData.upProtocol, plugin: northBound[0]?.name },
    });
    // eslint-disable-next-line
  }, [northBound]);

  return (
    <div className={style["protocol-panel"]}>
      <div className={style["panel-header"]}>
        <h3>North Bound Panel</h3>
        <span>Create new connection</span>
        <select
          onChange={(e) => {
            onChange({
              upProtocol: {
                ...formData.upProtocol,
                plugin: e.target.value,
              },
            });
          }}
          name="ServiceId"
          value={northBound[0]?.id}
        >
          {northBound.map((protocol, index) => {
            return (
              <option value={protocol.id} key={index + "protocol"}>
                {protocol.name}
              </option>
            );
          })}
        </select>
        <span> Or</span>
        <button type="button">using existed connection</button>
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
            {Object.entries(
              northBound.find(
                (plugin) => plugin.name === formData.upProtocol.plugin
              )?.protocols || {}
            ).map(([key, value], index) => {
              return (
                <tr key={"upProtocol" + index}>
                  <td>
                    <label>
                      <h4>{key[0].toUpperCase() + key.slice(1)}</h4>
                    </label>
                  </td>
                  <td>
                    {value?.type === "ENUM" ? (
                      <select
                        name={key}
                        value={
                          formData.upProtocol[key] || value?.defaultValue || ""
                        }
                        onChange={handleChange}
                      >
                        {JSON.parse(value?.values || []).map((vl, index) => (
                          <option value={vl} key={"upProtocol>>" + index}>
                            {vl}
                          </option>
                        ))}
                      </select>
                    ) : (
                      <input
                        name={key}
                        placeholder={value?.placeholder || ""}
                        required={!value?.allowNull}
                        type={DataTypetoInputType(value?.type)}
                        value={
                          formData.upProtocol[key] || value?.defaultValue || ""
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
