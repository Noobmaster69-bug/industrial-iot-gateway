import { useDevices } from "hooks";
import { useParams } from "react-router-dom";
import style from "./index.module.scss";
export default function BasicPanel() {
  const { id } = useParams();
  const { data: devices, isLoading } = useDevices();
  if (isLoading) {
    return <div></div>;
  }
  const thisDevice = devices.find((device) => device.id === Number(id));

  return (
    <div className={style["basic-panel"]}>
      <h3 className={style["panel-header"]}>Basic Details</h3>
      <hr />
      <div className={style["form-container"]}>
        <table>
          <tbody>
            <tr>
              <td>
                <label>
                  <h4>Name</h4>
                </label>
              </td>
              <td>{thisDevice.name}</td>
            </tr>
            <tr>
              <td>
                <label>
                  <h4>Manufacturer</h4>
                </label>
              </td>
              <td>{thisDevice.manufacturer}</td>
            </tr>
            <tr>
              <td>
                <label>
                  <h4>Model</h4>
                </label>
              </td>
              <td>{thisDevice.modelName}</td>
            </tr>
            <tr>
              <td>
                <label>
                  <h4>Type</h4>
                </label>
              </td>
              <td>{thisDevice.type}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}