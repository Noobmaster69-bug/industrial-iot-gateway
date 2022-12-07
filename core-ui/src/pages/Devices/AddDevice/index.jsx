import style from "./index.module.scss";
import { BsArrowLeft } from "react-icons/bs";
import clsx from "clsx";
import { useNavigate } from "react-router-dom";
import BasicPanel from "./BacisDetails";
import DownProtocol from "./downProtocol";
import { useState } from "react";
import _ from "lodash";
import { errorToast as toast } from "utils";
import { useCreateDevice, useProtocols } from "apis";
import UpProtocol from "./upProtocol";
import Channels from "./Channel";
import AddChannel from "./AddChannel";
import EditChannel from "./EditChannel";

export default function AddDevice() {
  const {
    data: { southBound },
    isLoading,
  } = useProtocols();

  const [addChannel, setAddChannel] = useState(false);
  const [editChannel, setEditChannel] = useState(false);
  const [currentEditChannel, setCurrentEditChannel] = useState({});
  const { mutate: createDevice } = useCreateDevice({
    onSuccess: () => {
      nevigate(-1);
    },
  });
  const [formData, setFormData] = useState({
    name: "",
    manufacturer: "",
    modelName: "",
    type: "",
    upProtocol: {},
    downProtocol: {},
    channels: [],
  });
  const downService = southBound.find(
    (plugin) => plugin.name === formData.downProtocol?.plugin
  );
  const nevigate = useNavigate();
  if (isLoading) {
    return <div></div>;
  }
  function onSubmit(event) {
    event.preventDefault();
    createDevice(formData);
  }
  function validateChannel(data, channels) {
    const channelsProps = Object.entries(downService?.channels || {}).map(
      ([k, v], i) => {
        return {
          key: k,
          ...v,
        };
      }
    );
    const uniqueSimple = channelsProps.filter((props) => props.unique === true);
    for (const props of uniqueSimple) {
      if (channels.some((channel) => channel[props.key] === data[props.key])) {
        toast(`${props.label || props.key} must be unique`);
        return false;
      }
    }
    const uniqueComplexes = channelsProps
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
  function handleChange(newFormData) {
    setFormData((formData) => ({ ...formData, ...newFormData }));
  }

  return (
    <>
      <form onSubmit={onSubmit} className={style.container}>
        <div className={style.header}>
          <div
            className={style["back"]}
            onClick={() => {
              nevigate(-1);
            }}
          >
            <BsArrowLeft size={24} />
          </div>
          <h2>Add Device</h2>
          <span style={{ flex: "1 1" }} />
          <input
            type="submit"
            value="Create"
            className={clsx(["button", "confirm"])}
          />
        </div>
        <div className={style.body}>
          <BasicPanel formData={formData} onChange={handleChange} />
          <UpProtocol formData={formData} onChange={handleChange} />
          <DownProtocol formData={formData} onChange={handleChange} />
          <Channels
            formData={formData}
            onChange={handleChange}
            onAdd={() => {
              setAddChannel(true);
            }}
            onEditRow={(row) => {
              setCurrentEditChannel(row);
              setEditChannel(true);
            }}
            onDeleteRow={(channels) => {
              handleChange({ channels });
            }}
          />
        </div>
      </form>
      <AddChannel
        formData={formData}
        onChange={handleChange}
        open={addChannel}
        onConfirm={(data) => {
          if (!data) {
            setAddChannel(false);
          }
        }}
        onCancel={() => {
          setAddChannel(false);
        }}
      />
      <EditChannel
        formData={formData}
        onChange={formData}
        open={editChannel}
        channel={currentEditChannel}
        onConfirm={(data) => {
          const preData = Object.keys(currentEditChannel).reduce(
            (pre, curr) => {
              return { ...pre, [curr]: currentEditChannel[curr].key };
            },
            {}
          );
          const index = formData.channels.findIndex((channel) =>
            _.isEqual(preData, channel)
          );
          // eslint-disable-next-line no-empty-pattern
          const tempChannels = [...formData.channels].filter(
            (_v, i) => index !== i
          );
          if (validateChannel(data, tempChannels)) {
            let newChannels = formData.channels;
            newChannels[index] = data;
            handleChange({ channels: newChannels });
            setEditChannel(false);
          }
        }}
        onCancel={() => {
          setEditChannel(false);
        }}
      />
    </>
  );
}
