import { useMemo } from "react";
import { BsArrowBarUp } from "react-icons/bs";
import ReactTooltip from "react-tooltip";

// import Tables from "components/Tables";
import Table from "components/Table";
import style from "./index.module.scss";
import { useDevices, useDeleteDevice } from "hooks/api";
import { ConfirmBox } from "components/ToolBox";
import { Route, Routes, useNavigate } from "react-router-dom";
import AddDevice from "./AddDevice";
export default function Devices() {
  const { data: devicesData } = useDevices();
  const { mutate: deleteDevice } = useDeleteDevice();
  const nevigate = useNavigate();
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
    ];
  }, []);
  const onDeleteRow = (row) => {
    deleteDevice(row);
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
                    >
                      <ReactTooltip />
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
    <Routes>
      <Route
        index
        element={
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
          </div>
        }
      />
      <Route path="new" element={<AddDevice />} />
    </Routes>
  );
}
