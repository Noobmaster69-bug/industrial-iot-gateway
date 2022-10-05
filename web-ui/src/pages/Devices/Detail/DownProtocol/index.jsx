import style from "./index.module.scss";
import { useDevices } from "hooks";
import { useParams } from "react-router-dom";
export default function DownProtocol() {
  const { id } = useParams();
  const { data: devices, isLoading } = useDevices();
  if (isLoading) {
    return <div></div>;
  }
  const thisDevice = devices.find((device) => device.id === Number(id));
  return (
    <div className={style["protocol-panel"]}>
      <div className={style["panel-header"]}>
        <h3>Down Protocol Panel</h3>
        <div>{thisDevice?.downProtocol?.Service?.name}</div>
      </div>
      <hr />
      <div className={style["form-container"]}>
        <table>
          <tbody>
            {Object.keys(thisDevice.downProtocol)
              .filter((key) => key !== "Service" && key !== "id")
              .map((key, id) => {
                return (
                  <tr key={"downProtocol +" + id}>
                    <td>{key}</td>
                    <td>
                      {thisDevice.downProtocol[key] !== null
                        ? thisDevice.downProtocol[key]
                        : "_"}
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      </div>
    </div>
  );
}