import { useMqtt } from "apis";
import Skeleton from "react-loading-skeleton";
import style from "./index.module.scss";
export default function Log() {
  const { logs, isConnected } = useMqtt();

  if (!isConnected) {
    return (
      <div className={style.container} style={{ padding: 0 }}>
        <Skeleton
          width={"100%"}
          count={1}
          containerClassName="skeleton"
          className="skeleton"
        />
      </div>
    );
  }
  return (
    <div className={style.container}>
      <h2>System Log</h2>
      <div className={style.content}>
        {logs.map((log, index) => (
          <div key={index + "log"}>{log}</div>
        ))}
      </div>
    </div>
  );
}
