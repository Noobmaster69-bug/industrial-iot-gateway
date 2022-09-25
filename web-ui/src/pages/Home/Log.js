import { useSocket } from "context";
import style from "./log.module.scss";
export default function Log() {
  const { logs } = useSocket();
  return (
    <div className={style.container}>
      {logs.map((log) => (
        <div>{log}</div>
      ))}
    </div>
  );
}
