import { useMemo } from "react";
import { BsCloudCheck, BsCloudSlash, BsArrowBarUp } from "react-icons/bs";
import ReactTooltip from "react-tooltip";

// import Tables from "components/Tables";
import Table from "components/Table";
import style from "./index.module.scss";
import { useDevices, useDeleteDevice } from "hooks/api";
import { ConfirmBox } from "components/ToolBox";
export default function Devices() {
  const { data: devicesData } = useDevices();
  const { mutate: deleteDevice } = useDeleteDevice();
  const head = useMemo(() => {
    return [
      {
        id: "name",
        numberic: false,
        label: "Name",
      },
      {
        id: "status",
        numberic: false,
        label: "Status",
      },
      {
        id: "isProvision",
        numberic: true,
        label: "Provision Status",
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
            status: {
              value: <div>{datum.status}</div>,
              key: datum.status,
            },
            isProvision: {
              value: (
                <div>
                  {datum.isProvision ? (
                    <div
                      data-tip="This device has provisioned"
                      data-effect="solid"
                    >
                      <BsCloudCheck size={25} color="#00ad55" />
                      <ReactTooltip />
                    </div>
                  ) : (
                    <div data-tip="This device has not provisioned">
                      <BsCloudSlash size={25} color="#f30d0d" />
                      <ReactTooltip />
                    </div>
                  )}
                </div>
              ),
              key: datum.isProvision ? 1 : 0,
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
                    <div
                      style={{
                        cursor: "pointer",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                      data-tip="Provision"
                      data-effect="solid"
                    >
                      <ReactTooltip />
                      <BsArrowBarUp size={25} />
                    </div>
                  }
                >
                  Are you sure about provision?
                </ConfirmBox>
              ),
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
      />
    </div>
  );
}
