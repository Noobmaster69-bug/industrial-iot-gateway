import Chart from "react-apexcharts";
import { useMqtt, useSystemInfo } from "apis";
import style from "./index.module.scss";
import Skeleton from "react-loading-skeleton";
export default function Performance() {
  const { cpu, mem, isConnected } = useMqtt();
  const { isLoading, isFetching } = useSystemInfo();
  if (!isConnected && isLoading && isFetching) {
    return (
      <div className={style.container} style={{ padding: 0, display: "block" }}>
        <Skeleton height={"100%"} width={"100%"} count={1} />
      </div>
    );
  }
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
      label: false,
    },
    yaxix: {
      max: 100,
      min: 0,
    },
    stroke: {
      curve: "smooth",
    },
  };

  return (
    <div className={style.container}>
      <h2 className={style.header}>Performance</h2>
      <div className={style.content}>
        <Chart
          type="line"
          height="100%"
          width="100%"
          series={[
            {
              name: "Memory",
              data: mem,
            },
            {
              name: "CPU",
              data: cpu,
            },
          ]}
          options={options}
        />
      </div>
    </div>
  );
}
