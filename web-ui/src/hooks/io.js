import { useState, useEffect, useRef } from "react";
import io from "socket.io-client";
export function useSocket(topic) {
  const IO = useRef(io());
  const [data, setData] = useState({});
  useEffect(() => {
    IO.current.on("connect", () => {
      console.log("connect to server");
      IO.current.emit(topic, true);
      IO.current.on(topic, (data) => {
        setData(data);
      });
    });
    return () => {};
  }, [IO]);
  return data;
}
