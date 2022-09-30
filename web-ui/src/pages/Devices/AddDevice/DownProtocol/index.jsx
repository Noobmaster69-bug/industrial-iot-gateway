import style from "./index.module.scss";

export default function DownProtocol({
  downServices,
  setDownService,
  downService,
}) {
  function DataTypetoInputType(type) {
    switch (type) {
      case "INTEGER":
        return "number";
      default:
        return "text";
    }
  }

  return (
    <div className={style["protocol-panel"]}>
      <div className={style["panel-header"]}>
        <h3>Down Protocol Panel</h3>
        <select
          onChange={(event) => {
            const value = event.target.value;
            setDownService(value);
          }}
          value={downService}
        >
          {downServices.map((protocol, index) => {
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
                <input
                  name="downProtocol>>name"
                  placeholder="Modbus Device,..."
                />
              </td>
            </tr>
            {(downService?.protocolProps || []).map((props, key) => (
              <tr key={"downProtocol" + key}>
                <td>
                  <label>
                    <h4>{props.key[0].toUpperCase() + props.key.slice(1)}</h4>
                  </label>
                </td>
                <td>
                  {props.type === "ENUM" ? (
                    <select name={"downProtocol>>" + props.key}>
                      {JSON.parse(props.values).map((value, index) => (
                        <option value={value} key={"downProtocol>>" + index}>
                          {value}
                        </option>
                      ))}
                    </select>
                  ) : (
                    <input
                      name={"downProtocol>>" + props.key}
                      placeholder={props.placeholder}
                      required={!props.allowNull}
                      type={DataTypetoInputType(props.type)}
                      defaultValue={props.defaultValue}
                    />
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
