import React from "react";
import { Share, Edit, Delete, CrossTick, Circle } from "../Icons";
import { ActionTableButton } from "./style";

const TableRowItem = React.memo(
  ({
    item,
    headers,
    viewBtn,
    enableStatus,
    selected,
    onToggleRow,
    onAction,
  }) => {
    return (
      <tr key={item.id}>
        <td>
          <input
            type="checkbox"
            checked={selected}
            onChange={() => onToggleRow(item.id)}
          />
        </td>

        {headers.map((key) => {
          if (key === "status") {
            return (
              <td key={key}>
                <span
                  className={
                    item[key] ? "app_status_actv" : "app_status_inactv"
                  }
                >
                  {item[key] ? "Active" : "In-active"}
                </span>
              </td>
            );
          }

          if (key === viewBtn) {
            return (
              <td key={key}>
                <button
                  className="app_share"
                  onClick={() => onAction("view", item)}
                >
                  {item.image ? (
                    <img
                      src={item.image}
                      alt={item.name}
                      style={{
                        width: "32px",
                        height: "32px",
                        borderRadius: "50%",
                        objectFit: "cover",
                      }}
                    />
                  ) : (
                    <span
                      style={{
                        width: "32px",
                        height: "32px",
                        borderRadius: "50%",
                        display: "inline-flex",
                        alignItems: "center",
                        justifyContent: "center",
                        backgroundColor: "#007bff",
                        color: "#fff",
                        fontWeight: "bold",
                        textTransform: "uppercase",
                      }}
                    >
                      {item.name?.charAt(0) || "?"}
                    </span>
                  )}
                  {item[key].toString()} <Share />
                </button>
              </td>
            );
          }

          return <td key={key}>{item[key]}</td>;
        })}

        <ActionTableButton>
          {enableStatus && (
            <button className="status" onClick={() => onAction("status", item)}>
              {item.status ? <CrossTick /> : <Circle />}
            </button>
          )}
          <button className="edit" onClick={() => onAction("edit", item)}>
            <Edit />
          </button>
          <button className="delete" onClick={() => onAction("delete", item)}>
            <Delete />
          </button>
        </ActionTableButton>
      </tr>
    );
  }
);

export default TableRowItem;
