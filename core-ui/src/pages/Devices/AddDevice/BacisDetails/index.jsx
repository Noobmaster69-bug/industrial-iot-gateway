import { useMemo } from "react";
import Paper from "components/Paper";
import DetailForm from "components/DetailForm";
import style from "./index.module.scss";
export default function BasicPanel({
  formData = {
    name: "",
    manufacturer: "",
    modelName: "",
    type: "",
  },
  onChange = () => {},
}) {
  function handleChange(e) {
    onChange({ ...formData, ...e });
  }
  const keys = useMemo(() => {
    return {
      name: {
        type: "STRING",
        allowNull: false,
        placeholder: "Inverter 1,...",
      },
      manufacturer: {
        type: "STRING",
        placeholder: "Moxa",
      },
      type: {
        type: "STRING",
        placeholder: "Inverter,...",
      },
      modelName: {
        type: "STRING",
        label: "Model Name",
        placeholder: "SUN2000,...",
      },
      key: {
        type: "STRING",
        label: "Device Key",
        allowNull: false,
      },
    };
  }, []);
  return (
    <div className={style["basic-panel"]}>
      <Paper>
        <div className={style["form-container"]}>
          <DetailForm
            keys={keys}
            onChange={handleChange}
            values={formData}
            header="Basic Details"
          />
        </div>
      </Paper>
    </div>
  );
}
