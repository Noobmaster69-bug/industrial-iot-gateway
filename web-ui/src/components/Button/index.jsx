import style from "./index.module.scss";
import clsx from "clsx";

export function Button({ type = "confirm", children }) {
  return (
    <button
      className={clsx(
        style.button,
        type === "cancel" ? style.cancel : style.confirm
      )}
    >
      {children}
    </button>
  );
}
