import { toUpperCase } from "utils";
import style from "./index.module.scss";
export default function DetailPanel(props) {
  const { data } = props;
  console.log(data);
  return (
    <div className={style["container"]}>
      {Object.entries(data).map(([key, value], index) => {
        return (
          <div key={index} className={style.row}>
            <div className={style["key"]}>
              <h4>{value || toUpperCase(key)}</h4>
            </div>
            <div className={style["value"]}> {value}</div>
          </div>
        );
      })}
    </div>
  );
}
