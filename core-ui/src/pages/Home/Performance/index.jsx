import Chart from "react-apexcharts";
import { useMqtt, useSystemInfo } from "apis";
import style from "./index.module.scss";
import Skeleton from "react-loading-skeleton";
export default function Performance() {
  const { upload, download, isConnected, status } = useMqtt();
  const { data, isLoading, isFetching } = useSystemInfo();
  if (!isConnected && isLoading && isFetching) {
    return (
      <div className={style.container} style={{ padding: 0, display: "block" }}>
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
    responsive: [
      {
        breakpoint: 1920,
        options: {
          chart: {
            width: "100%",
            height: "100%",
          },
        },
      },
      {
        breakpoint: 1025,
        options: {
          chart: {
            width: "90%",
            height: "400px",
          },
        },
      },
    ],
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
    responsive: [
      {
        breakpoint: 1920,
        options: {
          chart: {
            width: "100%",
            height: "100%",
          },
        },
      },
      {
        breakpoint: 1025,
        options: {
          chart: {
            width: "90%",
            height: "400px",
          },
        },
      },
    ],
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
    responsive: [
      {
        breakpoint: 1920,
        options: {
          chart: {
            width: "100%",
            height: "100%",
          },
        },
      },
      {
        breakpoint: 1025,
        options: {
          chart: {
            width: "90%",
            height: "400px",
          },
        },
      },
    ],
  };
  return (
    <div className={style.container} style={{ backgroundColor: "#fff" }}>
      <h2 className={style.header}>Performance</h2>
      <div className={style.content}>
        <Chart
          options={optionsRam}
          series={[status.mem?.usedMemPercentage]}
          type="radialBar"
          className={style.chart}
        />
        <Chart
          options={optionsCPU}
          series={[status.cpu]}
          type="radialBar"
          className={style.chart}
        />
        <Chart
          options={optionsDisk}
          series={[status.drive?.usedPercentage]}
          type="radialBar"
          className={style.chart}
        />
      </div>
    </div>
  );
}
