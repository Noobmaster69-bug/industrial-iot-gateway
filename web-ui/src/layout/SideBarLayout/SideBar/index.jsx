import style from "./index.module.scss";
import { routes } from "router";
import dino from "assets/logos/dino.png";
import { Link, useLocation } from "react-router-dom";
import clsx from "clsx";
export default function SideBar() {
  const location = useLocation();
  const currentPath = location.pathname;
  const router = routes.map(({ loader = () => ({}), path }) => ({
    ...loader(),
    path,
  }));
  const pageTypes = Array.from(
    router
      .filter((route) => route.layout === "sidebar")
      .reduce((pre, curr) => {
        pre.add(curr.type || "other");
        return pre;
      }, new Set())
  );
  return (
    <div className={style["container"]}>
      <div style={{ display: "flex", height: "var(--top-bar-height)" }}>
        <div className={style.imgContainer}>
          <img src={dino} alt="dino" />
        </div>
      </div>
      <hr />
      <div className={style.LinksHolder}>
        {pageTypes.map((type, index) => (
          <div className={style["type-holder"]} key={index + "type"}>
            <div className={style["type-label"]}>{type}</div>
            <div>
              {router
                .filter((route) => (route.type || "other") === type)
                .map(({ path, label, Icon }, index) => (
                  <div
                    className={style["link-container"]}
                    key={index + "sidebar"}
                  >
                    <Link
                      to={
                        "/" + path === currentPath.slice(0, path.length)
                          ? location.pathname
                          : path
                      }
                      className={clsx([
                        style.LinkHolder,
                        currentPath.slice(0, path.length) === path &&
                          style.LinkHolderActive,
                      ])}
                    >
                      <div className={style.iconHolder}>
                        <Icon size={20} />
                      </div>
                      <span>{label}</span>
                    </Link>
                  </div>
                ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
