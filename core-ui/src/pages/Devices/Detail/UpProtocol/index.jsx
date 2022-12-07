import style from "./index.module.scss";
import { useDevice } from "apis";
import { useParams } from "react-router-dom";
export default function UpProtocol() {
  const { id } = useParams();
  const { data: thisDevice, isLoading } = useDevice(id);
  if (isLoading) {
    return <div></div>;
  }
  return (
    <div className={style["protocol-panel"]}>
      <div className={style["panel-header"]}>
        <h3>Nort Bound Panel</h3>
        <div>{thisDevice?.upProtocol?.plugin}</div>
      </div>
      <hr />
      <div className={style["form-container"]}>
        <table>
          <tbody>
            {Object.keys(thisDevice.upProtocol)
              .filter(
                (key) =>
                  key !== "ProtocolId" && key !== "id" && key !== "plugin"
              )
              .map((key, id) => (
                <tr key={"upProtocol +" + id}>
                  <td>
                    <h4>{key}</h4>
                  </td>
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
