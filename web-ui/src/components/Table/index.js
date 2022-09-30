import { useEffect, useState } from "react";
import { AiOutlineSearch, AiOutlinePlus, AiOutlineEdit } from "react-icons/ai";
import { BsTrash } from "react-icons/bs";
import style from "./index.module.scss";
import ReactTooltip from "react-tooltip";
/**
 * @typedef {Array.<{id: string, label: string, numberic: boolean, isSort: boolean, className: string}>} head
 */
/**
 * @typedef {Array.<{}>} data
 */

/**
 *
 * @param {{head: head, data: data, className: string, onSelect: function onSelect(data) {} }} props
 * @returns {import("react").ReactComponentElement}
 */
export default function Table(props) {
  const {
    head = [],
    data = [],
    className = "",
    checkbox,
    searchID,
    onAdd = () => {},
    onDeleteRow = () => {},
    onEditRow = () => {},
  } = props;
  const [rows, setRows] = useState(data);
  const [sortMethod, setSortMethod] = useState({ id: null, state: null });
  const [regex, setRegex] = useState();
  function onSelectAll(state) {
    const newRows = rows.map((row) => {
      return { ...row, ___isSelect: state };
    });
    setRows(newRows);
    const selectedRows = newRows.filter((row) => row.___isSelect === true);
    if (props.onSelect) {
      props.onSelect(selectedRows);
    }
  }
  function onSelect(index) {
    const newRows = rows.map((row, i) => {
      if (i !== index) {
        return row;
      } else {
        return { ...row, ___isSelect: !row.___isSelect };
      }
    });
    setRows(newRows);
    const selectedRows = newRows.filter((row) => row.___isSelect === true);
    if (props.onSelect) {
      props.onSelect(selectedRows);
    }
  }
  /**
   *
   * @param {head[0]} col
   */
  function onSort(col) {
    if (col.isSort || true) {
      if (sortMethod?.id !== col.id) {
        setSortMethod({ id: col.id, state: "down" });
      } else {
        setSortMethod({
          id: sortMethod.state === "up" ? null : col.id,
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
  function Sort() {
    if (sortMethod.state === "down") {
      if (head.find((e) => e.id === sortMethod.id).numberic) {
        return [...rows].sort((a, b) => {
          return a[sortMethod.id].key - b[sortMethod.id].key;
        });
      } else {
        return [...rows].sort((a, b) => {
          return (
            a[sortMethod.id].key.toLowerCase().charCodeAt() -
            b[sortMethod.id].key.toLowerCase().charCodeAt()
          );
        });
      }
    } else if (sortMethod.state === "up") {
      if (head.find((e) => e.id === sortMethod.id).numberic) {
        return [...rows].sort((b, a) => {
          return a[sortMethod.id].key - b[sortMethod.id].key;
        });
      } else {
        return [...rows].sort((b, a) => {
          return (
            a[sortMethod.id].key.toLowerCase().charCodeAt() -
            b[sortMethod.id].key.toLowerCase().charCodeAt()
          );
        });
      }
    } else {
      return rows;
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
    setRows(data);
  }, [data]);
  return (
    <div className={`${style.container} ${className}`}>
      <table className={style.table}>
        <thead className={style.header}>
          <tr>
            <td
              colSpan={head.length + (checkbox & 1)}
              className={style["search-cell"]}
            >
              <div className={style["search-bar"]}>
                <AiOutlineSearch />
                <input
                  className={style["search"]}
                  type="text"
                  onChange={(e) => {
                    onSearch(e);
                  }}
                  placeholder={`Type here to search by ${
                    head.find((e) => e.id === (searchID || head[0]?.id)).label
                  }`}
                />
              </div>
            </td>
            <td
              className={style["delete-cell"]}
              data-tip="Delete all devices"
              data-effect="solid"
              data-place="left"
              data-for="delete all"
            >
              <button className={style["delete-button"]}>
                <BsTrash size={25} />
              </button>
              <ReactTooltip id="delete all" />
            </td>
            <td
              className={style["add-cell"]}
              data-tip="Add device"
              data-effect="solid"
              data-place="bottom"
              data-for="add"
            >
              <button
                className={style["add-button"]}
                onClick={(e) => {
                  e.preventDefault();
                  onAdd();
                }}
                type="none"
              >
                <AiOutlinePlus size={25} />
                <ReactTooltip id="add" />
              </button>
            </td>
          </tr>
          <tr className={style.head}>
            {checkbox && (
              <td className={style.checkbox}>
                <input
                  type="checkbox"
                  onChange={(element) => {
                    onSelectAll(element.target.checked);
                  }}
                />
              </td>
            )}
            {head.map((e) => (
              <td key={"head" + e.id} onClick={() => onSort(e)}>
                {e.label}
              </td>
            ))}
            <td />
            <td />
          </tr>
        </thead>
        <tbody>
          {Sort()
            .filter((e) => {
              if ((searchID || head[0]?.id) && regex) {
                const searchKey = e[searchID || head[0]?.id].key;
                return regex.test(searchKey);
              } else {
                return true;
              }
            })
            .map((row, i) => {
              return (
                <tr key={i + "row"}>
                  {checkbox && (
                    <td className={style.checkbox}>
                      <input
                        type="checkbox"
                        checked={row.___isSelect || false}
                        onClick={() => {
                          onSelect(i);
                        }}
                        value={row.___isSelect}
                        onChange={() => {}}
                      />
                    </td>
                  )}
                  {[
                    ...head.map((headData) => {
                      return (
                        <td
                          key={headData.id + "cell"}
                          style={row[headData.id].style || {}}
                        >
                          {row[headData.id].value}
                        </td>
                      );
                    }),

                    <td
                      key={head.length + "cell"}
                      className={style["action-cell"]}
                      data-tip="Delete device"
                      data-effect="solid"
                      data-place="left"
                      data-for="delete"
                    >
                      <button
                        className={style["action-button"]}
                        onClick={(e) => {
                          e.preventDefault();
                          onDeleteRow(row);
                        }}
                      >
                        <BsTrash size={20} />
                      </button>
                      <ReactTooltip id="delete" />
                    </td>,
                    <td
                      key={head.length + 1 + "cell"}
                      className={style["action-cell"]}
                      data-tip="Edit device"
                      data-effect="solid"
                      data-place="left"
                      data-for="edit"
                    >
                      <button
                        className={style["action-button"]}
                        onClick={(e) => {
                          e.preventDefault();
                          onEditRow(row);
                        }}
                      >
                        <AiOutlineEdit size={20} />
                      </button>
                      <ReactTooltip id="edit" />
                    </td>,
                  ]}
                </tr>
              );
            })}
        </tbody>
      </table>
      <span style={{ flex: "1 1 0%" }}>{data.length === 0 && <Loading />}</span>
    </div>
  );
}
function Loading() {
  return <div></div>;
}
