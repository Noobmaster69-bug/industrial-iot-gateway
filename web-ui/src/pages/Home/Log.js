import { useSocket } from "context";
import Skeleton from "react-loading-skeleton";
import style from "./log.module.scss";
export default function Log() {
  const { logs, isConnected } = useSocket();
  if (!isConnected) {
    return (
      <div className={style.container} style={{ padding: 0 }}>
        <Skeleton height={"100%"} width={"100%"} count={1} />
      </div>
    );
  }
  return (
    <div
      className={style.container}
      style={{ backgroundColor: "#fff", overflowY: "auto" }}
    >
      {logs.map((log, index) => (
        <div key={index + "log"}>{log}</div>
      ))}
    </div>
  );
}
