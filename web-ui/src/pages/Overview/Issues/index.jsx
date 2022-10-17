import style from "./issues.module.scss";
export default function Issues() {
  return (
    <div className={style.container}>
      <h2>Activity Issues</h2>
      <div className={style.content}>
        <div>
          <h1>0</h1>
          <span style={{ color: "#F17B62" }}>Error</span>
        </div>
        <div>
          <h1>0</h1>
          <span style={{ color: "#FCBA16" }}>Warning</span>
        </div>
      </div>
    </div>
  );
}
