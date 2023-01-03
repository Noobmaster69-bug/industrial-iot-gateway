import { axios } from "utils";
import { useQuery } from "@tanstack/react-query";
import mqtt from "mqtt/dist/mqtt";
import { createContext, useState } from "react";
import { useContext } from "react";
import { useEffect } from "react";

const mqttContext = createContext();

// clean up chart array to prevent memory leaks
function cleanUpArray(array = []) {
  if (array.length > 5 * 60) {
    //if sample rate = 1 sample/s array will be clean up every 5 minutes
    return array.splice(0, array.length - 25);
  } else {
    return array;
  }
}

export const useMqtt = () => useContext(mqttContext);

export function MqttProvider({ children }) {
  const [isConnected, setIsConnected] = useState(false);
  const [status, setStatus] = useState({});
  const [upload, setUpload] = useState([]);
  const [download, setDownload] = useState([]);
  const [logs, setLogs] = useState([]);
  const [_mem, setMem] = useState([]);
  const [cpu, setCPU] = useState([]);
  useEffect(() => {
    const client = mqtt.connect(`mqtt://${window.location.hostname}:8083/mqtt`);
    client.on("connect", () => {
      setIsConnected(true);

      //subscribes to system topic
      client.subscribe("$CORE/#");
      // client.subscribe("$CORE/logs");

      //handle message
      client.on("message", (_topic, message) => {
        switch (_topic) {
          case "$CORE/health":
            const { cpu, mem, drive, netstat, uptime, ts } =
              JSON.parse(message);

            //update status
            setStatus({ cpu, mem, drive, uptime, netstat, ts });

            //update upload array
            setUpload((upload) => {
              const newArray = [
                ...upload,
                {
                  x: new Date(ts),
                  y: netstat.total.outputMb,
                },
              ];

              return cleanUpArray(newArray);
            });

            //update download array
            setDownload((download) => {
              const newArray = [
                ...download,
                {
                  x: new Date(ts),
                  y: netstat.total.inputMb,
                },
              ];
              return cleanUpArray(newArray);
            });

            //update cpu array
            setCPU((_cpu) => {
              const newArray = [
                ..._cpu,
                {
                  x: new Date(ts),
                  y: cpu,
                },
              ];
              return cleanUpArray(newArray);
            });

            //update memory array

            setMem((__mem) => {
              const newArray = [
                ...__mem,
                {
                  x: new Date(ts),
                  y: mem.usedMemPercentage,
                },
              ];
              return cleanUpArray(newArray);
            });

            break;
          case "$CORE/logs":
            console.log("allo");
            //update logs
            setLogs((_logs) => [..._logs, JSON.parse(message)]);
            break;
          default:
            console.log("allo");
        }
      });
    });
    client.on("offline", () => {
      setIsConnected(false);
    });
    return () => {
      client.end();
      client.removeAllListeners();
    };
  }, []);
  return (
    <mqttContext.Provider
      children={children}
      value={{ isConnected, status, upload, download, logs, mem: _mem, cpu }}
    />
  );
}

async function getSystemInfo() {
  const { data } = await axios.get("/healthcheck");
  return data;
}
export function useSystemInfo() {
  return useQuery(["system"], getSystemInfo, {
    staleTime: Infinity,
  });
}
