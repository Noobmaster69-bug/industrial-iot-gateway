import Skeleton from "react-loading-skeleton";
import { useMqtt, useSystemInfo } from "apis";

import style from "./index.module.scss";

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
export default function System() {
  const { status, isConnected } = useMqtt();
  const { data, isLoading, isFetching } = useSystemInfo();
  if (!isConnected && isLoading && isFetching) {
    return (
      <div className={style.container} style={{ padding: 0, display: "block" }}>
        <Skeleton height={"100%"} width={"100%"} count={1} />
      </div>
    );
  }
  return (
    <div className={style.container}>
      <h2>System</h2>
      <div className={style.system}>
        <h3>CPU</h3>
        <div style={{ display: "flex" }}>
          Core <span style={{ flex: "1 1 0%" }} />
          {data.cpuCount}
        </div>
        <div style={{ display: "flex" }}>
          Usage <span style={{ flex: "1 1 0%" }} />
          {status.cpu}%
        </div>
        <div style={{ display: "flex" }}>
          Model <span style={{ flex: "1 1 0%" }} />
          {data.cpuModel}
        </div>
      </div>
      <div className={style.system}>
        <h3>Memory</h3>
        <div style={{ display: "flex" }}>
          Total <span style={{ flex: "1 1 0%" }} />
          {status?.mem?.totalMemMb} MB
        </div>
        <div style={{ display: "flex" }}>
          Used <span style={{ flex: "1 1 0%" }} />
          {status?.mem?.usedMemMb} MB
        </div>
        <div style={{ display: "flex" }}>
          Free <span style={{ flex: "1 1 0%" }} />
          {status?.mem?.freeMemMb} MB
        </div>
      </div>
      <div className={style.system}>
        <h3>Operating System</h3>
        <div style={{ display: "flex" }}>
          OS <span style={{ flex: "1 1 0%" }} />
          {data.os}
        </div>
        <div style={{ display: "flex" }}>
          Type <span style={{ flex: "1 1 0%" }} />
          {data.type}
        </div>
        <div style={{ display: "flex" }}>
          Arch <span style={{ flex: "1 1 0%" }} />
          {data.arch}
        </div>
        <div style={{ display: "flex" }}>
          Uptime <span style={{ flex: "1 1 0%" }} />
          {secondToWeek(status.uptime || 0)}
        </div>
      </div>
    </div>
  );
}
