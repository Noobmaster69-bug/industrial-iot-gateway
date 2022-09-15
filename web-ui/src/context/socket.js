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
  const [log, setLog] = useState([]);
  useEffect(() => {
    const socket = io("http://localhost:33333");
    socket.on("connect", () => {
      console.log("connected to server");
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
        setLog((log) => {
          return [...log, msg];
        });
      });
    });
    return () => {
      socket.removeAllListeners();
    };
  }, []);
  return <Socket.Provider value={{ performance, log }} children={children} />;
}
