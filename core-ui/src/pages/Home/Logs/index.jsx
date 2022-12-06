import { useMqtt } from "apis";
import Skeleton from "react-loading-skeleton";
import style from "./index.module.scss";
export default function Log() {
  const { logs, isConnected } = useMqtt();

  if (!isConnected) {
    return (
      <div className={style.container} style={{ padding: 0 }}>
        <Skeleton height={"100%"} width={"100%"} count={1} />
      </div>
    );
  }
  return (
    <div className={style.container} style={{ backgroundColor: "#fff" }}>
      <h2>System Log</h2>
      <div className={style.content}>
        {logs.map((log, index) => (
          <div key={index + "log"}>{log}</div>
        ))}
      </div>
    </div>
  );
}
