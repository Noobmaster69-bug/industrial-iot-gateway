import Paper from "components/Paper";
import style from "./index.module.scss";
export default function BasicDetails({
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
    <Paper className={style["container"]}>
      <h3 className={style["header"]}>Basic Details</h3>
      <hr />
      <div className={style["body"]}>
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
          </tbody>
        </table>
      </div>
    </Paper>
  );
}
