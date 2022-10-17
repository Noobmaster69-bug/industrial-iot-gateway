import style from "./index.module.scss";
import DialogBox from "components/ToolBox/DialogBox";
import { useRef } from "react";
import { useProtocol } from "apis";
import { Toast } from "utilities";
export default function AddChannel({
  formData,
  onChange,
  open = false,
  onConfirm = function () {},
  onCancel = () => {},
}) {
  const downService = (useProtocol().data || []).find(
    (service) => service.id === formData.downProtocol.ServiceId
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
  const toast = Toast("error");
  function validateChannel(data, channels) {
    const uniqueSimple = downService?.channelsProps.filter(
      (props) => props.unique === true
    );
    for (const props of uniqueSimple) {
      if (channels.some((channel) => channel[props.key] === data[props.key])) {
        toast(`${props.label || props.key} must be unique`);
        return false;
      }
    }
    const uniqueComplexes = downService?.channelsProps
      .filter((props) => (props.unique || true) !== true)
      .sort((a, b) => ("" + a.key).localeCompare(b.key));
    const uniqueGroups = uniqueComplexes.reduce((pre, curr, index, array) => {
      if (curr.unique === array[index - 1]?.unique) {
        pre[pre.length - 1].push(curr);
        return pre;
      }
      pre.push([curr]);
      return pre;
    }, []);
    for (const group of uniqueGroups) {
      if (
        channels.some((channel) =>
          group.every((member) => data[member.key] === channel[member.key])
        )
      ) {
        toast(
          `${group.reduce(
            (pre, curr) => pre + ", " + (curr.label || curr.key),
            ""
          )} must be unique`
        );
        return false;
      }
    }
    if (channels.some((channel) => channel.name === data.name)) {
      toast("Name must be unique");
      return false;
    }
    return true;
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
          if (validateChannel(data, formData.channels)) {
            onChange({ channels: [...formData.channels, data] });
            onConfirm(false);
          }
          onConfirm(true);
        }}
        id="addChannel"
      >
        <div className={style.body}>
          <div className={style["protocol-panel"]}>
            <div className={style["panel-header"]}>
              <h3>Add Channel</h3>
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
                      <select name="readWrite" form="addChannel">
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
                        defaultValue={0}
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
                        defaultValue={1}
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
                        defaultValue={Infinity}
                        form="addChannel"
                      />
                    </td>
                  </tr>
                  {(downService?.channelsProps || []).map((props, key) => (
                    <tr key={"channels" + key}>
                      <td>
                        <label>
                          <h4>
                            {props.key[0].toUpperCase() + props.key.slice(1)}
                          </h4>
                        </label>
                      </td>
                      <td>
                        {props.type === "ENUM" ? (
                          <select name={props.key} form="addChannel">
                            {JSON.parse(props.values).map((value, index) => (
                              <option value={value} key={+index}>
                                {value}
                              </option>
                            ))}
                          </select>
                        ) : (
                          <input
                            name={props.key}
                            placeholder={props.placeholder}
                            required={!props.allowNull}
                            type={DataTypetoInputType(props.type)}
                            defaultValue={props.defaultValue}
                            form="addChannel"
                          />
                        )}
                      </td>
                    </tr>
                  ))}
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
