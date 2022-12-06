import { axios } from "utils";
import { useQuery } from "@tanstack/react-query";
import mqtt from "mqtt/dist/mqtt";
import { createContext, useState } from "react";
import { useContext } from "react";
import { useEffect } from "react";

const mqttContext = createContext();

export const useMqtt = () => useContext(mqttContext);

export function MqttProvider({ children }) {
  const [isConnected, setIsConnected] = useState(false);
  const [status, setStatus] = useState({});
  const [upload, setUpload] = useState([]);
  const [download, setDownload] = useState([]);
  const [logs, setLogs] = useState([]);
  useEffect(() => {
    const client = mqtt.connect("mqtt://localhost:8083/mqtt");
    client.on("connect", () => {
      setIsConnected(true);
      client.subscribe("$CORE/health");
      client.subscribe("$CORE/logs");
      client.on("message", (_topic, message) => {
        switch (_topic) {
          case "$CORE/health":
            const { cpu, mem, drive, netstat, uptime, ts } =
              JSON.parse(message);
            setStatus({ cpu, mem, drive, uptime, netstat, ts });
            setUpload((upload) => {
              const newArray = [
                ...upload,
                {
                  x: new Date(ts),
                  y: netstat.total.outputMb,
                },
              ];
              return newArray;
            });
            setDownload((download) => {
              const newArray = [
                ...download,
                {
                  x: new Date(ts),
                  y: netstat.total.inputMb,
                },
              ];
              return newArray;
            });
            break;
          case "$CORE/logs":
            setLogs([...logs, JSON.parse(message)]);
            break;
          default:
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
      value={{ isConnected, status, upload, download, logs }}
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
