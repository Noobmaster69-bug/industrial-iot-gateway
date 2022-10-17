import clsx from "clsx";
import style from "./index.module.scss";
export default function Paper({ children, className }) {
  return <div className={clsx(style.container, className)}>{children}</div>;
}
