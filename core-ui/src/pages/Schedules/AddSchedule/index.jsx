import { useAllDevices } from "apis";
import clsx from "clsx";
import { useMemo, useState } from "react";
import { BsArrowLeft } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import style from "./index.module.scss";
import { Cron } from "react-js-cron";
import "react-js-cron/dist/styles.css";
import cronstrue from "cronstrue";
import Channels from "./Channels";
export default function AddSchedule() {
  const [formData, setFormData] = useState({
    cron: "* * * * *",
    state: "running",
    Device: {
      id: undefined,
    },
    channels: [],
  });
  const navigate = useNavigate();
  function handleChange(newFormData) {
    setFormData((formData) => ({ ...formData, ...newFormData }));
  }
  const { data: devicesQueryData } = useAllDevices({ start: 0, limit: 1000 });
  const devicesData = useMemo(
    () => devicesQueryData?.devices || [],
    [devicesQueryData?.devices]
  );
  return (
    <form className={style.container}>
      <div className={style.header}>
        <div
          className={style["back"]}
          onClick={() => {
            navigate(-1);
          }}
        >
          <BsArrowLeft size={24} />
        </div>
        <h2>Add Schedule</h2>
        <span style={{ flex: "1 1" }} />
        <input
          type="submit"
          value="Create"
          className={clsx(["button", "confirm"])}
        />
      </div>
      <div className={style.body}>
        <div className={style["basic-panel"]}>
          <h3 className={style["panel-header"]}>Basic Details</h3>
          <hr />
          <div className={style["form-container"]}>
            <table>
              <tbody>
                <tr>
                  <td>
                    <label>
                      <h4>Device</h4>
                    </label>
                  </td>
                  <td>
                    <select>
                      {devicesData.map((value, index) => (
                        <option key={index} value={value.id}>
                          {value.name}
                        </option>
                      ))}
                    </select>
                  </td>
                </tr>
                <tr>
                  <td>
                    <label>
                      <h4>Cron</h4>
                    </label>
                  </td>
                  <td>
                    <input
                      type="text"
                      name="cron"
                      value={formData.cron}
                      onChange={(e) => {
                        handleChange({ [e.target.name]: e.target.value });
                      }}
                    />
                  </td>
                </tr>
                <tr>
                  <td>
                    <label>
                      <h4>Period</h4>
                    </label>
                  </td>
                  <td>
                    {formData.cron.split(" ").length < 6 && (
                      <Cron
                        value={formData.cron}
                        setValue={(value) => {
                          handleChange({ cron: value });
                        }}
                        clearButtonProps={{ type: "dashed" }}
                      />
                    )}
                    {formData.cron.split(" ").length >= 6 && (
                      <div>{cronstrue.toString(formData.cron)}</div>
                    )}
                  </td>
                </tr>
                <tr>
                  <td>
                    <label>
                      <h4>State</h4>
                    </label>
                  </td>
                  <td>
                    <select
                      onChange={(e) => {
                        setFormData({ [e.target.name]: e.target.value });
                      }}
                      name="state"
                    >
                      <option value="running">Start After Create</option>
                      <option value="stoping">Start Manual</option>
                    </select>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <Channels formData={formData} />
      </div>
    </form>
  );
}
