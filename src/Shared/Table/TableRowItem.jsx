import React from "react";
import { Share, Edit, Delete, CheckVerify, CheckPlus } from "../Icons";
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
                    <div className="app_fallback">{item.name?.charAt(0)}</div>
                  )}
                  <p>{item[key].toString()}</p> <Share />
                </button>
              </td>
            );
          }
          return <td key={key}>{item[key]}</td>;
        })}
        <ActionTableButton>
          {enableStatus && (
            <button
              className={item.status ? "status" : "update_status"}
              onClick={() => onAction("status", item)}
            >
              {item.status ? <CheckVerify /> : <CheckPlus />}
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
