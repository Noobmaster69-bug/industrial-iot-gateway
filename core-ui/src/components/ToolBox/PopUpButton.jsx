import clsx from "clsx";
import Popup from "reactjs-popup";
import style from "./PopUp.module.scss";

export default function PopUp({
  children,
  onConfirm = () => {},
  onCancel = () => {},
  buttonLabel = "",
  trigger,
  cancel = "Cancel",
  confirm = "Confirm",
  className,
  open,
}) {
  return (
    <div className={style[""]}>
      <button>{buttonLabel}</button>
      <Popup
        open={open}
        trigger={trigger}
        modal
        contentStyle={{
          borderRadius: "8px",
          width: "max-content",
          padding: 0,
          overflow: "hidden",
        }}
        nested
        closeOnEscape={false}
        closeOnDocumentClick={false}
      >
        {(close) => (
          <div className={clsx([style.container, className])}>
            <div className={style.content}>{children}</div>
            <span style={{ flex: "1 1", boxSizing: "border-box" }} />
            <div className={style["tool-bar"]}>
              <div
                className={clsx([style.cancel, style.button])}
                onClick={() => {
                  onCancel();
                  close();
                }}
              >
                {cancel}
              </div>
              <div
                className={clsx([style.confirm, style.button])}
                onClick={() => {
                  onConfirm();
                  // close();
                }}
              >
                {confirm}
              </div>
            </div>
          </div>
        )}
      </Popup>
    </div>
  );
}
