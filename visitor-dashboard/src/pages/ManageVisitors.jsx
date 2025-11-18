// 

// FILE: src/pages/ManageVisitors.jsx
import React, { useMemo, useEffect, useState } from "react";
import VisitorHistory from "../components/VisitorHistory";
import api from "../api/api"; // ✅ axios instance
import ScheduleVisitForm from "../components/ScheduleVisitForm";
import "../styles/ManageVisitors.css";


const BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000";

// simple debounce
const debounce = (fn, delay) => {
  let t;
  return (...a) => {
    clearTimeout(t);
    t = setTimeout(() => fn(...a), delay);
  };
};

/* ---------- viewport helpers (no deps) ---------- */
const getViewportFlags = () => {
  const w = typeof window !== "undefined" ? window.innerWidth : 1200;
  return {
    isPhoneSm: w <= 480,
    isPhone: w <= 640,
    isTablet: w <= 768,
    isLaptop: w <= 1024,
  };
};

export default function ManageVisitors() {
  const [searchTerm, setSearchTerm] = useState("");
  const [rows, setRows] = useState([]);
  const [allVisitors, setAllVisitors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [vw, setVw] = useState(getViewportFlags());
  const [showScheduleForm, setShowScheduleForm] = useState(false);

  // listen to resize to toggle responsive columns
  useEffect(() => {
    const onResize = () => setVw(getViewportFlags());
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  // ✅ Fetch visitor list from backend
  const fetchVisitors = async () => {
    setLoading(true);
    try {
      const res = await api.get("/visitors");
      const data = res.data;

      // ✅ Define purpose colors OUTSIDE the map
      const purposeColors = ["blue", "green", "purple", "orange"];

      const formatDate = (date) =>
  new Date(date).toLocaleString("en-IN", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    hour12: true    // If you want AM/PM
  });

      // ✅ Map DB data to table format
      const formatted = data.map((v, i) => ({
        id: v._id,
        name: v.visitor?.name || "Unknown",
        email: v.visitor?.email || "—",
        visiting: v.host?.name || v.hostName || "—",
        visitingrole: v.host?.email || "",
        purpose: v.purpose || "—",
        purposecolor: purposeColors[i % purposeColors.length], // ✅ alternate colors
        checkin: v.createdAt ? formatDate(v.createdAt): "—",
        checkout: v.updatedAt ? formatDate(v.updatedAt): "—",
        avatar: v.visitor?._id
          ? `${BASE_URL}/api/visitors/${v.visitor._id}/selfie`
          : "/assets/default-avatar.png",
        company: v.visitor?.company || "—",
        status: v.status ? v.status.toLowerCase().replace("_", "-") : "pending",
      }));

      setRows(formatted);
      setAllVisitors(formatted);
    } catch (err) {
      console.error("Error fetching visitors:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchVisitors();
  }, []);

  // ✅ Debounced search filter
  const debouncedFilter = useMemo(
    () =>
      debounce((term) => {
        const q = term.trim().toLowerCase();
        if (!q) return setRows(allVisitors);
        setRows(
          allVisitors.filter((r) =>
            [r.name, r.email, r.visiting, r.purpose, r.company]
              .filter(Boolean)
              .some((v) => String(v).toLowerCase().includes(q))
          )
        );
      }, 250),
    [allVisitors]
  );

  useEffect(() => {
    debouncedFilter(searchTerm);
  }, [searchTerm, debouncedFilter]);

  // ✅ Base columns (desktop defaults stay exactly as-is)
  const baseColumns = useMemo(
    () => [
      {
        key: "visitor",
        header: "Visitor",
        width: 280,
        render: (r) => (
          <div className="visitor-cell">
            <img
              className="visitor-avatar"
              src={r.avatar}
              alt={r.name || "Visitor"}
              onError={(e) => {
                // ✅ Prevent infinite fallback loop
                if (e.target.dataset.fallback === "true") return;
                e.target.onerror = null;
                e.target.src = "/assets/default-avatar.png";
                e.target.dataset.fallback = "true"; // flag that fallback is applied
              }}
            />
            <div className="visitor-info">
              <div className="visitor-name">{r.name}</div>
              <div className="visitor-email">{r.email}</div>
            </div>
          </div>
        ),
      },
      {
        key: "visiting",
        header: "Visiting",
        width: 220,
        render: (r) => (
          <div>
            <div className="visiting-name">{r.visiting}</div>
            <div className="visiting-role">{r.visitingrole}</div>
          </div>
        ),
      },
      {
        key: "purpose",
        header: "Purpose",
        width: 160,
        render: (r) => (
          <span className={`purpose-badge ${r.purposecolor}`}>{r.purpose}</span>
        ),
      },
      {
        key: "checkin",
        header: "Check In",
        width: 180,
        render: (r) => <div className="time-cell">{r.checkin}</div>,
      },
      {
        key: "checkout",
        header: "Check Out",
        width: 180,
        render: (r) => <div className="time-cell">{r.checkout}</div>,
      },
      {
        key: "status",
        header: "Status",
        width: 160,
        render: (r) => (
          <div className={`status-badge ${r.status}`}>{r.status}</div>
        ),
      },
    ],
    []
  );

  /* ✅ Responsive columns:
     - Desktop: use widths as-is
     - Tablet/Phone: drop hard widths (let CSS control)
     - Small phones: also hide "Visiting" + "Checkout" to avoid overflow
  */
  const columns = useMemo(() => {
    // small phones: hide low-priority cols
    if (vw.isPhoneSm) {
      return baseColumns
        .filter((c) => c.key !== "visiting" && c.key !== "checkout")
        .map((c) => ({ ...c, width: undefined })); // remove fixed widths
    }

    // tablet/phone: keep all cols, but drop fixed widths
    if (vw.isTablet) {
      return baseColumns.map((c) => ({ ...c, width: undefined }));
    }

    // desktop/laptop: original widths
    return baseColumns;
  }, [baseColumns, vw]);

  const handleRowAction = (action, row) => {
    console.log(action, row);
  };

  return (
    <div className="manage-visitors-page">{/* wrapper for scoped CSS */}
      <VisitorHistory
        title="All Visitors"
        visitors={rows}
        onSearch={setSearchTerm}
        showAddButton
        onAdd={() => setShowScheduleForm(true)}
        addButtonText="Add New"
        columns={columns}
        showRowMenu
        onRowAction={handleRowAction}
        loading={loading}
      />
      {/* ============================
          SHOW FORM IN MODAL POPUP
      ============================ */}
      {showScheduleForm && (
        <div className="modal-overlay">
          <div className="modal-content">

            {/* Close button */}
            <button
              className="modal-close"
              onClick={() => setShowScheduleForm(false)}
            >
              ✕
            </button>

            <ScheduleVisitForm isModal={true}
            onSuccess={()=>{
              setShowScheduleForm(false);
              fetchVisitors();
            }}
            />
          </div>
        </div>
      )}

    </div>
  );
}
