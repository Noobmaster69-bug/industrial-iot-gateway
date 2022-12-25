import { usePlugins } from "apis";
import { useEffect } from "react";
import style from "./index.module.scss";
import DetailForm from "components/DetailForm";
import { useMemo } from "react";
import Paper from "components/Paper";

export default function UpProtocol({ formData = {}, onChange = () => {} }) {
  const {
    data: { southBound },
  } = usePlugins();
  useEffect(() => {
    onChange({
      downProtocol: { ...formData.downProtocol, plugin: southBound[0]?.name },
    });
    // eslint-disable-next-line
  }, [southBound]);
  const keys = useMemo(() => {
    console.log(formData.downProtocol.plugin);
    return {
      name: {
        type: "STRING",
        allowNull: false,
        placeholder: "Connection 1",
      },
      ...(
        southBound.find((item) => item.name === formData.downProtocol.plugin) ||
        {}
      )?.protocols,
    };
  }, [formData.downProtocol.plugin, southBound]);
  return (
    <div className={style["panel"]}>
      <Paper>
        <DetailForm
          keys={keys}
          header={
            <div className={style["panel-header"]}>
              <h3>South Bound Panel</h3>
              <select
                onChange={(e) => {
                  onChange({
                    downProtocol: {
                      ...formData.downProtocol,
                      plugin: e.target.value,
                    },
                  });
                }}
                name="ServiceId"
                value={formData.downProtocol.plugin}
              >
                {southBound.map((protocol, index) => {
                  return (
                    <option value={protocol.name} key={index + "protocol"}>
                      {protocol.name}
                    </option>
                  );
                })}
              </select>
            </div>
          }
          onChange={(_vl) => {
            console.log(_vl);
            onChange({ downProtocol: { ...formData.downProtocol, ..._vl } });
          }}
          values={formData.downProtocol}
        />
      </Paper>
    </div>
  );
}
