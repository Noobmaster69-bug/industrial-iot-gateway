import style from "./index.module.scss";

import Performance from "./Performance";
import Devices from "./Devices";
import Issues from "./Issues";
import System from "./System";
import Network from "./Network";
import Log from "./Logs";
import Paper from "components/Paper";
import clsx from "clsx";

export default function Overview() {
  return (
    <div className={style.container}>
      <Paper className={clsx(style["grid-item"], style["grid-item-1"])}>
        <Performance />
      </Paper>
      <Paper className={clsx(style["grid-item"], style["grid-item-2"])}>
        <Network />
      </Paper>
      <Paper className={clsx(style["grid-item"], style["grid-item-3"])}>
        <Devices />
      </Paper>
      <Paper className={clsx(style["grid-item"], style["grid-item-4"])}>
        <System />
      </Paper>
      <Paper className={clsx(style["grid-item"], style["grid-item-5"])}>
        <Log />
      </Paper>
      <Paper className={clsx(style["grid-item"], style["grid-item-6"])}>
        <Issues />
      </Paper>
    </div>
  );
}
