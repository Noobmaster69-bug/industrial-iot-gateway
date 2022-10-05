import { useProtocol } from "hooks";
import style from "./index.module.scss";
import { BsArrowLeft } from "react-icons/bs";
import clsx from "clsx";
import { useNavigate } from "react-router-dom";
import BasicPanel from "./BacisDetails";
import UpProtocol from "./UpProtocol";
import DownProtocol from "./DownProtocol";
import Table from "components/Table";
import { useDevices } from "hooks";
import { useParams } from "react-router-dom";
export default function Detail() {
  // const {dat};
  const { id } = useParams();
  const { data: devices, isLoading: loading1 } = useDevices();
  const { data: protocols, isLoading: loading2 } = useProtocol();
  const nevigate = useNavigate();
  if (loading1 && loading2) {
    return <div></div>;
  }
  const thisDevice = (devices || []).find((device) => device.id === Number(id));
  const thisDownProtocol = (protocols || []).find(
    (protocol) => protocol.id === thisDevice?.downProtocol?.ServiceId
  );
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
    ...(thisDownProtocol?.channelsProps || []).map((props) => ({
      id: props.key,
      numberic: false,
      label:
        props.label || props.key.charAt(0).toUpperCase() + props.key.slice(1),
    })),
  ];
  const tableData = thisDevice?.channels?.map((channel) => {
    const channelProps = Object.keys(channel);
    const channelData = channelProps.reduce((pre, curr) => {
      return {
        ...pre,
        [curr]: {
          value: <div>{channel[curr] !== null ? channel[curr] : "_"}</div>,
          key: channel[curr],
        },
      };
    }, {});
    return channelData;
  });

  return (
    <div className={style.container}>
      <div className={style.header}>
        <div
          className={style["back"]}
          onClick={() => {
            nevigate(-1);
          }}
        >
          <BsArrowLeft size={24} />
        </div>
        <h2>Device Details</h2>
      </div>
      <div className={style.body}>
        <BasicPanel />
        <UpProtocol />
        <DownProtocol />
        <div className={style["channel-panel"]}>
          <div className={style["panel-header"]}>
            <h3>Channel Panel</h3>
          </div>
          <hr />
          <div className={style["table-container"]}>
            <Table
              head={head}
              className={style.table}
              data={tableData}
              addBox={false}
              removeBox={false}
              editBox={false}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
