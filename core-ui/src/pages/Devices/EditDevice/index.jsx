import { useCreateDevice, useDevices, useGetProtocol, useProtocol } from "apis";
import style from "./index.module.scss";
import { BsArrowLeft } from "react-icons/bs";
import clsx from "clsx";
import { useNavigate, useParams } from "react-router-dom";
import AddChanel from "../AddDevice/AddChannel";
import BasicPanel from "../AddDevice/BacisDetails";
import UpProtocol from "../AddDevice/UpProtocol";
import DownProtocol from "../AddDevice/DownProtocol";
import { useEffect, useState } from "react";
import _ from "lodash";
import { errorToast as toast } from "utilities";
import EditChannel from "../AddDevice/EditChannel";
import Channels from "../AddDevice/Channels";
export default function AddBox() {
  const { id } = useParams();

  const { data: device, isLoading } = useDevices(id);
  const [formData, setFormData] = useState({
    name: "",
    manufacturer: "",
    modelName: "",
    type: "",
    upProtocol: {},
    downProtocol: {},
    channels: [],
  });
  useEffect(() => {
    if (!isLoading) {
      setFormData(device);
    }
  }, [isLoading]);
  const downService = useGetProtocol(formData?.downProtocol?.ServiceId);
  const channels = formData?.channels || [];
  // const { isLoading } = useProtocol();
  const [addChannel, setAddChannel] = useState(false);
  const [editChannel, setEditChannel] = useState(false);
  const [currentEditChannel, setCurrentEditChannel] = useState({});
  const { mutate: createDevice } = useCreateDevice({
    onSuccess: () => {
      nevigate(-1);
    },
  });

  const nevigate = useNavigate();

  // useEffect(() => {
  //   setDownService(downServices[0]);
  // }, [downServices, protocols]);
  if (isLoading) {
    return <div></div>;
  }
  function onSubmit(event) {
    event.preventDefault();
    console.log(formData);
    createDevice(formData);
  }

  const tableData = formData.channels.map((channel) => {
    const channelProps = Object.keys(channel);
    const channelData = channelProps.reduce((pre, curr) => {
      return {
        ...pre,
        [curr]: {
          value: <div>{channel[curr]}</div>,
          key: channel[curr],
        },
      };
    }, {});
    return channelData;
  });
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
            onDeleteRow={(row) => {
              const index = tableData.findIndex((channel) =>
                _.isEqual(row, channel)
              );
              setFormData({
                ...formData,
                channels: channels.filter((channel, id) => id !== index),
              });
            }}
            onEditRow={(row) => {
              setCurrentEditChannel(row);
              setEditChannel(true);
            }}
          />
        </div>
      </form>
      <AddChanel
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
            ({}, i) => index !== i
          );
          if (validateChannel(data, tempChannels)) {
            channels[index] = data;
            setFormData({ ...formData, channels });
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
