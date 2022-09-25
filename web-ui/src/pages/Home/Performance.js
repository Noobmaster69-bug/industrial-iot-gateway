import Chart from "react-apexcharts";
import { useSocket } from "context";
import style from "./performance.module.scss";
import Skeleton from "react-loading-skeleton";
export default function Performance() {
  const { performance, isConnected } = useSocket();
  if (!isConnected) {
    return (
      <div className={style.container} style={{ padding: 0 }}>
        <Skeleton height={"100%"} width={"100%"} count={1} />
      </div>
    );
  }
  const options = {
    plotOptions: {
      radialBar: {
        offsetY: 0,
        startAngle: 0,
        endAngle: 270,
        hollow: {
          margin: 5,
          size: "30%",
          background: "transparent",
          image: undefined,
        },
        dataLabels: {
          name: {
            show: false,
          },
          value: {
            show: false,
          },
        },
      },
    },
    labels: ["Disk", "CPU", "RAM"],
    legend: {
      show: true,
      floating: true,
      fontSize: "16px",
      position: "left",
      offsetX: 160,
      offsetY: 15,
      labels: {
        useSeriesColors: true,
      },
      markers: {
        size: 0,
      },
      formatter: function (seriesName, opts) {
        return seriesName + ":  " + opts.w.globals.series[opts.seriesIndex];
      },
      itemMargin: {
        vertical: 3,
      },
    },
    stroke: {
      lineCap: "round",
    },
  };

  return (
    <div className={style.container} style={{ backgroundColor: "#fff" }}>
      <h2 className={style.header}>Performance</h2>
      <div className={style.content}>
        <Chart
          options={options}
          series={[performance.disk, performance.ram, performance.cpu]}
          type="radialBar"
          className={style.chart}
          height="100%"
          width="100%"
        />
      </div>
    </div>
  );
}
