import style from "./devices.module.scss";
import { useDeviceCount } from "hooks/api";
import Skeleton from "react-loading-skeleton";
export default function Devices() {
  const { data: devices, isLoading } = useDeviceCount();
  if (isLoading) {
    return (
      <div className={style.container} style={{ padding: 0 }}>
        <Skeleton height={"100%"} width={"100%"} count={1} />;
      </div>
    );
  }
  return (
    <div className={style.container} style={{ backgroundColor: "#fff" }}>
      <h2>Devices</h2>
      <div className={style["devices-status"]}>
        <div>
          <h1>{devices?.active || 0}</h1>
          <span style={{ color: "#35C78B" }}>active</span>
        </div>
        <div>
          <h1>{devices?.count - (devices?.active || 0) || 0}</h1>
          <span style={{ color: "#F17B62" }}>dormant</span>
        </div>
        <div>
          <h1>{devices?.count || 0}</h1>
          total
        </div>
      </div>
    </div>
  );
}
