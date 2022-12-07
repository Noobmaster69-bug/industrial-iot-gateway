import { useProtocols } from "apis";
import { useEffect } from "react";
import style from "./index.module.scss";

export default function DownProtocol({ formData = {}, onChange = () => {} }) {
  const {
    data: { southBound },
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
      downProtocol: {
        ...formData.downProtocol,
        [e.target.name]: e.target.value,
      },
    });
  }
  useEffect(() => {
    onChange({
      downProtocol: { ...formData.downProtocol, plugin: southBound[0]?.name },
    });
    // eslint-disable-next-line
  }, [southBound]);

  return (
    <div className={style["protocol-panel"]}>
      <div className={style["panel-header"]}>
        <h3>North Bound Panel</h3>
        <select
          onChange={(e) => {
            onChange({
              downProtocol: {
                ...formData.downProtocol,
                plugin: e.target.value,
              },
            });
          }}
          name="ServiceId"
          value={southBound[0]?.id}
        >
          {southBound.map((protocol, index) => {
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
                  placeholder="Modbus RTU"
                  value={formData.downProtocol.name || ""}
                  onChange={handleChange}
                />
              </td>
            </tr>
            {Object.entries(
              southBound.find(
                (plugin) => plugin.name === formData.downProtocol.plugin
              )?.protocols || {}
            ).map(([key, value], index) => {
              return (
                <tr key={"downProtocol" + index}>
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
                          formData.downProtocol[key] ||
                          value?.defaultValue ||
                          ""
                        }
                        onChange={handleChange}
                      >
                        {JSON.parse(value?.values || []).map((vl, index) => (
                          <option value={vl} key={"downProtocol>>" + index}>
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
                          formData.downProtocol[key] ||
                          value?.defaultValue ||
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
