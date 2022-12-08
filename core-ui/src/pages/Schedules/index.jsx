import style from "./index.module.scss";
import { useAllSchedules } from "apis";
import { Loading } from "components/ErrorPages";
import { useState } from "react";
import Table from "components/Table";
import cronstrue from "cronstrue";
import { Link, useNavigate } from "react-router-dom";
import { AiOutlineEllipsis } from "react-icons/ai";
import ReactTooltip from "react-tooltip";
export default function Schedules() {
  const [pages, setPages] = useState({ start: 0 });
  const {
    data: { start, limit, total, schedules },
    isLoading,
    isFetching,
  } = useAllSchedules({ ...pages, limit: 10 });
  const navigate = useNavigate();
  const tableHead = [
    {
      id: "id",
      numberic: false,
      label: "id",
      isSort: false,
    },
    {
      id: "device",
      numberic: false,
      label: "Device",
      isSort: false,
    },
    {
      id: "cron",
      numberic: false,
      label: "Cron String",
      isSort: false,
    },
    {
      id: "period",
      numberic: false,
      label: "Period",
      isSort: false,
    },
    {
      id: "state",
      numberic: false,
      label: "State",
      isSort: false,
    },
    {
      id: "createdAt",
      numberic: false,
      isSort: false,
      label: "Created At",
    },
    {
      id: "updatedAt",
      numberic: false,
      isSort: false,
      label: "Last Update",
    },
    {
      id: "detail",
      numberic: false,
      isSort: false,
      label: "",
    },
  ];

  const data = schedules.map((schedule) => ({
    id: {
      value: <div>{schedule?.id}</div>,
      key: schedule.id,
    },
    device: {
      value: <div>{schedule?.Device?.name}</div>,
      key: schedule?.Device?.name,
    },
    cron: {
      value: <div>{schedule?.cron}</div>,
      key: schedule.cron,
    },
    period: {
      value: <div>{cronstrue.toString(schedule?.cron)}</div>,
      key: schedule.cron,
    },
    state: {
      value: <div>{schedule?.state}</div>,
      key: schedule.state,
    },
    createdAt: {
      value: <div>{schedule?.createdAt}</div>,
      key: schedule?.createdAt,
    },
    updatedAt: {
      value: <div>{schedule?.updatedAt}</div>,
      key: schedule?.id,
    },
    detail: {
      value: (
        <Link to={`/schedules/${schedule.id}`}>
          <button
            data-for="detail"
            data-tip="Click here for more detail"
            data-effect="solid"
            className={style["button"]}
          >
            <AiOutlineEllipsis size={25} />
            <ReactTooltip id="detail" />
          </button>
        </Link>
      ),
      style: {
        cursor: "pointer",
        width: "50px",
        textAlign: "center",
      },
    },
  }));

  if (isLoading && isFetching) return <Loading />;

  return (
    <div className={style["container"]}>
      <div className={style["table-container"]}>
        <Table
          head={tableHead}
          data={data}
          className={style["table"]}
          onAdd={() => {
            navigate("new");
          }}
        />
      </div>
    </div>
  );
}
