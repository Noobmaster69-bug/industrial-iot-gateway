import { createContext } from "react";
import { useState, useEffect, useContext } from "react";
const Size = createContext();
export const useSize = () => useContext(Size);
export function SizeProvider({ children }) {
  const [size, setSize] = useState(
    document.getElementById("root").getBoundingClientRect()
  );
  useEffect(() => {
    window.addEventListener("resize", () => {
      const { width, height } = document
        .getElementById("root")
        .getBoundingClientRect();
      setSize({ width, height });
    });
    return () => {
      window.removeEventListener("resize");
    };
  }, []);
  return <Size.Provider value={{ size }} children={children} />;
}
