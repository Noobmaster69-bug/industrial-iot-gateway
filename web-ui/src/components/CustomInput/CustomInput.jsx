import style from "./index.module.scss";
import clsx from "clsx";
import { useState } from "react";
import { useEffect } from "react";
export function Input({
  active = false,
  error = false,
  placeholder = "",
  type = "text",
  name = "",
  autoComplete = "",
  required = true,
  onFocus = () => {},
  onBlur = () => {},
  onChange = () => {},
  data: dataInput = "",
  ...otherProps
}) {
  const [data, setData] = useState(dataInput);
  const [isActive, setIsActive] = useState(active);
  const [isError, setIsError] = useState(error);
  // sync state with props
  useEffect(() => {
    setIsActive(active);
  }, [active]);
  useEffect(() => {
    setIsError(error);
  }, [error]);
  useEffect(() => {
    setData(dataInput);
  }, [dataInput]);
  return (
    <div
      className={clsx([
        style["form-input"],
        isActive && style["form-input-active"],
        isError && style["form-input-error"],
      ])}
    >
      <input
        data={data}
        placeholder={placeholder}
        type={type}
        name={name}
        autoComplete={autoComplete}
        required={required}
        onFocus={(e) => {
          setIsActive(true);
          onFocus(e);
        }}
        onBlur={(e) => {
          setIsActive(false);
          onBlur(e);
        }}
        onChange={(e) => {
          setData(() => e.target.value);
          onChange(e.target.value);
        }}
        {...otherProps}
      />
    </div>
  );
}
