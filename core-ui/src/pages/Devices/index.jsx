import { useMemo, useState } from "react";
import { BsArrowBarUp } from "react-icons/bs";
import { AiOutlineEllipsis } from "react-icons/ai";
import ReactTooltip from "react-tooltip";

import Table from "components/Table";
import style from "./index.module.scss";
import { Link, useNavigate } from "react-router-dom";
import { ConfirmBox } from "components/ToolBox";

import { useAllDevices, useDeleteDevice } from "apis";

export function DevicesTable({
  limit = 10,
  removeBox,
  addBox,
  editBox,
  checkbox = true,
  chooseBox = false,
  onChoosen = () => {},
}) {
  // pages params
  const [pages, setPages] = useState({
    start: 0,
    order: "asc",
    orderBy: "name",
  });
  const navigate = useNavigate();

  //query devices with pagination
  const { data: devicesQueryData } = useAllDevices({ ...pages, limit });

  // get device data
  const devicesData = useMemo(
    () => devicesQueryData?.devices || [],
    [devicesQueryData?.devices]
  );

  //delete device
  const { mutate: deleteDevice } = useDeleteDevice();

  const [deleteConfirm, setDeleteConfirm] = useState(false);
  const [deviceDeleteId, setDeviceDeleteId] = useState(null);

  //table metadata
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
      },
      {
        id: "downProtocol",
        numberic: false,
        label: "Down Protocol",
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

  //table data
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

  const onDeleteRow = (row) => {
    const deviceName = row.name.key;
    const id = devicesData.find((device) => device.name === deviceName).id;
    setDeviceDeleteId(id);
    setDeleteConfirm(true);
  };
  const onSort = (row) => {
    const { id, state } = row;
    setPages({ ...pages, order: state === "up" ? "desc" : "asc", orderBy: id });
  };

  return (
    <>
      <Table
        //metadata
        head={head}
        data={tableData}
        className={style.table}
        start={pages.start}
        limit={limit}
        total={devicesQueryData?.total}
        removeBox={removeBox}
        addBox={addBox}
        editBox={editBox}
        checkbox={checkbox}
        chooseBox={chooseBox}
        //listener
        onDeleteRow={onDeleteRow}
        onAdd={() => {
          navigate("new");
        }}
        onEditRow={(row) => {
          const { id } = devicesData.find((data) => data.name === row.name.key);
          navigate(`${id}/edit`);
        }}
        onSort={onSort}
        onChangePage={(e) => {
          setPages((_pages) => {
            return { ..._pages, ...e };
          });
        }}
        onChoosen={onChoosen}
      />
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
    </>
  );
}

export default function Devices() {
  return (
    <div className={style.container}>
      <div className={style["table-container"]}>
        <DevicesTable />
      </div>
    </div>
  );
}
