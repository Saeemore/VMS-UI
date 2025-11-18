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
function RowMenu({ placement = "right", onEdit, onDelete, onView, onClose }) {
  const ref = useRef(null);

  useEffect(() => {
    const onKey = (e) => { if (e.key === "Escape") onClose?.(); };
    const onClick = (e) => { if (ref.current && !ref.current.contains(e.target)) onClose?.(); };
    document.addEventListener("keydown", onKey);
    document.addEventListener("mousedown", onClick);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("mousedown", onClick);
    };
  }, [onClose]);

  const pos =
    placement === "left"
      ? "right-full mr-0 top-1/2 -translate-y-1/2"
      : "left-auto right-0 top-1/2 -translate-y-1/2";

  return (
    <div ref={ref} id="row-menu" role="menu" aria-label="Row actions" className={`row-menu-panel absolute ${pos}`}>
      <div className="row-menu-list">
        <button className="row-menu-item" role="menuitem" onClick={onView}>Schedule a New Visit</button>
        <button className="row-menu-item" role="menuitem" onClick={onEdit}>Reschedule Visit</button>
      </div>
    </div>
  );
}

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
  onVisitorClick,
}) {

  // ----------------------------
  // 🔥 NEW: Sorting State
  // ----------------------------
  const [sortConfig, setSortConfig] = useState({ key: null, direction: null });

  const handleSort = (key) => {
    setSortConfig((prev) => {
      if (prev.key === key && prev.direction === "asc") {
        return { key, direction: "desc" };
      } else if (prev.key === key && prev.direction === "desc") {
        return { key: null, direction: null }; // remove sort
      }
      return { key, direction: "asc" };
    });
  };

  // ----------------------------
  // 🔥 NEW: Pagination State
  // ----------------------------
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  // ----------------------------
  // 🔥 NEW: Apply Sorting
  // ----------------------------
  const sortedVisitors = useMemo(() => {
    let sortable = [...visitors];

    if (sortConfig.key) {
      sortable.sort((a, b) => {
        const A = a[sortConfig.key]?.toString().toLowerCase() || "";
        const B = b[sortConfig.key]?.toString().toLowerCase() || "";

        if (A < B) return sortConfig.direction === "asc" ? -1 : 1;
        if (A > B) return sortConfig.direction === "asc" ? 1 : -1;
        return 0;
      });
    }
    return sortable;
  }, [visitors, sortConfig]);

  // ----------------------------
  // 🔥 NEW: Pagination Logic
  // ----------------------------
  const totalPages = Math.ceil(sortedVisitors.length / rowsPerPage);
  const paginatedVisitors = sortedVisitors.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  );

  const defaultColumns = useMemo(
    () => [
      {
        key: "name",
        header: "Visitor",
        render: (row) => (
          <div className="visitor-cell">
            <Avatar visitor={row} />
            <div className="visitor-info">
              <button
                type="button"
                className="visitor-name"
                style={{ all: "unset", cursor: "pointer" }}
                onClick={(e) => {
                  e.stopPropagation();
                  onVisitorClick?.(row, e.currentTarget);
                }}
              >
                {row.name}
              </button>
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
      { key: "checkin", header: "Check In" },
      { key: "checkout", header: "Check Out" },
    ],
    [onVisitorClick]
  );

  const cols = columns?.length ? columns : defaultColumns;

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
              <svg
            className="vd-search-icon"
            width="22"
            height="22"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            aria-hidden="true"
          >
            <circle cx="11" cy="11" r="8" />
            <path d="m21 21-4.35-4.35" />
          </svg>
              <input
                type="text"
                className="search-input"
                placeholder="Search Visitors..."
                onChange={(e) => onSearch?.(e.target.value)}
              />
            </div>

            {showAddButton && (
              <button type="button" onClick={onAdd} className="mv-add-btn" style={{ height: 40 }}>
                <span className="mv-add-icon" style={{ marginRight: 6 }}>
                  <svg width="16" height="16" viewBox="0 0 24 24">
                    <path d="M12 5v14M5 12h14" stroke="#fff" strokeWidth="2" />
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
                  <th
                    key={c.key}
                    className={c.thClassName}
                    style={{ cursor: "pointer" }}
                    onClick={() => handleSort(c.key)}
                  >
                    {c.header}
                    {sortConfig.key === c.key &&
                      (sortConfig.direction === "asc" ? " ↑" :
                       sortConfig.direction === "desc" ? " ↓" : "")}
                  </th>
                ))}
                {showRowMenu && <th></th>}
              </tr>
            </thead>

            <tbody>
              {paginatedVisitors.length > 0 ? (
                paginatedVisitors.map((row, index) => (
                  <tr key={row.id || index}>
                    {cols.map((c) => (
                      <td key={c.key} className={c.className}>
                        {c.render ? c.render(row, index) : row[c.key]}
                      </td>
                    ))}

                    {showRowMenu && (
                      <td className="td-actions relative">
                        <button
                          className="menu-trigger inline-flex items-center justify-center w-8 h-8 rounded-md hover:bg-gray-100"
                          onClick={() => toggleRowMenu(row.id)}
                        >
                          <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                            <circle cx="12" cy="5" r="2" />
                            <circle cx="12" cy="12" r="2" />
                            <circle cx="12" cy="19" r="2" />
                          </svg>
                        </button>

                        {openMenuRowId === row.id && (
                          <RowMenu
                            placement="left"
                            onView={() => { onRowAction?.("view", row); setOpenMenuRowId(null); }}
                            onEdit={() => { onRowAction?.("edit", row); setOpenMenuRowId(null); }}
                            onClose={() => setOpenMenuRowId(null)}
                          />
                        )}
                      </td>
                    )}
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={cols.length + 1} style={{ textAlign: "center", padding: "2rem" }}>
                    No visitors found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* ---------------------------- */}
        {/* 🔥 NEW PAGINATION FOOTER     */}
        {/* ---------------------------- */}
        <div className="pagination-controls" style={{ marginTop: 16, display: "flex", justifyContent: "space-between" }}>
          <div>
            Rows per page:{" "}
            <select
              value={rowsPerPage}
              onChange={(e) => { setRowsPerPage(Number(e.target.value)); setCurrentPage(1); }}
              className="rows-select"
            >
              <option value={10}>10</option>
              <option value={20}>20</option>
              <option value={50}>50</option>
            </select>
          </div>

          <div className="pagination-buttons" style={{ display: "flex", gap: 8 }}>
            <button disabled={currentPage === 1} onClick={() => setCurrentPage(p => p - 1)}>
              Prev
            </button>
            <span>{currentPage} / {totalPages}</span>
            <button disabled={currentPage === totalPages} onClick={() => setCurrentPage(p => p + 1)}>
              Next
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}
