import style from "./index.module.scss";
import DialogBox from "components/ToolBox/DialogBox";
import { useRef } from "react";
import { usePlugins } from "apis";
export default function EditChannel({
  formData,

  open = false,
  onConfirm = function () {},
  onCancel = () => {},
  channel,
}) {
  const {
    data: { southBound },
  } = usePlugins();
  const downService = southBound.find(
    (plugin) => plugin.name === formData.downProtocol?.plugin
  );
  const form = useRef();
  const input = useRef();
  function DataTypetoInputType(type) {
    switch (type) {
      case "INTEGER":
        return "number";
      default:
        return "text";
    }
  }
  return (
    <DialogBox
      open={open}
      onConfirm={() => {
        input.current.click();
      }}
      onCancel={() => {
        onCancel();
      }}
    >
      <form
        className={style.container}
        ref={form}
        onSubmit={(e) => {
          e.preventDefault();
          const data = Object.fromEntries(new FormData(form.current));
          onConfirm(data);
        }}
        id="addChannel"
      >
        <div className={style.body}>
          <div className={style["protocol-panel"]}>
            <div className={style["panel-header"]}>
              <h3>Edit Channel</h3>
            </div>
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
                        name="name"
                        placeholder="Temperature,..."
                        required
                        form="addChannel"
                        defaultValue={channel?.name?.key}
                      />
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <label>
                        <h4>ReadWrite</h4>
                      </label>
                    </td>
                    <td>
                      <select
                        name="readWrite"
                        form="addChannel"
                        defaultValue={channel["readWrite"]?.key}
                      >
                        <option value="R">Read</option>
                        <option value="W">Write</option>
                        <option value="RW">Read/Write</option>
                      </select>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <label>
                        <h4>Offset</h4>
                      </label>
                    </td>
                    <td>
                      <input
                        name="offset"
                        placeholder="0"
                        type="number"
                        defaultValue={channel?.offset?.key}
                        form="addChannel"
                      />
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <label>
                        <h4>Scale</h4>
                      </label>
                    </td>
                    <td>
                      <input
                        name="scale"
                        placeholder="1"
                        type="number"
                        defaultValue={channel?.scale?.key}
                        form="addChannel"
                      />
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <label>
                        <h4>Precision</h4>
                      </label>
                    </td>
                    <td>
                      <input
                        name="precision"
                        placeholder="NaN"
                        type="number"
                        defaultValue={channel?.precision?.key}
                        form="addChannel"
                      />
                    </td>
                  </tr>
                  {Object.entries(downService?.channels || {}).map(
                    ([key, value], index) => (
                      <tr key={"channels" + index}>
                        <td>
                          <label>
                            <h4>{key[0].toUpperCase() + key.slice(1)}</h4>
                          </label>
                        </td>
                        <td>
                          {value?.type === "ENUM" ? (
                            <select
                              name={key}
                              form="addChannel"
                              defaultValue={channel[key]?.key}
                            >
                              {(value?.values).map((vl, index) => (
                                <option value={vl} key={+index}>
                                  {vl}
                                </option>
                              ))}
                            </select>
                          ) : (
                            <input
                              name={key}
                              placeholder={value?.placeholder}
                              required={!value?.allowNull}
                              type={DataTypetoInputType(value?.type)}
                              defaultValue={channel[key]?.key}
                              form="addChannel"
                            />
                          )}
                        </td>
                      </tr>
                    )
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <input type="submit" hidden ref={input} form="addChannel" />
      </form>
    </DialogBox>
  );
}
