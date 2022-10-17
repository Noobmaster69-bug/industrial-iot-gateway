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
    onChange({ ...formData, [e.target.name]: e.target.value });
  }

  return (
    <div className={style["basic-panel"]}>
      <h3 className={style["panel-header"]}>Basic Details</h3>
      <hr />
      <div className={style["form-container"]}>
        <table>
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
        </table>
      </div>
    </div>
  );
}
