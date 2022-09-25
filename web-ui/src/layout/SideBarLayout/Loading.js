import Skeleton from "react-loading-skeleton";
export default function Loading() {
  return (
    <div style={{ height: "100%", width: "100%" }}>
      <Skeleton width="100%" height="100%" count={2}></Skeleton>
    </div>
  );
}
