import Popup from "reactjs-popup";
import style from "./dialogbox.module.scss";
import clsx from "clsx";
export default function DialogBox({
  children,
  onConfirm = () => {},
  trigger,
  cancel = "Cancel",
  confirm = "Confirm",
  className,
}) {
  return (
    <Popup
      trigger={trigger}
      modal
      contentStyle={{
        borderRadius: "8px",
        width: "max-content",
        backgroundColor: "var(--background)",
        padding: 0,
        overflow: "hidden",
      }}
      nested
    >
      {(close) => (
        <div className={clsx([style.container, className])}>
          <div className={style.content}>{children}</div>
          <span style={{ flex: "1 1", boxSizing: "border-box" }} />
          <div className={style["tool-bar"]}>
            <div
              className={clsx([style.cancel, style.button])}
              onClick={() => close()}
            >
              {cancel}
            </div>
            <div
              className={clsx([style.confirm, style.button])}
              onClick={() => {
                onConfirm();
                close();
              }}
            >
              {confirm}
            </div>
          </div>
        </div>
      )}
    </Popup>
  );
}
