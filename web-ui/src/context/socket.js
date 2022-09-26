import { createContext } from "react";
import io from "socket.io-client";
import { useState, useEffect, useContext } from "react";
import ANSI from "ansi-to-html";
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
  const ansi = new ANSI({ fg: "#595959", colors: { 10: "#35c78b" } });
  useEffect(() => {
    const socket = io("http://localhost:33333", { withCredentials: true });
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
          let tmp = [...log];

          tmp.push(
            <div dangerouslySetInnerHTML={{ __html: ansi.toHtml(msg) }} />
          );
          if (tmp.length > 40) {
            tmp = tmp.slice(log.length - 10, log.length);
          }
          return tmp;
        });
      });
      socket.on("__error", (msg) => {
        setLogs((log) => {
          let tmp = [...log];

          tmp.push(
            <div dangerouslySetInnerHTML={{ __html: ansi.toHtml(msg) }} />
          );
          if (tmp.length > 40) {
            tmp = tmp.slice(log.length - 10, log.length);
          }
          return tmp;
        });
      });
    });
    return () => {
      socket.removeAllListeners();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <Socket.Provider
      value={{ performance, logs, isConnected }}
      children={children}
    />
  );
}
