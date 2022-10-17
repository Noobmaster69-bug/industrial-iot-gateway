//utils
import clsx from "clsx";

//components
import { BsArrowLeft } from "react-icons/bs";

//hooks
import { useNavigate } from "react-router-dom";
import BasicDetails from "./BasicDetails";

//types
import style from "./index.module.scss";

export default function EditDevice() {
  const navigate = useNavigate();
  return (
    <div className={style.container}>
      <div className={style.header}>
        <div
          className={style["back"]}
          onClick={() => {
            navigate(-1);
          }}
        >
          <BsArrowLeft size={24} />
        </div>
        <h2>Edit Device</h2>
        <span style={{ flex: "1 1" }} />
        <input
          type="submit"
          value="Create"
          className={clsx(["button", "confirm"])}
        />
      </div>
      <div className={style.body}>
        <form>
          <BasicDetails />
        </form>
      </div>
    </div>
  );
}
