import Popup from "reactjs-popup";
import style from "./ConfirmBox.module.scss";
import clsx from "clsx";
export default function ConfirmBox({
  children,
  onConfirm = () => {},
  trigger,
  cancel = "Cancel",
  confirm = "Confirm",
}) {
  return (
    <Popup
      trigger={trigger}
      modal
      contentStyle={{ borderRadius: "20px", width: "max-content" }}
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
