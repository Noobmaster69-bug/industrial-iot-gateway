import { useMemo, useState } from "react";
import ReactTooltip from "react-tooltip";
import { AiOutlineDelete, AiOutlineEdit, AiOutlinePlus } from "react-icons/ai";

import Table from "components/Tables";
import { useModels } from "hooks/api";
import { ConfirmBox } from "components/ToolBox";
import style from "./index.module.scss";
export default function Models() {
  const { data: models } = useModels();
  const [select, setSelect] = useState([]);
  const tableData = useMemo(
    () =>
      ((models) => {
        return models.map((model) => {
          return {
            onClick: () => {
              console.log(model);
            },
            name: {
              value: model.name,
              key: model.name,
            },
            manufacture: {
              value: model.manufacture,
              key: model.manufacture,
            },
            type: {
              value: model.type,
              key: model.type,
            },
            delete: {
              value: (
                <ConfirmBox
                  onConfirm={() => {
                    // deleteDevice(datum.id);
                  }}
                  trigger={
                    <div
                      className={style["icon-holder"]}
                      data-tip="Delete this model"
                      data-effect="solid"
                      data-place="top"
                      data-for="delete"
                    >
                      <ReactTooltip id="delete" />
                      <AiOutlineDelete size={25} />
                    </div>
                  }
                >
                  Are you sure about delete?
                </ConfirmBox>
              ),
            },
            edit: {
              value: (
                <ConfirmBox
                  onConfirm={() => {
                    // deleteDevice(datum.id);
                  }}
                  trigger={
                    <div
                      className={style["icon-holder"]}
                      data-tip="Edit this model"
                      data-effect="solid"
                      data-place="top"
                      data-for="delete"
                    >
                      <ReactTooltip id="delete" />
                      <AiOutlineEdit size={25} />
                    </div>
                  }
                >
                  Are you sure about delete?
                </ConfirmBox>
              ),
            },
          };
        });
      })(models || []),
    [models]
  );
  const tableHead = useMemo(() => {
    return [
      {
        id: "name",
        numberic: "",
        label: "Name",
      },
      {
        id: "manufacture",
        numberic: "",
        label: "Manufacture",
      },
      {
        id: "type",
        numberic: "",
        label: "Type",
      },
      {
        id: "edit",
        numberic: false,
        label: "",
        isSort: false,
      },
      {
        id: "delete",
        numberic: false,
        label: "",
        isSort: false,
      },
    ];
  }, []);
  return (
    <div className={style.container}>
      <div className={style["table-container"]}>
        <Table
          head={tableHead}
          data={tableData}
          select={[select, setSelect]}
          checkbox
          title={"Search"}
          searchID="name"
          selectToolBar={[
            <ConfirmBox
              onConfirm={() => {}}
              trigger={
                <div
                  className={style["icon-holder"]}
                  data-tip="Delete Devices"
                  data-effect="solid"
                  data-place="top"
                  data-for="delete"
                >
                  <ReactTooltip id="delete" />
                  <AiOutlineDelete size={25} />
                </div>
              }
            >
              Are you sure about delete?
            </ConfirmBox>,
          ]}
          headToolBar={[
            <ConfirmBox
              onConfirm={() => {}}
              trigger={
                <div
                  className={style["icon-holder"]}
                  data-tip="Add new model"
                  data-effect="solid"
                  data-place="left"
                  data-for="add"
                >
                  <ReactTooltip id="add" />
                  <AiOutlinePlus size={25} />
                </div>
              }
            >
              Are you sure about delete?
            </ConfirmBox>,
          ]}
        />
      </div>
    </div>
  );
}
