import { usePlugins, useDevice } from "apis";
import style from "./index.module.scss";
import { BsArrowLeft } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import BasicPanel from "./BasicDetails";
import UpProtocol from "./UpProtocol";
import DownProtocol from "./DownProtocol";
import { SortTable as Table } from "components/Table";
import { useParams } from "react-router-dom";
export default function Detail() {
  const { id } = useParams();
  const { data: thisDevice, isLoading: loading1 } = useDevice({ id });
  const {
    data: { southBound },
    isLoading: loading2,
  } = usePlugins();
  const nevigate = useNavigate();
  if (loading1 && loading2) {
    return <div></div>;
  }
  const thisDownProtocol = (southBound || []).find(
    (plugin) => plugin.name === thisDevice?.downProtocol?.plugin
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
    ...Object.entries(thisDownProtocol?.channels || {}).map(([key, value]) => ({
      id: key,
      numberic: false,
      label: value?.label || key?.charAt(0)?.toUpperCase() + key.slice(1),
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
