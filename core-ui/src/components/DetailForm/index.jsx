import style from "./index.module.scss";
/**
 *
 * @param {import(".").DetailProps} props
 * @returns
 */
export default function DetailForm(props) {
  const { keys = {}, onChange = () => {}, values = {}, header } = props;
  function DataTypetoInputType(type) {
    switch (type) {
      case "INTEGER":
      case "REAL":
        return "number";
      default:
        return "text";
    }
  }
  return (
    <div className={style["container"]}>
      {typeof header === "string" ? (
        <h3 className={style["panel-header"]}>{header}</h3>
      ) : (
        header
      )}

      {Object.entries(keys).map(([key, value], index) => (
        <div key={`table ${index}`} className={style.row}>
          <div className={style["key"]}>
            <h4>{value.label || key[0].toUpperCase() + key.slice(1)}</h4>
          </div>
          <div className={style["value"]}>
            {value?.type === "ENUM" || value?.type === "BOOLEAN" ? (
              <select
                name={key}
                value={value?.defaultValue || ""}
                onChange={(e) => {
                  onChange({
                    ...props.values,
                    [e.target.name]: e.target.value,
                  });
                }}
              >
                {value?.type === "ENUM" &&
                  value?.values.map((_value, index) => {
                    return (
                      <option value={_value} key={"option" + index}>
                        {_value}
                      </option>
                    );
                  })}
                {value?.type === "BOOLEAN" && (
                  <>
                    <option value={true}>true</option>
                    <option value={false}>true</option>
                  </>
                )}
              </select>
            ) : (
              <input
                name={key}
                placeholder={value?.placeholder || ""}
                required={!(value.allowNull || true)}
                type={DataTypetoInputType(value?.type)}
                value={values[key] || value?.defaultValue || ""}
                onChange={(e) => {
                  onChange({
                    ...props.values,
                    [e.target.name]: e.target.value,
                  });
                }}
              />
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
