import Chart from "react-apexcharts";
import { useSocket } from "context";
import style from "./performance.module.scss";
export default function Performance() {
  const { performance } = useSocket();
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
    <div className={style.container}>
      <h2 className={style.header}>Performance</h2>
      <div className={style.content}>
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
