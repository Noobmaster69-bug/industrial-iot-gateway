import style from "./index.module.scss";
import Performance from "./Performance";
import Devices from "./Devices";
import Issues from "./Issues";
import System from "./System";
import Network from "./Network";
export default function Home() {
  return (
    <div className={style.container}>
      <div className={style.row1}>
        <div className={style.col1}>
          <Performance />
        </div>
      </div>
      <div className={style.row2}>
        <div className={style.col1}>
          <div className={style.row1}>
            <Devices />
          </div>
          <div className={style.row2}>
            <Issues />
          </div>
        </div>
        <div className={style.col2}>
          <System />
        </div>
        <div className={style.col3}>
          <Network />
        </div>
      </div>
    </div>
  );
}
