import style from "./index.module.scss";
import { useDevice } from "apis";
import { useParams } from "react-router-dom";
export default function DownProtocol() {
  const { id } = useParams();
  const { data: thisDevice, isLoading } = useDevice(id);
  if (isLoading) {
    return <div></div>;
  }
  return (
    <div className={style["protocol-panel"]}>
      <div className={style["panel-header"]}>
        <h3>South Bound Panel</h3>
        <div>{thisDevice?.downProtocol?.plugin}</div>
      </div>
      <hr />
      <div className={style["form-container"]}>
        <table>
          <tbody>
            {Object.keys(thisDevice.downProtocol)
              .filter(
                (key) =>
                  key !== "ProtocolId" && key !== "id" && key !== "plugin"
              )
              .map((key, id) => {
                return (
                  <tr key={"downProtocol +" + id}>
                    <td>
                      <h4>{key}</h4>
                    </td>
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
