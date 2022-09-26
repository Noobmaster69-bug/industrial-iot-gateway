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
  const optionsRam = {
    colors: ["#259EFA"],
    chart: {
      animations: {
        enabled: false,
        animateGradually: {
          enabled: false,
        },
        dynamicAnimation: {
          enabled: false,
        },
      },
    },
    plotOptions: {
      radialBar: {
        startAngle: -135,
        endAngle: 135,
        hollow: {
          margin: 15,
          size: "70%",
        },
        dataLabels: {
          showOn: "always",
          name: {
            offsetY: -10,
            show: true,
            color: "#888",
            fontSize: "13px",
          },
          value: {
            color: "#111",
            fontSize: "30px",
            show: true,
          },
        },
      },
    },
    stroke: {
      lineCap: "round",
    },
    labels: ["Memory"],
  };
  const optionsCPU = {
    colors: ["#259EFA"],
    chart: {
      animations: {
        enabled: false,
        animateGradually: {
          enabled: false,
        },
        dynamicAnimation: {
          enabled: false,
        },
      },
    },
    plotOptions: {
      radialBar: {
        startAngle: -135,
        endAngle: 135,
        hollow: {
          margin: 15,
          size: "70%",
        },
        dataLabels: {
          showOn: "always",
          name: {
            offsetY: -10,
            show: true,
            color: "#888",
            fontSize: "13px",
          },
          value: {
            color: "#111",
            fontSize: "30px",
            show: true,
          },
        },
      },
    },
    stroke: {
      lineCap: "round",
    },
    labels: ["CPU"],
    fill: {
      colors: "#00E396",
    },
  };
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
  const optionsDisk = {
    colors: ["#259EFA"],
    chart: {
      animations: {
        enabled: false,
        animateGradually: {
          enabled: false,
        },
        dynamicAnimation: {
          enabled: false,
        },
      },
    },
    plotOptions: {
      radialBar: {
        startAngle: -135,
        endAngle: 135,
        hollow: {
          margin: 15,
          size: "70%",
        },
        dataLabels: {
          showOn: "always",
          name: {
            offsetY: -10,
            show: true,
            color: "#888",
            fontSize: "13px",
          },
          value: {
            color: "#111",
            fontSize: "30px",
            show: true,
          },
        },
      },
    },
    stroke: {
      lineCap: "round",
    },
    labels: ["Disk"],
    fill: { colors: "#FEB019" },
  };
  return (
    <div className={style.container} style={{ backgroundColor: "#fff" }}>
      <h2 className={style.header}>Performance</h2>
      <div className={style.content}>
        {/* <Chart
          options={options}
          series={[performance.disk, performance.ram, performance.cpu]}
          type="radialBar"
          className={style.chart}
          height="100%"
          width="100%"
        /> */}
        <Chart
          options={optionsRam}
          series={[performance.ram]}
          type="radialBar"
          className={style.chart}
          height="100%"
          width="100%"
        />
        <Chart
          options={optionsCPU}
          series={[performance.cpu]}
          type="radialBar"
          className={style.chart}
          height="100%"
          width="100%"
        />
        <Chart
          options={optionsDisk}
          series={[performance.disk]}
          type="radialBar"
          className={style.chart}
          height="100%"
          width="100%"
        />
      </div>
    </div>
  );
}
