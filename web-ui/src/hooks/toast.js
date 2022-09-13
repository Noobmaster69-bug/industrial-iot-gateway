import { toast } from "react-toastify";
export default function Toast(type) {
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
