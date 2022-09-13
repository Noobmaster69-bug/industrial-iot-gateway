import { useEffect, useRef, useState } from "react";
import style from "./Carousel.module.css";
import { AiFillBackward, AiFillForward, AiOutlinePause } from "react-icons/ai";

export default function Carousel({
  children,
  interval,
  auto = false,
  Index,
  toolbars = true,
}) {
  const [index, setIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(auto);
  const [width, setWidth] = useState(0);
  const [height, setHeight] = useState(0);
  const container = useRef(false);
  function onPause() {
    setIsPlaying(!isPlaying);
  }
  function onNext() {
    setIndex((index + children.length + 1) % children.length);
  }
  function onBack() {
    setIndex((index + children.length - 1) % children.length);
  }
  function onSwitch(i) {
    setIndex(i);
  }
  useEffect(() => {
    if (isPlaying) {
      let i = setTimeout(() => {
        setIndex((index + 1) % children.length);
      }, interval);
      return () => {
        clearTimeout(i);
      };
    }
  }, [auto, children.length, index, interval, isPlaying]);
  useEffect(() => {
    if (container) {
      const { height, width } = container.current.getBoundingClientRect();
      setHeight(height);
      setWidth(width);
    }
  }, []);
  useEffect(() => {
    setIndex(Index);
  }, [Index]);
  return (
    <div className={style.container} ref={container}>
      {toolbars && (
        <>
          <div
            className={style["tool-bar"]}
            style={{
              justifyContent: "center",
              bottom: 32,
              width: width,
            }}
          >
            {children.map((e, i) => (
              <svg
                height="20"
                width="20"
                className={style["icon-2"]}
                onClick={() => onSwitch(i)}
                key={i}
              >
                <circle
                  cx="10"
                  cy="10"
                  r={index === i ? "8" : "5"}
                  fill="black"
                  stroke={index === i ? "white" : "none"}
                  strokeWidth="3px"
                />
              </svg>
            ))}
          </div>
          <div
            className={style["tool-bar"]}
            style={{
              bottom: 8,
              width: width,
            }}
          >
            <AiFillBackward onClick={onBack} size={25} className={style.icon} />
            <AiOutlinePause
              onClick={onPause}
              size={25}
              className={style.icon}
            />
            <AiFillForward onClick={onNext} size={25} className={style.icon} />
          </div>
        </>
      )}
      {container.current !== false &&
        children.map((e, i) => (
          <div
            key={i}
            className={style.children}
            style={{
              position: "relative",
              right: width * index,
              height: height,
              minWidth: width,
              transition: "1s",
            }}
          >
            {e}
          </div>
        ))}
    </div>
  );
}
