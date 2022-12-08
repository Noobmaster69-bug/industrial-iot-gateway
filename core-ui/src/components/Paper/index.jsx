import style from "./index.module.scss";
import clsx from "clsx";

export default function Paper({ className, children }) {
  return <div className={clsx(style["container"], className)}>{children}</div>;
}
