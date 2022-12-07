import Chart from "react-apexcharts";
import { useMqtt, useSystemInfo } from "apis";
import style from "./index.module.scss";
import Skeleton from "react-loading-skeleton";
export default function Network() {
  const { upload, download, isConnected, status } = useMqtt();
  const { data, isLoading, isFetching } = useSystemInfo();
  const options = {
    chart: {
      id: "network",
      animations: {
        enabled: true,
        easing: "linear",
        dynamicAnimation: {
          speed: 1000,
        },
      },
      plotOptions: {
        hollow: {
          margin: 15,
          size: "70%",
        },
      },
      toolbar: {
        show: false,
      },
      zoom: {
        enabled: false,
      },
    },
    xaxis: {
      type: "datetime",
      range: 20000,
    },
    stroke: {
      curve: "smooth",
    },
  };
  if (!isConnected && isLoading && isFetching) {
    return (
      <div className={style.container} style={{ padding: 0, display: "block" }}>
        <Skeleton height={"100%"} width={"100%"} count={1} />
      </div>
    );
  }
  return (
    <div className={style.container}>
      <h2>Network</h2>
      <div className={style.networkChart}>
        <Chart
          type="line"
          height="100%"
          width="100%"
          series={[
            {
              name: "Download",
              data: download,
            },
            {
              name: "Upload",
              data: upload,
            },
          ]}
          options={options}
        />
      </div>
      <div className={style.networkInfo}>
        <div style={{ display: "flex" }}>
          Upload
          <span style={{ flex: "1 1 0%" }} />
          {status?.netstat?.total?.outputMb} Mb/s
        </div>
        <div style={{ display: "flex" }}>
          Download <span style={{ flex: "1 1 0%" }} />
          {status?.netstat?.total?.inputMb} Mb/s
        </div>
        <div style={{ display: "flex" }}>
          IP Address <span style={{ flex: "1 1 0%" }} />
          {data?.ip}
        </div>
        <div style={{ display: "flex" }}>
          Host name <span style={{ flex: "1 1 0%" }} />
          {data?.hostname}
        </div>
      </div>
    </div>
  );
}
