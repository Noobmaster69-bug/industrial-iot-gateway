import Popup from "reactjs-popup";
import style from "./ConfirmBox.module.scss";
import clsx from "clsx";
export default function ConfirmBox({
  children,
  onConfirm = () => {},
  trigger,
  cancel = "Cancel",
  confirm = "Confirm",
  open = false,
  onClose = () => {},
}) {
  return (
    <Popup
      open={open}
      trigger={trigger}
      modal
      contentStyle={{ borderRadius: "12px", width: "max-content" }}
      onClose={onClose}
    >
      {(close) => (
        <div className={style.PopUp}>
          <div className={style.content}>{children}</div>
          <div className={style.toolBar}>
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
