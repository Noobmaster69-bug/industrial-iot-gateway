import { Outlet, Link, useLocation } from "react-router-dom";
import { Suspense, useState } from "react";
import style from "./index.module.scss";

import { useLogOut, useUser } from "apis";
import { routes } from "router";
import SideBar from "./SideBar";
import TopBar from "./TopBar";

export default function SideBarLayout({
  title,
  Icon = () => <div />,
  label,
  type,
}) {
  const [sideBar, setSiteBar] = useState(false);
  const [userMenu, setUserMenu] = useState(false);

  return (
    <div
      className={style["outer-container"]}
      onClick={() => {
        if (userMenu) {
          setUserMenu(false);
        }
      }}
    >
      <div
        className={style.sideBar}
        style={{ left: sideBar ? "0" : "calc(0px - var(--side-bar-width))" }}
      >
        <SideBar />
      </div>
      <div className={style.container}>
        <header className={style["top-bar"]}>
          <TopBar
            sideBar={sideBar}
            setSiteBar={setSiteBar}
            title={title}
            userMenu={userMenu}
            setUserMenu={setUserMenu}
            Icon={Icon}
          />
        </header>
        <main
          className={style.outlet}
          onClick={() => {
            setSiteBar(false);
          }}
        >
          {sideBar && <div className={style.blur}></div>}
          <Suspense fallback={<div />}>
            <Outlet />
          </Suspense>
        </main>
      </div>
    </div>
  );
}
