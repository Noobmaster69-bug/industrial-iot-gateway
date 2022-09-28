import style from "./AddChannel.module.scss";
export default function AddChanel(downService) {
  return (
    <div className={style.container}>
      <h2 className={style.header}>Add Device</h2>
      <div className={style.body}>
        <form>
          <label>Name</label>
          <input />
          <label>Model</label>
          <input />
          <label>Manufacture</label>
          <input />
          <label>Type</label>
          <input />
          <label>Device Protocol</label>
        </form>
      </div>
    </div>
  );
}
