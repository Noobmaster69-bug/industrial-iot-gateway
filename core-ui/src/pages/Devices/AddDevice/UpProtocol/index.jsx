import { usePlugins } from "apis";
import { useEffect } from "react";
import style from "./index.module.scss";
import DetailForm from "components/DetailForm";
import { useMemo } from "react";
import Paper from "components/Paper";

export default function UpProtocol({ formData = {}, onChange = () => {} }) {
  const {
    data: { northBound },
  } = usePlugins();
  useEffect(() => {
    onChange({
      upProtocol: { ...formData.upProtocol, plugin: northBound[0]?.name },
    });
    // eslint-disable-next-line
  }, [northBound]);

  const keys = useMemo(() => {
    return {
      name: {
        type: "STRING",
        allowNull: false,
        placeholder: "Connection 1",
      },
      ...(
        northBound.find((item) => item.name === formData.upProtocol.plugin) ||
        {}
      )?.protocols,
    };
  }, [formData.upProtocol.plugin, northBound]);
  return (
    <div className={style["panel"]}>
      <Paper>
        <DetailForm
          keys={keys}
          header={
            <div className={style["panel-header"]}>
              <h3>North Bound Panel</h3>
              <select
                onChange={(e) => {
                  onChange({
                    upProtocol: {
                      ...formData.upProtocol,
                      plugin: e.target.value,
                    },
                  });
                }}
                name="ServiceId"
                value={formData.upProtocol.plugin}
              >
                {northBound.map((protocol, index) => {
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
            onChange({ upProtocol: { ...formData.upProtocol, ..._vl } });
          }}
          values={formData.upProtocol}
        />
      </Paper>
    </div>
  );
}
