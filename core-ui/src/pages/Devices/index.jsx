import { useMemo, useState } from "react";
import { BsArrowBarUp } from "react-icons/bs";
import { AiOutlineEllipsis } from "react-icons/ai";
import ReactTooltip from "react-tooltip";

import Table from "components/Table";
import style from "./index.module.scss";
import { Link, useNavigate } from "react-router-dom";
import { ConfirmBox } from "components/ToolBox";

import { AiOutlineArrowLeft, AiOutlineArrowRight } from "react-icons/ai";

import { useAllDevices, useDeleteDevice } from "apis";
import clsx from "clsx";

export default function Devices() {
  const [pages, setPages] = useState({
    start: 0,
    order: "asc",
    orderBy: "name",
  });
  const { data: devicesQueryData } = useAllDevices({ ...pages, limit: 10 });
  const devicesData = useMemo(
    () => devicesQueryData?.devices || [],
    [devicesQueryData?.devices]
  );
  const { mutate: deleteDevice } = useDeleteDevice();

  const nevigate = useNavigate();
  const [deleteConfirm, setDeleteConfirm] = useState(false);
  const [deviceDeleteId, setDeviceDeleteId] = useState(null);
  const head = useMemo(() => {
    return [
      {
        id: "name",
        numberic: false,
        label: "Name",
      },
      {
        id: "modelName",
        numberic: false,
        label: "Model",
      },
      {
        id: "status",
        numberic: false,
        label: "Status",
      },
      {
        id: "upProtocol",
        numberic: false,
        label: "Up Protocol",
        sortable: false,
      },
      {
        id: "downProtocol",
        numberic: false,
        label: "Down Protocol",
        sortable: false,
      },
      {
        id: "createdAt",
        numberic: false,
        label: "Created At",
      },
      {
        id: "updatedAt",
        numberic: false,
        label: "Last Update",
      },
      {
        id: "detail",
        numberic: false,
        label: "",
        sortable: false,
      },
    ];
  }, []);
  const onDeleteRow = (row) => {
    const deviceName = row.name.key;
    const id = devicesData.find((device) => device.name === deviceName).id;
    setDeviceDeleteId(id);
    setDeleteConfirm(true);
  };
  const tableData = useMemo(
    () =>
      ((data) => {
        return (data || []).map((datum) => {
          return {
            name: {
              value: <div>{datum.name}</div>,
              key: datum.name,
            },
            modelName: {
              value: <div>{datum.modelName}</div>,
              key: datum.name,
            },
            status: {
              value: <div>{datum.status}</div>,
              key: datum.status,
            },
            upProtocol: {
              value: <div>{datum?.upProtocol?.name}</div>,
              key: datum.name,
            },
            downProtocol: {
              value: <div>{datum?.downProtocol?.name}</div>,
              key: datum.name,
            },
            createdAt: {
              value: <div>{datum?.createdAt}</div>,
              key: datum.createdAt,
            },
            updatedAt: {
              value: <div>{datum?.updatedAt}</div>,
              key: datum.updatedAt,
            },
            detail: {
              value: (
                <Link to={`/devices/${datum.id}`}>
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
            provision: {
              value: (
                <ConfirmBox
                  // onConfirm={() => {
                  //   mutate(data.id);
                  // }}
                  trigger={
                    <button
                      data-tip="Provision"
                      data-effect="solid"
                      className={style["button"]}
                      data-for="provision"
                    >
                      <ReactTooltip id="provision" />
                      <BsArrowBarUp size={25} />
                    </button>
                  }
                >
                  Are you sure about provision?
                </ConfirmBox>
              ),
              style: {
                cursor: "pointer",
                width: "50px",
                textAlign: "center",
              },
            },
          };
        });
      })(devicesData),
    [devicesData]
  );
  const onSort = (row) => {
    const { id, state } = row;
    setPages({ ...pages, order: state === "up" ? "desc" : "asc", orderBy: id });
  };
  return (
    <div className={style.container}>
      <div className={style["table-container"]}>
        <Table
          head={head}
          data={tableData}
          checkbox
          onDeleteRow={onDeleteRow}
          onAdd={() => {
            nevigate("new");
          }}
          className={style.table}
          onEditRow={(row) => {
            const { id } = devicesData.find(
              (data) => data.name === row.name.key
            );
            nevigate(`${id}/edit`);
          }}
          onSort={onSort}
        />
        <div className={style["tool-box"]}>
          <button
            className={clsx([
              style["button"],
              pages.start === 0 && style["button-inactive"],
            ])}
            onClick={() => {
              setPages({ ...pages, start: pages.start - 10 });
            }}
          >
            <AiOutlineArrowLeft size={20} />
          </button>
          <span style={{ margin: "0 16px" }}>
            Page {Math.floor(pages.start / 10 + 1)} /{" "}
            {Math.floor((devicesQueryData?.total || 1) / 10) + 1}
          </span>
          <button
            className={clsx([
              style["button"],
              Math.floor(pages.start / 10 + 1) ===
                Math.floor((devicesQueryData?.total || 1) / 10) + 1 &&
                style["button-inactive"],
            ])}
            onClick={() => {
              setPages({ ...pages, start: pages.start + 10 });
            }}
          >
            <AiOutlineArrowRight size={20} />
          </button>
        </div>
      </div>
      <ConfirmBox
        open={deleteConfirm}
        onClose={() => {
          setDeleteConfirm(false);
          setDeviceDeleteId(null);
        }}
        onConfirm={() => {
          deleteDevice(deviceDeleteId);
        }}
      >
        Delete device?
      </ConfirmBox>
    </div>
  );
}
