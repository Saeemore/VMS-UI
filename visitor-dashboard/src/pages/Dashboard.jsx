import React, { useMemo, useEffect, useState } from "react";
import "../styles/Dashboard.css";
import Sidebar from "../components/Sidebar";
import HeaderStats from "../components/HeaderStats";
import Activities from "../components/Activities";
import VisitorHistory from "../components/VisitorHistory";
import DepartmentVisits from "../components/DepartmentVisits";
import Header from "../components/Header";
import { useDrawer } from "../hooks/useDrawer";
import api from "../api/api"; // <-- axios wrapper

const activitiesData = [
  { text: "Ridiculus tempus vitae lectus blandit vulputate dolor integer natoque augue.", timeAgo: "7 days ago", icon: "💬" },
  { text: "Scelerisque ultrices tellus tellus sed mattis egestas purus ut vel.", timeAgo: "7 days ago", icon: "👤" },
  { text: "Turpis fringilla pellentesque adipiscing neque sit.", timeAgo: "7 days ago", icon: "🦊" },
  { text: "Massa viverra sed arcu scelerisque malesuada.", timeAgo: "7 days ago", icon: "🐶" },
  { text: "Vestibulum lobortis nunc duis tortor malesuada lacinia magna proin.", timeAgo: "7 days ago", icon: "🧑‍💻" },
  { text: "Felis pellentesque morbi nunc non enim, tincidunt maecenas.", timeAgo: "7 days ago", icon: "🐈" }
];

const debounce = (fn, delay) => {
  let t;
  return (...args) => {
    clearTimeout(t);
    t = setTimeout(() => fn(...args), delay);
  };
};

const Dashboard = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [allVisitors, setAllVisitors] = useState([]);
  const [filteredVisitors, setFilteredVisitors] = useState([]);
  const [loading, setLoading] = useState(false);
  const { open } = useDrawer();

  const handleViewDetails = (key, openerEl) => {
    open(key, { opener: openerEl });
  };

  // ✅ Fetch recent visits from backend
  const fetchVisitors = async () => {
    setLoading(true);
    try {
      const res = await api.get("/host/recent");
      // console.log("Recent visits:", res.data);
      setAllVisitors(res.data || []);
      setFilteredVisitors(res.data || []);
    } catch (err) {
      console.error("Error fetching visitors:", err);
      setAllVisitors([]);
      setFilteredVisitors([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchVisitors();
  }, []);

  // ✅ Define proper columns for VisitorHistory
  const columns = useMemo(
    () => [
      {
        key: "visitor",
        header: "Visitor",
        render: (row) => (
          <div className="visitor-cell">
            {/* ✅ Display visitor selfie */}
            <img
              src={
                row.visitor?._id
                  ? `http://localhost:5000/api/visitors/${row.visitor._id}/selfie`
                  : "/default-avatar.png"
              }
              alt={row.visitor?.name || "Visitor"}
              width={40}
              height={40}
              style={{
                borderRadius: "50%",
                objectFit: "cover",
                marginRight: "10px",
                border: "2px solid #e5e7eb",
              }}
              onError={(e) => {
                e.target.src = "/default-avatar.png";
              }}
            />
            <div className="visitor-info">
              <div className="visitor-name">
                {row.visitor?.name || row.visitorName || "—"}
              </div>
              <div className="visitor-email">
                {row.visitor?.email || "—"}
              </div>
            </div>
          </div>
        ),
      },
      {
        key: "hostName",
        header: "Visiting",
        render: (row) => <span>{row.hostName || "—"}</span>,
      },
      {
  key: "purpose",
  header: "Purpose",
  render: (row, index) => {
    // Rotate colors through green → blue → orange → purple → repeat
    const colors = ["green", "blue", "orange", "purple"];
    const colorClass = colors[index % colors.length];

    return (
      <span className={`purpose-badge ${colorClass}`}>
        {row.purpose || "—"}
      </span>
    );
  },
},

      {
        key: "scheduled_at",
        header: "Check-In",
        render: (row) => {
          if (!row.scheduled_at) return "—";
          const date = new Date(row.scheduled_at);
          return `${date.toLocaleDateString("en-GB")} ${date.toLocaleTimeString("en-US", {
            hour: "numeric",
            minute: "2-digit",
            hour12: true,
          })}`;
        },
      },
      {
        key: "checkOutTime",
        header: "Check-Out",
        render: (row) => {
          if (!row.checkOutTime && !row.updatedAt) return "—";
          const date = new Date(row.checkOutTime || row.updatedAt);
          return `${date.toLocaleDateString("en-GB")} ${date.toLocaleTimeString("en-US", {
            hour: "numeric",
            minute: "2-digit",
            hour12: true,
          })}`;
        },
      },
    ],
    []
  );

  // Debounced client-side filter
  const debouncedSearch = useMemo(
    () =>
      debounce((term) => {
        const lower = term.trim().toLowerCase();
        if (!lower) return setFilteredVisitors(allVisitors);
        setFilteredVisitors(
          allVisitors.filter((v) => {
            const name = v.visitor?.name || v.visitorName || "";
            const email = v.visitor?.email || "";
            const purpose = v.purpose || "";
            const host = v.hostName || "";
            return (
              name.toLowerCase().includes(lower) ||
              email.toLowerCase().includes(lower) ||
              purpose.toLowerCase().includes(lower) ||
              host.toLowerCase().includes(lower)
            );
          })
        );
      }, 250),
    [allVisitors]
  );

  useEffect(() => {
    debouncedSearch(searchTerm);
  }, [searchTerm, debouncedSearch]);

  return (
    <>
      <HeaderStats onViewDetails={handleViewDetails} />
      <div className="main-layout">
        <VisitorHistory
          title="Recent Visitor History"
          visitors={filteredVisitors}
          onSearch={setSearchTerm}
          loading={loading}
          columns={columns}
          showRowMenu={false}
        />
        <div className="side-by-side">
          <Activities activitiesData={activitiesData} />
          <DepartmentVisits />
        </div>
      </div>
    </>
  );
};

export default Dashboard;
