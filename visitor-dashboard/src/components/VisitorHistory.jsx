// src/components/VisitorHistory.jsx
import React, { useEffect, useMemo, useRef, useState } from "react";

const getInitials = (name = "") =>
  name.split(" ").filter(Boolean).map((w) => w[0]).join("").toUpperCase();

const Avatar = ({ visitor }) => {
  const [imgError, setImgError] = useState(false);
  if (imgError || !visitor?.avatar) {
    return <div className="visitor-avatar-fallback">{getInitials(visitor?.name)}</div>;
  }
  return (
    <img
      src={visitor.avatar}
      alt={visitor.name}
      className="visitor-avatar"
      onError={() => setImgError(true)}
      loading="lazy"
      width={40}
      height={40}
    />
  );
};

/* Compact row menu */
function RowMenu({ placement = "left", onEdit, onDelete, onView, onClose }) {
  const ref = useRef(null);

  useEffect(() => {
    function onKey(e) { if (e.key === "Escape") onClose?.(); }
    function onClick(e) { if (ref.current && !ref.current.contains(e.target)) onClose?.(); }
    document.addEventListener("keydown", onKey);
    document.addEventListener("mousedown", onClick);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("mousedown", onClick);
    };
  }, [onClose]);

  const base =
    "row-menu-panel absolute z-30 rounded-md border border-gray-200 bg-white shadow-lg";
  const sizing = "w-[150px] max-w-[160px]"; /* keep it tight */
  const list = "py-1"; /* compact vertical padding */

  // Left of trigger, vertically centered
  const pos =
    placement === "left"
      ? "right-full mr-2 top-1/2 -translate-y-1/2"
      : "right-0 top-1/2 -translate-y-1/2";

  const item =
    "w-full text-left px-3 py-1.5 text-sm text-gray-700 hover:bg-gray-50 leading-5";

  return (
    <div ref={ref} className={`${base} ${sizing} ${pos}`} role="menu" aria-label="Row actions">
      <div className={list}>
        <button className={item} onClick={onView}>View</button>
        <button className={item} onClick={onEdit}>Edit</button>
        <button className={`${item} text-red-600`} onClick={onDelete}>Delete</button>
      </div>
    </div>
  );
}


/**
 * Props:
 * - title, visitors, onSearch, showAddButton, onAdd, addButtonText
 * - columns: [{ key, header, render?, className?, thClassName?, width? }]
 * - showRowMenu: boolean
 * - onRowAction: (action, row) => void
 */
export default function VisitorHistory({
  title = "Recent Visitor History",
  visitors = [],
  onSearch,
  showAddButton = false,
  onAdd,
  addButtonText = "Add New",
  columns,
  showRowMenu = false,
  onRowAction,
}) {
  const defaultColumns = useMemo(
    () => [
      {
        key: "visitor",
        header: "Visitor",
        render: (row) => (
          <div className="visitor-cell">
            <Avatar visitor={row} />
            <div className="visitor-info">
              <div className="visitor-name">{row.name}</div>
              <div className="visitor-email">{row.email}</div>
            </div>
          </div>
        ),
      },
      {
        key: "visiting",
        header: "Visiting",
        render: (row) => (
          <div className="visiting-cell">
            <div className="visiting-name">{row.visiting}</div>
            <div className="visiting-role">{row.visitingrole}</div>
          </div>
        ),
      },
      {
        key: "purpose",
        header: "Purpose",
        render: (row) => (
          <span className={`purpose-badge ${row.purposecolor}`}>{row.purpose}</span>
        ),
      },
      {
        key: "checkin",
        header: "Check In",
        render: (row) => <div className="time-cell">{row.checkin}</div>,
      },
      {
        key: "checkout",
        header: "Check Out",
        render: (row) => <div className="time-cell">{row.checkout}</div>,
      },
    ],
    []
  );

  const cols = columns && columns.length ? columns : defaultColumns;

  const [openMenuRowId, setOpenMenuRowId] = useState(null);

  const toggleRowMenu = (rowId) => {
    setOpenMenuRowId((prev) => (prev === rowId ? null : rowId));
  };

  return (
    <main className="main-content">
      <div className="visitor-history-section">
        <div className="section-header" style={{ gap: 12, alignItems: "center" }}>
          <h2 className="section-title">{title}</h2>

          <div className="search-container" style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <div className="search-input-wrapper">
              <svg className="search-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="11" cy="11" r="8" />
                <path d="m21 21-4.35-4.35" />
              </svg>
              <input
                type="text"
                className="search-input"
                placeholder="Search Visitors..."
                onChange={(e) => onSearch?.(e.target.value)}
                aria-label="Filter visitors"
              />
            </div>

            {showAddButton && (
              <button type="button" onClick={onAdd} className="mv-add-btn" style={{ height: 40 }}>
                <span className="mv-add-icon" style={{ display: "inline-flex", marginRight: 6 }}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                    <path d="M12 5v14M5 12h14" stroke="#fff" strokeWidth="2" strokeLinecap="round" />
                  </svg>
                </span>
                {addButtonText}
              </button>
            )}
          </div>
        </div>

        <div className="table-container">
          <table className="visitors-table">
            <thead>
              <tr>
                {cols.map((c) => (
                  <th key={c.key} className={c.thClassName} style={{ width: c.width }}>
                    {c.header}
                  </th>
                ))}
                {showRowMenu && <th style={{ width: 48 }}></th>}
              </tr>
            </thead>

            <tbody>
              {visitors.length > 0 ? (
                visitors.map((row) => (
                  <tr key={row.id}>
                    {cols.map((c) => (
                      <td key={c.key} className={c.className}>
                        {c.render ? c.render(row) : row[c.key]}
                      </td>
                    ))}

                    {showRowMenu && (
  <td className="relative">
    <button
      aria-label="Row actions"
      className="inline-flex items-center justify-center w-8 h-8 rounded-md hover:bg-gray-100"
      onClick={() => toggleRowMenu(row.id)}
    >
      {/* vertical three dots icon */}
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
        <circle cx="12" cy="5" r="2" fill="#6b7280" />
        <circle cx="12" cy="12" r="2" fill="#6b7280" />
        <circle cx="12" cy="19" r="2" fill="#6b7280" />
      </svg>
    </button>

    {openMenuRowId === row.id && (
      <RowMenu
        placement="left"
        onView={() => { onRowAction?.("view", row); setOpenMenuRowId(null); }}
        onEdit={() => { onRowAction?.("edit", row); setOpenMenuRowId(null); }}
        onDelete={() => { onRowAction?.("delete", row); setOpenMenuRowId(null); }}
        onClose={() => setOpenMenuRowId(null)}
      />
    )}
  </td>
)}

                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan={(cols?.length || 0) + (showRowMenu ? 1 : 0)}
                    style={{ textAlign: "center", padding: "2rem", color: "#6B7280" }}
                  >
                    No visitors found matching your search.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </main>
  );
}
