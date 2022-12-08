import { useEffect, useState } from "react";
import { AiOutlineSearch, AiOutlinePlus, AiOutlineEdit } from "react-icons/ai";
import { BsTrash } from "react-icons/bs";
import style from "./index.module.scss";
import ReactTooltip from "react-tooltip";
import clsx from "clsx";
import { DownArrow, UpArrow } from "./icon";

import { useMemo } from "react";
import { useCallback } from "react";

function Loading() {
  return <div className={style["empty-table"]}>no rows</div>;
}

export default function Table({
  head = [],
  data = [],
  className = "",
  checkbox,
  searchID,
  onAdd = () => {},
  onDeleteRow = () => {},
  onEditRow = () => {},
  addBox = true,
  removeBox = true,
  editBox = true,
  onSort = () => {},
}) {
  const [rows, setRows] = useState(data);
  const [sortMethod, setSortMethod] = useState({ id: null, state: null });
  const [regex, setRegex] = useState();
  function onSelectAll(state) {
    const newRows = rows.map((row) => {
      return { ...row, ___isSelect: state };
    });
    setRows(newRows);
    const selectedRows = newRows.filter((row) => row.___isSelect === true);
    if (onSelect) {
      onSelect(selectedRows);
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
    if (onSelect) {
      onSelect(selectedRows);
    }
  }
  /**
   *
   * @param {head[0]} col
   */
  function _onSort(col) {
    let result = sortMethod;
    if (col.sortable === undefined || col.sortable) {
      if (sortMethod?.id !== col.id) {
        result = { id: col.id, state: "down" };
      } else {
        result = {
          id: sortMethod.state === "up" ? null : col.id,
          state:
            sortMethod.state === null
              ? "down"
              : sortMethod.state === "down"
              ? "up"
              : null,
        };
      }
      setSortMethod(result);
      onSort(result);
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
              colSpan={
                head.length +
                (checkbox & 1) +
                ((editBox || removeBox) && (!removeBox || !addBox) && 1)
              }
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
              data-tip="Delete all"
              data-effect="solid"
              data-place="left"
              data-for="delete all"
              style={{
                display:
                  ((removeBox || editBox) &&
                    (!editBox || !addBox || removeBox)) ||
                  "none",
              }}
            >
              <button className={style["delete-button"]}>
                <BsTrash size={25} />
                <ReactTooltip id="delete all" />
              </button>
            </td>
            <td
              className={style["add-cell"]}
              data-tip="Add New Item"
              data-effect="solid"
              data-place="bottom"
              data-for="add"
              style={{
                display: addBox || "none",
              }}
            >
              <button
                className={clsx(
                  style["add-button"],
                  addBox || style["add-button-inactive"]
                )}
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
            {head.map((e, id) => (
              <td
                key={"head" + e.id}
                onClick={() => _onSort(e)}
                colSpan={
                  1 +
                  (id === head.length - 1 &&
                    (!editBox || !removeBox) &&
                    (editBox || removeBox || addBox) &&
                    1)
                }
              >
                {e.label}
                <span
                  style={{ visibility: e.id === sortMethod.id ? "" : "hidden" }}
                >
                  {sortMethod.state !== "down" ? UpArrow : DownArrow}
                </span>
              </td>
            ))}
            <td
              style={{
                display:
                  ((editBox || removeBox) &&
                    (editBox || !addBox) &&
                    (!editBox || removeBox)) ||
                  "none",
              }}
            />
            <td
              style={{
                display:
                  ((editBox || addBox) && (editBox || removeBox)) || "none",
              }}
            />
          </tr>
        </thead>
        <tbody>
          {rows
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
                    ...head.map((headData, id) => {
                      return (
                        <td
                          key={headData.id + "cell"}
                          style={row[headData.id]?.style || {}}
                          colSpan={
                            1 +
                            (id === head.length - 1 &&
                              (!editBox || !removeBox) &&
                              (editBox || removeBox || addBox) &&
                              1)
                          }
                        >
                          {row[headData.id]?.value || "_"}
                        </td>
                      );
                    }),

                    <td
                      key={head.length + "cell"}
                      className={clsx(
                        style["action-cell"],
                        removeBox || style["action-cell-hidden"]
                      )}
                      data-tip="Delete"
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
                        <ReactTooltip id="delete" />
                      </button>
                    </td>,
                    <td
                      key={head.length + 1 + "cell"}
                      className={clsx(
                        style["action-cell"],
                        editBox || style["action-cell-hidden"]
                      )}
                      data-tip="Edit"
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
                        <ReactTooltip id="edit" />
                      </button>
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

export function SortTable({
  head = [],
  data = [],
  className = "",
  checkbox,
  searchID,
  onAdd = () => {},
  onDeleteRow = () => {},
  onEditRow = () => {},
  addBox = true,
  removeBox = true,
  editBox = true,
}) {
  const [sortMethod, setSortMethod] = useState({ id: null, state: null });
  const sort = useCallback(
    (rows) => {
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
    },
    [head, sortMethod.id, sortMethod.state]
  );
  const rows = useMemo(() => sort(data), [sort, data]);
  return (
    <Table
      head={head}
      data={rows}
      className={className}
      checkbox={checkbox}
      searchID={searchID}
      onAdd={onAdd}
      onEditRow={onEditRow}
      onDeleteRow={onDeleteRow}
      addBox={addBox}
      removeBox={removeBox}
      editBox={editBox}
      onSort={(_sortMethod) => {
        setSortMethod(_sortMethod);
      }}
    />
  );
}
