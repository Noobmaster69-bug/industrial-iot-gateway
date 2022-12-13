import style from "./index.module.scss";
import { useDeviceState } from "apis";
import Skeleton from "react-loading-skeleton";
export default function Devices() {
  const {
    data: { active, total, dormant },
    isLoading,
    isFetching,
  } = useDeviceState();
  if (isLoading && isFetching) {
    return (
      <div className={style.container} style={{ padding: 0 }}>
        <Skeleton height={"100%"} width={"100%"} count={1} />;
      </div>
    );
  }
  return (
    <div className={style.container}>
      <h2>Devices</h2>
      <div className={style["devices-status"]}>
        <div>
          <h1>{active}</h1>
          <span style={{ color: "#35C78B" }}>active</span>
        </div>
        <div>
          <h1>{dormant}</h1>
          <span style={{ color: "#F17B62" }}>dormant</span>
        </div>
        <div>
          <h1>{total}</h1>
          total
        </div>
      </div>
    </div>
  );
}
