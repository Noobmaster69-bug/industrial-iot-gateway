import { useProtocol } from "hooks";
import style from "./index.module.scss";
import { BsArrowLeft } from "react-icons/bs";
import clsx from "clsx";
import { useNavigate } from "react-router-dom";
import AddChanel from "./AddChannel";
import BasicPanel from "./BacisDetails";
import UpProtocol from "./UpProtocol";
import DownProtocol from "./DownProtocol";
import { useEffect, useState } from "react";
import Table from "components/Table";
import _ from "lodash";
export default function AddBox() {
  const { data: protocols, isLoading } = useProtocol();
  const downServices = (protocols || []).filter(
    (protocol) => protocol.type === "downService"
  );
  const upServices = (protocols || []).filter(
    (protocol) => protocol.type === "upService"
  );
  const [downService, setDownService] = useState(downServices[0]);
  const [upService, setUpService] = useState(upServices[0]);
  const [open, setOpen] = useState(false);
  const [channels, setChannel] = useState([]);
  const nevigate = useNavigate();
  useEffect(() => {
    setDownService(downServices[0]);
    setUpService(upServices[0]);
  }, [downServices, protocols, upServices]);
  if (isLoading) {
    return <div></div>;
  }

  function onSubmit(event) {
    event.preventDefault();
    const result = new FormData(event.target);
    const { name, manufacturer, modelName, type, ...submitData } =
      Object.fromEntries(result);
    const protocol = Object.keys(submitData).reduce((pre, curr) => {
      if (curr.split(">>")[0] === "downProtocol") {
        pre.downProtocol = {
          ...pre.downProtocol,
          [curr.split(">>")[1]]: submitData[curr],
        };
      } else if (curr.split(">>")[0] === "upProtocol") {
        pre.upProtocol = {
          ...pre.upProtocol,
          [curr.split(">>")[1]]: submitData[curr],
        };
      }
      return pre;
    }, {});
    protocol.upProtocol.ServiceId = upService.id;
    protocol.downProtocol.ServiceId = downService.id;
    const data = { name, manufacturer, modelName, type, channels, ...protocol };
  }

  const head = [
    {
      id: "name",
      numberic: false,
      label: "Name",
    },
    {
      id: "readWrite",
      numberic: false,
      label: "Read Write",
    },
    {
      id: "offset",
      numberic: false,
      label: "Offset",
    },
    {
      id: "scale",
      numberic: false,
      label: "Scale",
    },
    {
      id: "precision",
      numberic: false,
      label: "Precision",
    },
    ...(downService?.channelsProps || []).map((props) => ({
      id: props.key,
      numberic: false,
      label:
        props.label || props.key.charAt(0).toUpperCase() + props.key.slice(1),
    })),
  ];
  const tableData = channels.map((channel) => {
    const channelProps = Object.keys(channel);
    const channelData = channelProps.reduce((pre, curr) => {
      return {
        ...pre,
        [curr]: {
          value: <div>{channel[curr]}</div>,
          key: channel[curr],
        },
      };
    }, {});
    return channelData;
  });
  return (
    <>
      <form onSubmit={onSubmit} className={style.container}>
        <div className={style.header}>
          <div
            className={style["back"]}
            onClick={() => {
              nevigate(-1);
            }}
          >
            <BsArrowLeft size={24} />
          </div>
          <h2>Add Device</h2>
          <span style={{ flex: "1 1" }} />
          <input
            type="submit"
            value="Create"
            className={clsx(["button", "confirm"])}
          />
        </div>
        <div className={style.body}>
          <BasicPanel />
          <UpProtocol
            upServices={upServices}
            upService={upService}
            setUpService={setUpService}
          />
          <DownProtocol
            downService={downService}
            downServices={downServices}
            setDownService={setDownService}
          />
          <div className={style["channel-panel"]}>
            <div className={style["panel-header"]}>
              <h3>Channel Panel</h3>
              <select
                onChange={(event) => {
                  const value = event.target.value;
                  setDownService(value);
                }}
                value={downService}
              >
                {downServices.map((protocol, index) => {
                  return (
                    <option value={protocol} key={index + "protocol"}>
                      {protocol.name}
                    </option>
                  );
                })}
              </select>
            </div>
            <hr />
            <div className={style["table-container"]}>
              <Table
                head={head}
                className={style.table}
                data={tableData}
                checkbox
                // onDeleteRow={onDeleteRow}
                onAdd={() => {
                  setOpen(true);
                }}
                onDeleteRow={(row) => {
                  const index = tableData.findIndex((channel) =>
                    _.isEqual(row, channel)
                  );
                  setChannel(channels.filter((channel, id) => id !== index));
                }}
              />
            </div>
          </div>
        </div>
      </form>
      <AddChanel
        downService={downService}
        open={[open, setOpen]}
        onConfirm={(data) => {
          setChannel([...channels, data]);
        }}
        channels={channels}
      />
    </>
  );
}
