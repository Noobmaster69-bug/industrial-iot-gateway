import Chart from "react-apexcharts";
import { useSocket } from "context";
import style from "./network.module.scss";
export default function Network() {
  const { performance } = useSocket();
  const optionDownload = {
    chart: {
      id: "network",
      animations: {
        enabled: true,
        easing: "linear",
        speed: 100,
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
      min: Date.now() - (Date.now() % 1000) - 20 * 1000,
      max: Date.now() - (Date.now() % 1000),
      range: 20 * 1000,
      labels: {
        show: false,
      },
    },
    stroke: {
      curve: "smooth",
    },
  };
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
              data: performance.download,
            },
            {
              name: "Upload",
              data: performance.upload,
            },
          ]}
          options={optionDownload}
        />
      </div>
      <div className={style.networkInfo}>
        <div style={{ display: "flex" }}>
          Upload
          <span style={{ flex: "1 1 0%" }} />
          {performance.outputMb} Mb/s
        </div>
        <div style={{ display: "flex" }}>
          Download <span style={{ flex: "1 1 0%" }} />
          {performance.inputMb} Mb/s
        </div>
        <div style={{ display: "flex" }}>
          IP Address <span style={{ flex: "1 1 0%" }} />
          {performance.ip}
        </div>
        <div style={{ display: "flex" }}>
          Host name <span style={{ flex: "1 1 0%" }} />
          {performance.hostname}
        </div>
      </div>
    </div>
  );
}
