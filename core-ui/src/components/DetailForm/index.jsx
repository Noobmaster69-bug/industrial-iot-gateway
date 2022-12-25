import { toUpperCase } from "utils";
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

      {Object.entries(keys).map(([key, value], index) => {
        return (
          <div key={`table ${index}`} className={style.row}>
            <div className={style["key"]}>
              <h4>{value.label || toUpperCase(key)}</h4>
            </div>
            <div className={style["value"]}>
              {value?.type === "ENUM" || value?.type === "BOOLEAN" ? (
                <select
                  name={key}
                  value={"" || props.values[key]}
                  onChange={(e) => {
                    onChange({
                      ...props.values,
                      [e.target.name]: e.target.value,
                    });
                  }}
                >
                  <option value="">Select {key}</option>
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
                  required={!(value.allowNull === undefined) || value.allowNull}
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
        );
      })}
    </div>
  );
}
