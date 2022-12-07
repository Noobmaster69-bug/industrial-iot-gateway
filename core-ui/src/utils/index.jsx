import Axios from "axios";
import { toast } from "react-toastify";
export const axios = Axios.create({
  baseURL: process.env.REACT_APP_BASE_URL || "http://localhost:33333/api",
});
export function Toast(type) {
  if (type) {
    return (msg) => {
      toast[type](msg, {
        position: "bottom-center",
        autoClose: 2000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    };
  } else {
    return (msg) => {
      toast(msg, {
        position: "bottom-center",
        autoClose: 2000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    };
  }
}
export function errorToast(msg) {
  const toast = Toast("error");
  toast(msg);
}
export function successToast(msg) {
  const toast = Toast("success");
  toast(msg);
}
