import { Outlet, Link, useLocation } from "react-router-dom";
import { Suspense, useState } from "react";
import style from "./index.module.scss";
import dino from "assets/logos/dino.png";
import router from "constants/router";
import clsx from "clsx";
import {
  AiOutlineMenu,
  AiOutlineLogout,
  AiOutlineSetting,
} from "react-icons/ai";
import { BiUserCircle } from "react-icons/bi";
import { FaUserCog } from "react-icons/fa";
import { useLogOut, useUser } from "hooks";
export default function SideBarLayout({ title }) {
  const location = useLocation();
  const currentPath = location.pathname;
  const [sideBar, setSiteBar] = useState(false);
  const [userMenu, setUserMenu] = useState(true);
  const { data: user } = useUser();
  const logout = useLogOut();
  return (
    <div className={style["outer-container"]}>
      <div className={style["top-bar"]}>
        <div
          className={style.imgContainer}
          style={{ width: "50px" }}
          onClick={() => {
            setSiteBar(!sideBar);
          }}
        >
          <AiOutlineMenu size={25} className={style.icon} />
        </div>
        <div className={style.imgContainer}>
          <img src={dino} alt="dino" />
        </div>
        <h2>{title}</h2>
        <span style={{ flex: "1 1", boxSizing: "border-box" }} />
        <div className={style["user-holder"]}>
          <BiUserCircle size={25} className={style.icon} />
          <div className={style["tool-tip"]}>
            <span
              onClick={() => {
                setUserMenu(!userMenu);
              }}
            >
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
                <span className={style["tool-tip-content"]}>
                  Account Setting
                </span>
              </div>
              <div>
                <span>
                  <FaUserCog className={style["tool-tip-icon"]} size={20} />
                </span>
                <span className={style["tool-tip-content"]}>
                  User Management
                </span>
              </div>
              <div
                onClick={() => {
                  logout.mutate();
                }}
              >
                <span>
                  <AiOutlineLogout
                    className={style["tool-tip-icon"]}
                    size={20}
                  />
                </span>
                <span className={style["tool-tip-content"]}>Logout</span>
              </div>
            </span>
          </div>
        </div>
      </div>
      <div className={style.container}>
        <div
          className={style.sideBar}
          style={{ left: sideBar ? "0" : "-270px" }}
        >
          <div className={style.LinksHolder}>
            {router
              .filter((route) => route.navBar !== false)
              .map((route, index) => (
                <Link
                  to={
                    route.path === currentPath.slice(0, route.path.length)
                      ? location.pathname
                      : route.path
                  }
                  className={clsx([
                    style.LinkHolder,
                    currentPath.slice(0, route.path.length) === route.path &&
                      style.LinkHolderActive,
                  ])}
                  key={index + "sidebar"}
                >
                  <div className={style.iconHolder}>{route.icon}</div>
                  <span>{route.label}</span>
                </Link>
              ))}
          </div>
        </div>
        <div
          className={style.outlet}
          onClick={() => {
            setSiteBar(false);
          }}
        >
          {sideBar && <div className={style.blur}></div>}
          <Suspense fallback={<h1>App is Loading</h1>}>
            <Outlet />
          </Suspense>
        </div>
      </div>
    </div>
  );
}
