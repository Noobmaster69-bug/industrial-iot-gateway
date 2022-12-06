import style from "./index.module.scss";

import Performance from "./Performance";
import Devices from "./Devices";
import Issues from "./Issues";
import System from "./System";
import Network from "./Network";
import Log from "./Logs";

import clsx from "clsx";

export default function Overview() {
  return (
    <div className={style.container}>
      <div className={clsx(style["grid-item"], style["grid-item-1"])}>
        <Performance />
      </div>
      <div className={clsx(style["grid-item"], style["grid-item-2"])}>
        <Network />
      </div>
      <div className={clsx(style["grid-item"], style["grid-item-3"])}>
        <Devices />
      </div>
      <div className={clsx(style["grid-item"], style["grid-item-4"])}>
        <System />
      </div>
      <div className={clsx(style["grid-item"], style["grid-item-5"])}>
        <Log />
      </div>
      <div className={clsx(style["grid-item"], style["grid-item-6"])}>
        <Issues />
      </div>
    </div>
  );
}
