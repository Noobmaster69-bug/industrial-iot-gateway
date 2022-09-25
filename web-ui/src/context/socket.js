import { createContext } from "react";
import io from "socket.io-client";
import { useState, useEffect, useContext } from "react";
const Socket = createContext();
export const useSocket = () => useContext(Socket);
export function SocketProvider({ children }) {
  const [performance, setPerformance] = useState({
    ram: 0,
    cpu: 0,
    disk: 0,
    upload: [],
    download: [],
  });
  const [logs, setLogs] = useState([]);
  const [isConnected, setIsConnected] = useState(false);
  useEffect(() => {
    const socket = io("http://localhost:33333");
    socket.on("connect", () => {
      setIsConnected(true);
      socket.on("performance", (msg) => {
        setPerformance((data) => {
          let tmp = data;
          tmp.upload.push({
            x: new Date(),
            y: msg.outputMb || 0,
          });
          tmp.download.push({
            x: new Date(),
            y: msg.inputMb || 0,
          });
          if (tmp.upload.length > 40) {
            tmp.upload = tmp.upload.slice(data.length - 10, data.length);
            tmp.download = tmp.download.slice(data.length - 10, data.length);
          }
          return { ...tmp, ...msg };
        });
      });
      socket.on("__log", (msg) => {
        setLogs((log) => {
          let tmp = log;
          tmp.push(msg);
          if (tmp.length > 40) {
            tmp = tmp.slice(tmp.length - 10, tmp.length);
          }
          return [...tmp, msg];
        });
      });
    });
    return () => {
      socket.removeAllListeners();
    };
  }, []);
  return (
    <Socket.Provider
      value={{ performance, logs, isConnected }}
      children={children}
    />
  );
}
