import style from "./AddChannel.module.scss";
import DialogBox from "components/ToolBox/DialogBox";
import { useRef } from "react";
// import { useState } from "react";
export default function AddChanel({
  downService,
  open: [open, setOpen],
  onConfirm = () => {},
}) {
  const [addChannel, setAddChannel] = [open, setOpen];
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
      open={addChannel}
      onConfirm={() => {
        input.current.click();
      }}
      onCancel={() => {
        setAddChannel(false);
      }}
    >
      <form
        className={style.container}
        ref={form}
        onSubmit={(e) => {
          e.preventDefault();
          const formData = new FormData(form.current);
          const data = Object.fromEntries(formData);
          onConfirm(data);
          setAddChannel(false);
        }}
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
                      <select name="readWrite">
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
                          <select name={props.key}>
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
        <button
          // type="submit"
          hidden
          ref={input}
          onClick={() => {
            console.log("click");
          }}
        />
      </form>
    </DialogBox>
  );
}
