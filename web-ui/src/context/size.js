import { createContext } from "react";
import { useState, useEffect, useContext } from "react";
const Size = createContext();
export const useSize = () => useContext(Size);
export function SizeProvider({ children }) {
  const [size, setSize] = useState(
    document.getElementById("root").getBoundingClientRect()
  );
  function changeSize() {
    const { width, height } = document
      .getElementById("root")
      .getBoundingClientRect();
    setSize({ width, height });
  }
  useEffect(() => {
    window.addEventListener("resize", changeSize);
    return () => {
      window.removeEventListener("resize", changeSize);
    };
  }, []);
  return <Size.Provider value={{ size }} children={children} />;
}
