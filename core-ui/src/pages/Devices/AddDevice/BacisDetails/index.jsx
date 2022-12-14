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
          {/* <table>
          <tbody>
            <tr>
              <td>
                <label>
                  <h4>Name</h4>
                </label>
              </td>
              <td>
                <input
                  type="text"
                  name="name"
                  placeholder="Inverter 1,..."
                  required
                  value={formData.name}
                  onChange={handleChange}
                />
              </td>
            </tr>
            <tr>
              <td>
                <label>
                  <h4>Manufacturer</h4>
                </label>
              </td>
              <td>
                <input
                  type="text"
                  name="manufacturer"
                  placeholder="Schneider,..."
                  value={formData.manufacturer}
                  onChange={handleChange}
                />
              </td>
            </tr>
            <tr>
              <td>
                <label>
                  <h4>Model</h4>
                </label>
              </td>
              <td>
                <input
                  type="text"
                  name="modelName"
                  placeholder="SUN2000,..."
                  value={formData.modelName}
                  onChange={handleChange}
                />
              </td>
            </tr>
            <tr>
              <td>
                <label>
                  <h4>Type</h4>
                </label>
              </td>
              <td>
                <input
                  type="text"
                  name="type"
                  placeholder="Inverter,..."
                  value={formData.type}
                  onChange={handleChange}
                />
              </td>
            </tr>
          </tbody>
        </table> */}
        </div>
      </Paper>
    </div>
  );
}
