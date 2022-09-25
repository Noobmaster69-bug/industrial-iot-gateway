import style from "./system.module.scss";
import { useSocket } from "context";
import Skeleton from "react-loading-skeleton";
export default function System() {
  const { performance, isConnected } = useSocket();
  if (!isConnected) {
    return (
      <div className={style.container} style={{ padding: 0, display: "block" }}>
        <Skeleton height={"100%"} width={"100%"} count={1} />
      </div>
    );
  }
  function secondToWeek(second) {
    const secondPerWeek = 604800;
    const secondPerDay = 86400;
    const secondPerHour = 3600;
    const secondPerMinute = 60;
    const getInteger = (b, a) => {
      return (a - (a % b)) / b;
    };
    function addLeadingZeros(num, totalLength) {
      return String(num).padStart(totalLength, "0");
    }
    let week = getInteger(secondPerWeek, second);
    let day = getInteger(secondPerDay, second) - week * 7;
    let hour = getInteger(secondPerHour, second) - (week * 7 + day) * 24;
    let minute =
      getInteger(secondPerMinute, second) - ((week * 7 + day) * 24 + hour) * 60;
    let sc = second - (((week * 7 + day) * 24 + hour) * 60 + minute) * 60;
    return (
      week +
      "w " +
      day +
      "d " +
      addLeadingZeros(hour, 2) +
      "h " +
      addLeadingZeros(minute, 2) +
      "m " +
      addLeadingZeros(sc, 2) +
      "s "
    );
  }
  return (
    <div
      className={style.container}
      style={{
        display: "flex",
        flexDirection: "column",
        backgroundColor: "#fff",
      }}
    >
      <h2>System</h2>
      <div className={style.system} style={{ paddingTop: "10px" }}>
        <h3>CPU</h3>
        <div style={{ display: "flex" }}>
          Core <span style={{ flex: "1 1 0%" }} />
          {performance.cpuCount}
        </div>
        <div style={{ display: "flex" }}>
          Usage <span style={{ flex: "1 1 0%" }} />
          {performance.cpu}%
        </div>
        <div style={{ display: "flex" }}>
          Model <span style={{ flex: "1 1 0%" }} />
          {performance.cpuModel}
        </div>
      </div>
      <div className={style.system}>
        <h3>Memory</h3>
        <div style={{ display: "flex" }}>
          Total <span style={{ flex: "1 1 0%" }} />
          {performance.totalMemMb} MB
        </div>
        <div style={{ display: "flex" }}>
          Used <span style={{ flex: "1 1 0%" }} />
          {performance.usedMemMb} MB
        </div>
        <div style={{ display: "flex" }}>
          Free <span style={{ flex: "1 1 0%" }} />
          {performance.freeMemMb} MB
        </div>
      </div>
      <div className={style.system}>
        <h3>Operating System</h3>
        <div style={{ display: "flex" }}>
          OS <span style={{ flex: "1 1 0%" }} />
          {performance.os}
        </div>
        <div style={{ display: "flex" }}>
          Type <span style={{ flex: "1 1 0%" }} />
          {performance.type}
        </div>
        <div style={{ display: "flex" }}>
          Arch <span style={{ flex: "1 1 0%" }} />
          {performance.arch}
        </div>
        <div style={{ display: "flex" }}>
          Uptime <span style={{ flex: "1 1 0%" }} />
          {secondToWeek(performance.uptime || 0)}
        </div>
      </div>
    </div>
  );
}
