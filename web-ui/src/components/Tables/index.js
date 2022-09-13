import style from "./index.module.scss";
import { DownArrow, UpArrow } from "./icon";
import { useEffect, useState } from "react";
import {
  AiOutlineArrowLeft,
  AiOutlineArrowRight,
  AiOutlineSearch,
} from "react-icons/ai";
/**
 *
 * @param {Object} param0
 * @param {import("react").ReactElement} param0.emptyBody
 * @param {String} param0.title
 * @param {Array} param0.head
 * @param {Array} param0.data
 * @returns
 */
export default function Table({
  emptyBody = (
    <div
      style={{
        height: "50px",
        width: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      Nothing here
    </div>
  ),
  title = "",
  head,
  data = [],
  classes,
  checkbox,
  select = [null, null],
  rowPerPage = 5,
  footer = [],
  searchID,
  selectToolBar = [],
  headToolBar = [],
}) {
  const [page, setPage] = useState(1);
  const [sortMethod, setSortMethod] = useState({ id: null, state: null });
  const [changedData, setData] = useState([]);
  // eslint-disable-next-line no-unused-vars
  const [selected, setSelected] = select;
  const [regex, setRegex] = useState();
  function ClassDestruction(classes, name) {
    if (classes) {
      if (classes[name]) {
        if (classes[name].default) {
          return `${style[name]} ${classes[name].name}`;
        } else {
          return `${classes[name].name}`;
        }
      } else {
        return `${style[name]}`;
      }
    } else {
      return `${style[name]}`;
    }
  }
  function onSort(id, isSort) {
    if (isSort) {
      if (sortMethod?.id !== id) {
        setSortMethod({ id: id, state: "down" });
      } else {
        setSortMethod({
          id: sortMethod.state === "up" ? null : id,
          state:
            sortMethod.state === null
              ? "down"
              : sortMethod.state === "down"
              ? "up"
              : null,
        });
      }
    }
  }
  function onCheckHead(e) {
    let temp = changedData.map((el) => {
      el.checked = e.target.checked;
      return { ...el };
    });
    setData(temp);
    let temp1 = temp
      .filter((e) => e.checked)
      .map((e) => {
        return { ...e };
      });
    setSelected(temp1);
  }
  function onSelect(e, row) {
    let temp = changedData.map((e) => {
      return { ...e };
    });
    temp[temp.findIndex((e) => e.index === row.index)].checked =
      e.target.checked;
    setData(temp);
    let temp1 = temp
      .filter((e) => e.checked)
      .map((e) => {
        return { ...e };
      });
    setSelected(temp1);
  }
  function Sort(data, method, head) {
    let temp = [...data];
    if (temp) {
      if (method.state === "down") {
        if (head.find((e) => e.id === method.id).numberic) {
          return temp.sort((a, b) => {
            return a[method.id].key - b[method.id].key;
          });
        } else {
          return temp.sort((a, b) => {
            return (
              a[method.id].key.toLowerCase().charCodeAt() -
              b[method.id].key.toLowerCase().charCodeAt()
            );
          });
        }
      } else if (method.state === "up") {
        if (head.find((e) => e.id === method.id).numberic) {
          return temp.sort((b, a) => {
            return a[method.id].key - b[method.id].key;
          });
        } else {
          return temp.sort((b, a) => {
            return (
              a[method.id].key.toLowerCase().charCodeAt() -
              b[method.id].key.toLowerCase().charCodeAt()
            );
          });
        }
      } else {
        return temp;
      }
    } else {
      return temp;
    }
  }
  function onSearch(element) {
    if (element.target.value === "") {
      setRegex(null);
    } else {
      setRegex(new RegExp(`(${element.target.value})`));
    }
  }
  useEffect(() => {
    if (data.length) {
      setData(
        data.map((e, index) => {
          let a = { ...e };

          if (selected) {
            a.index = index;
            a.checked =
              selected[selected.findIndex((e) => e.index === index)]
                ?.checked === undefined
                ? false
                : selected[selected.findIndex((e) => e.index === index)]
                    ?.checked;
          }
          return a;
        })
      );
    }
  }, [data, selected]);
  return (
    <>
      <table className={ClassDestruction(classes, "container")}>
        <thead>
          {(selected.length || 0) === 0 ? (
            <tr style={{ height: "50px" }}>
              <td
                colSpan={head.length + (checkbox & 1) - headToolBar.length}
                className={style["toolbox-head"]}
              >
                <div
                  style={{
                    display: "flex",
                    userSelect: "none",
                    width: "100%",
                    paddingLeft: "10px",
                  }}
                >
                  <div className={style["title"]}>{title}</div>
                  <div className={style["search-bar"]}>
                    <AiOutlineSearch />
                    <input
                      className={style["search"]}
                      type="text"
                      onChange={(e) => {
                        onSearch(e);
                      }}
                    />
                  </div>
                </div>
              </td>
              {headToolBar.map((e, i) => (
                <td colSpan={1} key={1}>
                  {e}
                </td>
              ))}
            </tr>
          ) : (
            <tr style={{ height: "50px" }}>
              <td colSpan={head.length + (checkbox & 1) - selectToolBar.length}>
                <div className={style["select-counter"]}>
                  <div
                    style={{
                      paddingRight: "10px",
                      paddingLeft: "10px",
                    }}
                  >
                    {"Selected " +
                      selected?.length +
                      " item" +
                      (selected?.length > 1 ? "s" : "")}
                  </div>
                </div>
              </td>
              {(selected?.length || 0) !== 0 &&
                selectToolBar.map((e, i) => (
                  <td colSpan={1} key={i}>
                    {e}
                  </td>
                ))}
            </tr>
          )}
        </thead>
        <tbody className={ClassDestruction(classes, "body")}>
          <tr
            className={
              ClassDestruction(classes, "head") +
              (head.classes ? " " + head.classes : "")
            }
          >
            {checkbox && (
              <td className={style.checkbox}>
                <input type="checkbox" onClick={(e) => onCheckHead(e)} />
              </td>
            )}
            {head.map(({ isSort = true, ...e }) => (
              <td onClick={() => onSort(e.id, isSort)} key={e.id}>
                {e.label}
                <span
                  style={{ visibility: e.id === sortMethod.id ? "" : "hidden" }}
                >
                  {sortMethod.state !== "down" ? UpArrow : DownArrow}
                </span>
              </td>
            ))}
          </tr>
          {data.length === 0 ? (
            <tr>
              <td colSpan={head.length + 1}>{emptyBody}</td>
            </tr>
          ) : (
            Sort(changedData, sortMethod, head)
              .filter(
                (e, index) =>
                  Math.abs(
                    index - (2 * rowPerPage * page - rowPerPage - 1) / 2
                  ) <
                  rowPerPage / 2
              )
              .filter((e, index) => {
                if (searchID && regex) {
                  const searchKey = e[searchID].key;
                  return regex.test(searchKey);
                } else {
                  return true;
                }
              })
              .map(({ onDoubleClick = () => {}, ...row }, id) => (
                <tr
                  className={
                    ClassDestruction(classes, "row") +
                    (row.classes ? " " + row.classes : "") +
                    (row.checked
                      ? " " + ClassDestruction(classes, "row-selected")
                      : "")
                  }
                  onClick={(e) => {
                    if (row.onClick) {
                      row.onClick(e, row);
                    } else {
                    }
                  }}
                  key={row.id + "" + id}
                  onDoubleClick={(e) => {
                    if (row.onDoubleClick) {
                      row.onDoubleClick(e, row);
                    } else {
                    }
                  }}
                >
                  {checkbox && (
                    <td className={style.checkbox}>
                      <input
                        type="checkbox"
                        checked={row.checked}
                        onClick={(e) => onSelect(e, row)}
                        onChange={() => {}}
                      />
                    </td>
                  )}
                  {head.map((e) => (
                    <td
                      key={row.id + e.id + "" + id}
                      colSpan={row[e.id].colSpan || 1}
                    >
                      {row[e.id].value}
                    </td>
                  ))}
                </tr>
              ))
          )}
        </tbody>
        <tfoot>
          {footer.map((e, i) => (
            <tr key={i}>e</tr>
          ))}
        </tfoot>
      </table>
      <span
        style={{
          flex: "1 1 0%",
          boxSizing: "border-box",
        }}
      ></span>
      <div className={ClassDestruction(classes, "toolBox")}>
        <div className={style.pageSelect}>
          <div>Page: </div>
          <select
            onChange={(e) => setPage(parseInt(e.target.value))}
            name="page"
            value={page}
          >
            {[...Array(Math.ceil(data.length / rowPerPage))].map(
              (element, index) => (
                <option key={index + "option"} value={index + 1}>
                  {index + 1}
                </option>
              )
            )}
          </select>
        </div>
        <div className={style.pageNum}>
          of {Math.ceil(data.length / rowPerPage)}
        </div>
        <div className={style.iconHolder}>
          <AiOutlineArrowLeft
            size={20}
            onClick={() => {
              if (page <= Math.ceil(data.length / rowPerPage) && page > 1) {
                setPage((page) => page - 1);
              }
            }}
          />
          <AiOutlineArrowRight
            size={20}
            onClick={() => {
              if (page < Math.ceil(data.length / rowPerPage) && page >= 1) {
                setPage((page) => page + 1);
              }
            }}
          />
        </div>
      </div>
    </>
  );
}
