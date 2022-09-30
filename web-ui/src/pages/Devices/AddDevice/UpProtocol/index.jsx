import style from "./index.module.scss";

export default function UpProtocol({ upServices, upService, setUpService }) {
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
        <h3>Up Protocol Panel</h3>
        <select
          onChange={(event) => {
            const value = event.target.value;
            setUpService(value);
          }}
        >
          {upServices.map((protocol, index) => {
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
                <input name="upProtocol>>name" placeholder="AWS Server,..." />
              </td>
            </tr>
            {(upService?.protocolProps || []).map((props, key) => (
              <tr key={"upProtocol" + key}>
                <td>
                  <label>
                    <h4>{props.key[0].toUpperCase() + props.key.slice(1)}</h4>
                  </label>
                </td>
                <td>
                  {props.type === "ENUM" ? (
                    <select name={"upProtocol>>" + props.key}>
                      {JSON.parse(props.values).map((value, index) => (
                        <option value={value} key={"upProtocol>>" + index}>
                          {value}
                        </option>
                      ))}
                    </select>
                  ) : (
                    <input
                      name={"upProtocol>>" + props.key}
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
