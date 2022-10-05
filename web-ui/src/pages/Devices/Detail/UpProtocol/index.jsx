import style from "./index.module.scss";
import { useDevices } from "hooks";
import { useParams } from "react-router-dom";
export default function UpProtocol() {
  const { id } = useParams();
  const { data: devices, isLoading } = useDevices();
  if (isLoading) {
    return <div></div>;
  }
  const thisDevice = devices.find((device) => device.id === Number(id));
  return (
    <div className={style["protocol-panel"]}>
      <div className={style["panel-header"]}>
        <h3>Up Protocol Panel</h3>
        <div>{thisDevice?.upProtocol?.Service?.name}</div>
      </div>
      <hr />
      <div className={style["form-container"]}>
        <table>
          <tbody>
            {Object.keys(thisDevice.upProtocol)
              .filter(
                (key) =>
                  key !== "Service" && key !== "id" && key !== "ServiceId"
              )
              .map((key, id) => (
                <tr key={"upProtocol +" + id}>
                  <td>{key}</td>
                  <td>
                    {thisDevice.upProtocol[key] !== null
                      ? thisDevice.upProtocol[key]
                      : "_"}
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
