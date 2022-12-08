import cronstrue from "cronstrue";
import style from "./index.module.scss";
import { useSchedule } from "apis";
import { useNavigate, useParams } from "react-router-dom";
import { Loading } from "components/ErrorPages";
import { SortTable as Table } from "components/Table";
import { BsArrowLeft } from "react-icons/bs";
export default function ScheduleDetail() {
  const { id } = useParams();
  const { data, isLoading, isFetching } = useSchedule(id);
  const nevigate = useNavigate();
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
    ...Object.entries(data?.downPlugin.channels || {}).map(([key, value]) => ({
      id: key,
      numberic: false,
      label: value?.label || key?.charAt(0)?.toUpperCase() + key.slice(1),
    })),
  ];

  const tableData = data?.channels?.map((channel) => {
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

  if (isFetching && isLoading) return <Loading />;
  return (
    <div className={style["container"]}>
      <div className={style.header}>
        <div
          className={style["back"]}
          onClick={() => {
            nevigate(-1);
          }}
        >
          <BsArrowLeft size={24} />
        </div>
        <h2>Schedule Details</h2>
      </div>
      <div className={style["body"]}>
        <div className={style["basic-panel"]}>
          <h3 className={style["panel-header"]}>Basic Details</h3>
          <hr />
          <div className={style["form-container"]}>
            <table>
              <tbody>
                <tr>
                  <td>
                    <h4>Id</h4>
                  </td>
                  <td>{data?.id}</td>
                </tr>
                <tr>
                  <td>
                    <h4>Device</h4>
                  </td>
                  <td>{data?.Device?.name}</td>
                </tr>
                <tr>
                  <td>
                    <h4>Cron</h4>
                  </td>
                  <td>{data?.cron}</td>
                </tr>
                <tr>
                  <td>
                    <h4>Period</h4>
                  </td>
                  <td>{cronstrue.toString(data?.cron || "* * * * * *")}</td>
                </tr>
                <tr>
                  <td>
                    <h4>State</h4>
                  </td>
                  <td>{data?.state}</td>
                </tr>
                <tr>
                  <td>
                    <h4>Created At</h4>
                  </td>
                  <td>{data?.createdAt}</td>
                </tr>
                <tr>
                  <td>
                    <h4>Last Update</h4>
                  </td>
                  <td>{data?.updatedAt}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <div className={style["basic-panel"]}>
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
