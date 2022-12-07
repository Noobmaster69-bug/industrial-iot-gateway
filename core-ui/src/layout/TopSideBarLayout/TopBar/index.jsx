import style from "./index.module.scss";
import clsx from "clsx";
import {
  AiOutlineMenu,
  AiOutlineLogout,
  AiOutlineSetting,
} from "react-icons/ai";
import { BiUserCircle } from "react-icons/bi";
import { FaUserCog } from "react-icons/fa";
import { useLogout, useGetAuth } from "apis";
import { useMatches } from "react-router-dom";
export default function TopBar({ sideBar, setSiteBar, userMenu, setUserMenu }) {
  const { data: user } = useGetAuth();
  const matches = useMatches();
  const {
    data: { title, Icon },
  } = matches[1];
  const logout = useLogout();
  return (
    <>
      <div
        className={style.imgContainer}
        style={{ width: "50px" }}
        onClick={() => {
          setSiteBar(!sideBar);
        }}
      >
        <AiOutlineMenu size={25} className={style.icon} />
      </div>
      <div className={style.title}>
        <Icon size={40} />
        <h1 style={{ paddingLeft: "8px" }}>{title}</h1>
      </div>
      <span style={{ flex: "1 1", boxSizing: "border-box" }} />
      <div
        className={style["user-holder"]}
        onClick={() => {
          setUserMenu(!userMenu);
        }}
      >
        <BiUserCircle size={25} className={style.icon} />
        <div className={style["tool-tip"]}>
          <span>
            <span className={style["tool-tip-label"]}>{user?.username}</span>
          </span>
          <span
            className={clsx(
              style["tool-tip-text"],
              userMenu && style["tool-tip-text-active"]
            )}
          >
            <div>
              <span>
                <AiOutlineSetting
                  className={style["tool-tip-icon"]}
                  size={20}
                />
              </span>
              <span className={style["tool-tip-content"]}>Account Setting</span>
            </div>
            <div>
              <span>
                <FaUserCog className={style["tool-tip-icon"]} size={20} />
              </span>
              <span className={style["tool-tip-content"]}>User Management</span>
            </div>
            <div
              onClick={() => {
                logout.mutate();
              }}
            >
              <span>
                <AiOutlineLogout className={style["tool-tip-icon"]} size={20} />
              </span>
              <span className={style["tool-tip-content"]}>Logout</span>
            </div>
          </span>
        </div>
      </div>
    </>
  );
}
