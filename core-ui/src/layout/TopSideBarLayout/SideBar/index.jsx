import { routes } from "router";
import { Link, useLocation, useMatches } from "react-router-dom";
import clsx from "clsx";

import style from "./index.module.scss";
import dino from "assets/logos/dino.png";

export default function SideBar() {
  /**
   * @const categories, list of categories from routes
   */
  const categories = Array.from(
    routes.reduce((a, b) => {
      return a.add(b.loader().category || "Others");
    }, new Set())
  );
  /**
   * @const filteredRoutes, an object have keys are categories and
   * values are arrays of routes which belong to that its category
   */
  const filteredRoutes = categories.reduce((object, key) => {
    const value = routes.filter(
      (e) => (e.loader().category || "Others") === key
    );
    return { ...object, [key]: value };
  }, {});
  // eslint-disable-next-line no-unused-vars
  const [__, { data: layoutData }, ___] = useMatches();
  return (
    <div className={style["container"]}>
      <div style={{ display: "flex", height: "var(--top-bar-height)" }}>
        <div className={style["img-container"]}>
          <img src={dino} alt="dino" />
        </div>
      </div>
      <hr />
      <div className={style["link-holder"]}>
        {categories.map((category, index) => (
          <div key={"categories " + index} className={style["category-holder"]}>
            <div className={style["category-label"]}>{category}</div>
            <div>
              {filteredRoutes[category].map((route, index) => {
                const data = route.loader();
                const Icon = data.Icon;
                return (
                  <div
                    className={style["link-container"]}
                    key={index + "sidebar"}
                  >
                    <Link
                      to={route.path || ""}
                      className={clsx([
                        style.LinkHolder,
                        data.title === layoutData?.title &&
                          style.LinkHolderActive,
                      ])}
                    >
                      <div className={style.iconHolder}>
                        <Icon size={20} />
                      </div>
                      <span>{data.title}</span>
                    </Link>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
