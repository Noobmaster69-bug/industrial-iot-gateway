import { useMemo, useState } from "react";
import { BsArrowBarUp } from "react-icons/bs";
import { AiOutlineEllipsis } from "react-icons/ai";
import ReactTooltip from "react-tooltip";

// import Tables from "components/Tables";
import Table from "components/Table";
import style from "./index.module.scss";
import { useDevices, useDeleteDevice } from "hooks/api";
import { ConfirmBox } from "components/ToolBox";
import { Link, useNavigate } from "react-router-dom";
export default function Devices() {
  const { data: devicesData } = useDevices();
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
      },
      {
        id: "downProtocol",
        numberic: false,
        label: "Down Protocol",
      },
      {
        id: "provision",
        numberic: false,
        label: "",
        isSort: false,
      },
      {
        id: "detail",
        numberic: false,
        label: "",
        isSort: false,
      },
    ];
  }, []);
  const onDeleteRow = (row) => {
    const deviceName = row.name.key;
    const id = devicesData.find((device) => (device.name = deviceName)).id;
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
              value: <div>{datum.name}</div>,
              key: datum.name,
            },
            status: {
              value: <div>{datum.status}</div>,
              key: datum.status,
            },
            upProtocol: {
              value: <div>{datum?.upProtocol?.Service?.name}</div>,
              key: datum.name,
            },
            downProtocol: {
              value: <div>{datum?.downProtocol?.Service?.name}</div>,
              key: datum.name,
            },
            detail: {
              value: (
                <Link
                  data-tip="Click here for more detail"
                  data-effect="solid"
                  className={style["button"]}
                  to={`/devices/${datum.id}`}
                  data-for="detail"
                >
                  <AiOutlineEllipsis size={25} />
                  <ReactTooltip id="detail" />
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
  return (
    <div className={style.container}>
      <Table
        head={head}
        className={style.table}
        data={tableData}
        checkbox
        onDeleteRow={onDeleteRow}
        onAdd={() => {
          nevigate("new");
        }}
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
    </div>
  );
}
