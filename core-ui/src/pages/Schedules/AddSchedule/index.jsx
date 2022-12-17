import { useAllDevices, useDevice } from "apis";
import clsx from "clsx";
import { useEffect, useMemo, useState } from "react";
import { BsArrowLeft } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import style from "./index.module.scss";
import { Cron } from "react-js-cron";
import "react-js-cron/dist/styles.css";
import cronstrue from "cronstrue";
import { useCreateSchedule } from "apis";
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
  const { data: devicesQueryData } = useAllDevices({
    start: 0,
    limit: 1000,
  });
  const devicesData = useMemo(
    () => devicesQueryData?.devices || [],
    [devicesQueryData?.devices]
  );
  const { mutate: createSchedule } = useCreateSchedule();
  useEffect(() => {
    handleChange({
      Device: {
        id: devicesData[0]?.id,
      },
      device_id: devicesData[0]?.id,
      channels: devicesData
        .find((device) => device.id === Number(devicesData[0]?.id))
        ?.Channels.map((channel) => channel.id),
    });
  }, [devicesData]);
  function onSubmit(e) {
    e.preventDefault();
    createSchedule(formData);
  }
  return (
    <form className={style.container} onSubmit={onSubmit}>
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
                    <select
                      onChange={(e) => {
                        handleChange({
                          Device: {
                            id: Number(e.target.value),
                          },
                          channels: devicesData
                            .find(
                              (device) => device.id === Number(e.target.value)
                            )
                            .map((device) => device.id),
                        });
                      }}
                    >
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
        {/* <Channels
          formData={formData}
          onAdd={() => {
            setOpenAddChannel(true);
          }}
        /> */}
        {/* <AddChannel
          formData={formData}
          open={openAddChannel}
          onConfrim={(data) => {
            handleChange({ channels: data });
            setOpenAddChannel(false);
          }}
          onCancel={() => {
            setOpenAddChannel(false);
          }}
        /> */}
      </div>
    </form>
  );
}
