import { useDevice, usePlugins } from "apis";
import { SortTable } from "components/Table";
import { DialogBox } from "components/ToolBox";
import { useCallback, useMemo } from "react";
import { useState } from "react";

export default function AddChannel({
  formData,
  onChange,
  open = true,
  onConfrim = () => {},
  onCancel = () => {},
}) {
  const {
    data: { southBound },
  } = usePlugins();
  const { data: thisDevice } = useDevice({ id: formData?.Device?.id });
  const thisDownProtocol = (southBound || []).find(
    (plugin) => plugin.name === thisDevice?.downProtocol?.plugin
  );
  const head = useMemo(() => {
    return [
      {
        id: "name",
        numberic: false,
        label: "Name",
      },
      {
        id: "readWrite",
        numberic: false,
        label: "Read Write",
      },
      {
        id: "offset",
        numberic: false,
        label: "Offset",
      },
      {
        id: "scale",
        numberic: false,
        label: "Scale",
      },
      {
        id: "precision",
        numberic: false,
        label: "Precision",
      },
      ...Object.entries(thisDownProtocol?.channels || {}).map(
        ([key, value]) => ({
          id: key,
          numberic: false,
          label: value?.label || key?.charAt(0)?.toUpperCase() + key.slice(1),
        })
      ),
    ];
  }, [thisDownProtocol?.channels]);
  const tableData = useMemo(() => {
    console.log("rerender");
    return (thisDevice?.channels || []).map((channel) => {
      const channelProps = Object.keys(channel);
      const channelData = channelProps.reduce(
        (pre, curr) => {
          return {
            ...pre,
            [curr]: {
              value: <div>{channel[curr] || "_"}</div>,
              key: channel[curr],
            },
          };
        },
        {
          ___isSelect: formData.channels.some(
            (_channel) => channel.id === _channel.id
          ),
        }
      );
      return channelData;
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [thisDevice?.channels]);
  const [select, setSelect] = useState(
    thisDevice?.channels?.find((_channel) =>
      formData?.channels?.some((channel) => channel.id === _channel.id)
    )
  );
  const handleSelect = useCallback(
    (data) => {
      const channels = data.map((item) =>
        thisDevice?.channels.find((cn) => cn.id === item.id.key)
      );
      setSelect(channels);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );
  return (
    <DialogBox
      open={open}
      onConfirm={() => {
        // onConfrim(select);
        console.log(select);
      }}
      onCancel={() => {
        onCancel();
      }}
    >
      <SortTable
        checkbox
        data={tableData}
        head={head}
        onSelect={handleSelect}
      />
    </DialogBox>
  );
}
