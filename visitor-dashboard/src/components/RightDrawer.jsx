import React, { useEffect, useRef, useState } from "react";
import { useDrawer } from "../hooks/useDrawer";
import api from "../api/api";

const BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000";

export default function RightDrawer() {
  const { isOpen, view, close } = useDrawer();
  const panelRef = useRef(null);

  // Close on ESC key
  useEffect(() => {
    const onKey = (e) => e.key === "Escape" && close();
    if (isOpen) window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [isOpen, close]);

  const overlayClass = `drawer-overlay ${isOpen ? "show" : ""}`;
  const panelClass = `drawer-panel ${isOpen ? "open" : ""}`;

  return (
    <>
      <div className={overlayClass} onClick={close} aria-hidden={!isOpen} />
      <aside
        ref={panelRef}
        className={panelClass}
        role="dialog"
        aria-modal="true"
        aria-labelledby="drawer-title"
      >
        <div className="drawer-header flex items-center justify-between p-4 border-b">
          <h3 id="drawer-title" className="drawer-title text-lg font-semibold">
            {view === "missedVisits" && "Missed Visits"}
            {view === "expectedVisitors" && "Expected Visitors"}
            {view === "approval" && "Waiting for Approval"}
            {view === "scheduled" && "Scheduled"}
            {view === "notifications" && "Notifications"}
            {!view && "Details"}
          </h3>
          <button onClick={close} className="text-gray-500 hover:text-gray-700">
            ✕
          </button>
        </div>

        <div className="drawer-body p-4 overflow-y-auto">
          {view === "missedVisits" && <MissedVisitsPanel />}
          {view === "expectedVisitors" && <ExpectedVisitorsPanel />}
          {view === "approval" && <ApprovalPanel />}
          {view === "scheduled" && <ScheduledPanel />}
          {view === "notifications" && <NotificationsPanel />}
        </div>
      </aside>
    </>
  );
}

/* =========================
   Missed Visits Panel (with Selfie + API)
   ========================= */
function MissedVisitsPanel() {
  const [visits, setVisits] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMissedVisits = async () => {
      try {
        const res = await api.get("/host/missed");
        setVisits(res.data || []);
      } catch (err) {
        console.error("Error fetching missed visits:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchMissedVisits();
  }, []);

  // 🔍 Filter missed visits only
  const filtered = visits.filter((v) => {
    const matchStatus = v.status?.toLowerCase() === "missed";
    const matchSearch =
      v.visitorName?.toLowerCase().includes(search.toLowerCase()) ||
      v.purpose?.toLowerCase().includes(search.toLowerCase());
    return matchStatus && matchSearch;
  });

  if (loading)
    return (
      <div className="p-4 text-center text-gray-500">
        Loading missed visits...
      </div>
    );

  return (
    <div>
      {/* Search Bar */}
      <div className="relative mb-3">
        <span className="absolute left-3 top-2.5 text-gray-400">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
            <path
              d="M21 21l-4.35-4.35"
              stroke="rgba(71,69,85,.4)"
              strokeWidth="2"
              strokeLinecap="round"
            />
            <circle
              cx="11"
              cy="11"
              r="7"
              stroke="rgba(71,69,85,.4)"
              strokeWidth="2"
            />
          </svg>
        </span>
        <input
          className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-blue-200"
          placeholder="Search visitor..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* List */}
      {filtered.length === 0 ? (
        <div className="text-center text-gray-500 py-3">
          No missed visits found.
        </div>
      ) : (
        <ul className="divide-y divide-gray-200">
          {filtered.map((it) => {
            const selfieUrl = it.visitor?._id
              ? `${BASE_URL}/api/visitors/${it.visitor._id}/selfie`
              : "/assets/default-avatar.png";

            return (
              <li
                key={it._id}
                className="flex items-center justify-between py-3 hover:bg-gray-50 transition"
              >
                <div className="flex items-center gap-3">
                  <img
                    src={selfieUrl}
                    alt={it.visitorName || "Visitor"}
                    className="w-12 h-12 rounded-full object-cover border border-gray-200"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = "/assets/default-avatar.png";
                    }}
                  />
                  <div>
                    <div className="font-medium text-gray-800">
                      {it.visitorName || "Unknown"}
                    </div>
                    <div className="text-sm text-gray-500">{it.purpose}</div>
                    <div className="text-xs text-gray-400">
                      {new Date(it.scheduled_at).toLocaleString("en-IN", {
                        dateStyle: "medium",
                        timeStyle: "short",
                      })}
                    </div>
                  </div>
                </div>
                 <button className="mv-cta" type="button">
                <span className="mv-cta-icon">
                  <svg width="20" height="18" viewBox="0 0 20 18" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M2.521 7.06051C2.86148 5.78865 3.53079 4.62883 4.46163 3.69765C5.39247 2.76647 6.55205 2.09675 7.82379 1.75581C9.09553 1.41487 10.4346 1.41472 11.7064 1.75539C12.9782 2.09606 14.138 2.76553 15.069 3.69651L16.972 5.59951H13.789C13.5901 5.59951 13.3993 5.67853 13.2587 5.81918C13.118 5.95983 13.039 6.1506 13.039 6.34951C13.039 6.54842 13.118 6.73919 13.2587 6.87984C13.3993 7.02049 13.5901 7.09951 13.789 7.09951H18.781C18.9799 7.09951 19.1707 7.02049 19.3113 6.87984C19.452 6.73919 19.531 6.54842 19.531 6.34951V1.35751C19.531 1.1586 19.452 0.967832 19.3113 0.82718C19.1707 0.686527 18.9799 0.60751 18.781 0.60751C18.5821 0.60751 18.3913 0.686527 18.2507 0.82718C18.11 0.967832 18.031 1.1586 18.031 1.35751V4.53751L16.131 2.63751C15.014 1.51996 13.6224 0.716194 12.0962 0.307012C10.57 -0.102169 8.96303 -0.10234 7.43676 0.306516C5.91049 0.715373 4.51876 1.51885 3.40149 2.63616C2.28422 3.75346 1.4808 5.14522 1.072 6.67151C1.04652 6.76672 1.04005 6.86601 1.05295 6.96372C1.06584 7.06143 1.09786 7.15565 1.14717 7.24098C1.19648 7.32632 1.26211 7.40111 1.34032 7.46108C1.41853 7.52105 1.50779 7.56503 1.603 7.59051C1.69821 7.61599 1.7975 7.62246 1.89521 7.60956C1.99292 7.59667 2.08714 7.56465 2.17247 7.51534C2.25781 7.46603 2.3326 7.4004 2.39257 7.32219C2.45254 7.24398 2.49652 7.15472 2.522 7.05951L2.521 7.06051ZM17.929 10.4125C17.8339 10.3869 17.7346 10.3804 17.6369 10.3932C17.5392 10.406 17.445 10.4379 17.3597 10.4871C17.2744 10.5363 17.1996 10.6019 17.1395 10.68C17.0795 10.7582 17.0355 10.8474 17.01 10.9425C16.6695 12.2144 16.0002 13.3742 15.0694 14.3054C14.1385 15.2365 12.979 15.9063 11.7072 16.2472C10.4355 16.5882 9.09639 16.5883 7.82458 16.2476C6.55276 15.907 5.39304 15.2375 4.462 14.3065L2.56 12.4035H5.743C5.94191 12.4035 6.13268 12.3245 6.27333 12.1838C6.41398 12.0432 6.493 11.8524 6.493 11.6535C6.493 11.4546 6.41398 11.2638 6.27333 11.1232C6.13268 10.9825 5.94191 10.9035 5.743 10.9035H0.75C0.551088 10.9035 0.360322 10.9825 0.21967 11.1232C0.0790178 11.2638 0 11.4546 0 11.6535V16.6455C0 16.8444 0.0790178 17.0352 0.21967 17.1758C0.360322 17.3165 0.551088 17.3955 0.75 17.3955C0.948912 17.3955 1.13968 17.3165 1.28033 17.1758C1.42098 17.0352 1.5 16.8444 1.5 16.6455V13.4655L3.4 15.3655C4.5171 16.483 5.90873 17.2868 7.43498 17.6959C8.96122 18.105 10.5683 18.1051 12.0946 17.6961C13.6209 17.2872 15.0126 16.4836 16.1298 15.3662C17.247 14.2487 18.0503 12.8569 18.459 11.3305C18.5103 11.1385 18.4833 10.934 18.384 10.7618C18.2846 10.5897 18.121 10.4641 17.929 10.4125Z" fill="white"/>
</svg>

                </span>
                Reschedule
              </button>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}



/* =========================
   Notifications Panel
   ========================= */
function NotificationsPanel() {
  const [tab, setTab] = useState("all");
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);

  const tabs = [
    { key: "all", label: "All" },
    { key: "unread", label: "Unread" },
    { key: "sent", label: "Sent" },
    { key: "requests", label: "Requests" },
    { key: "approvals", label: "Approvals" },
    { key: "rejections", label: "Rejections" },
  ];

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const res = await api.get("/notifications");
        setNotifications(res.data);
      } catch (err) {
        console.error("Error fetching notifications:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchNotifications();
  }, []);

  const groupByDate = (notifs) => {
    const today = new Date();
    const yesterday = new Date();
    yesterday.setDate(today.getDate() - 1);

    const isSameDay = (d1, d2) =>
      d1.getDate() === d2.getDate() &&
      d1.getMonth() === d2.getMonth() &&
      d1.getFullYear() === d2.getFullYear();

    const groups = { Today: [], Yesterday: [], Earlier: [] };
    notifs.forEach((n) => {
      const date = new Date(n.createdAt);
      if (isSameDay(date, today)) groups.Today.push(n);
      else if (isSameDay(date, yesterday)) groups.Yesterday.push(n);
      else groups.Earlier.push(n);
    });
    return groups;
  };

  const grouped = groupByDate(notifications);

  if (loading)
    return (
      <div className="p-4 text-center text-gray-500">
        Loading notifications...
      </div>
    );

  const formatTimeAgo = (dateStr) => {
    const date = new Date(dateStr);
    const diffMs = Date.now() - date.getTime();
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
    if (diffDays === 0) return "Today";
    if (diffDays === 1) return "Yesterday";
    return `${diffDays} days ago`;
  };

  const BellIcon = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
      <path
        d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6 6 0 10-12 0v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
        stroke="#474555"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );

  return (
    <div>
      {/* Search */}
      <div className="relative mb-3">
        <span className="absolute left-3 top-2.5 text-gray-400">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
            <path
              d="M21 21l-4.35-4.35"
              stroke="rgba(71,69,85,.4)"
              strokeWidth="2"
              strokeLinecap="round"
            />
            <circle
              cx="11"
              cy="11"
              r="7"
              stroke="rgba(71,69,85,.4)"
              strokeWidth="2"
            />
          </svg>
        </span>
        <input
          className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-blue-200"
          placeholder="Search Anything ..."
        />
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 mb-4">
        {tabs.map((t) => (
          <button
            key={t.key}
            onClick={() => setTab(t.key)}
            className={`px-4 py-1.5 rounded-full border ${
              tab === t.key
                ? "bg-blue-600 text-white border-blue-600"
                : "text-gray-600 border-gray-300"
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      {/* Grouped Notifications */}
      {Object.entries(grouped).map(([title, list]) =>
        list.length > 0 ? (
          <div key={title} className="mb-5">
            <h4 className="font-semibold mb-2 text-gray-700">{title}</h4>
            <div className="space-y-2">
              {list.map((n) => (
                <div
                  key={n._id}
                  className={`flex items-start gap-2 p-2 rounded-md ${
                    n.isRead ? "bg-gray-50" : "bg-blue-50"
                  }`}
                >
                  <BellIcon />
                  <div>
                    <div className="text-gray-800 text-sm">
                      {n.message || "New notification"}
                    </div>
                    <div className="text-xs text-gray-500">
                      {formatTimeAgo(n.createdAt)}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : null
      )}

      {notifications.length === 0 && (
        <div className="text-gray-500 text-center py-3">
          No notifications found.
        </div>
      )}
    </div>
  );
}

/* =========================
   Placeholders for Other Tabs
   ========================= */
function ExpectedVisitorsPanel() {
  const [visits, setVisits] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMissedVisits = async () => {
      try {
        const res = await api.get("/host/expected");
        setVisits(res.data || []);
      } catch (err) {
        console.error("Error fetching missed visits:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchMissedVisits();
  }, []);

  // 🔍 Filter missed visits only
  const filtered = visits.filter((v) => {
   
    const matchSearch =
      v.visitorName?.toLowerCase().includes(search.toLowerCase()) ||
      v.purpose?.toLowerCase().includes(search.toLowerCase());
    return  matchSearch;
  });

  if (loading)
    return (
      <div className="p-4 text-center text-gray-500">
        Loading missed visits...
      </div>
    );

  return (
    <div>
      {/* Search Bar */}
      <div className="relative mb-3">
        <span className="absolute left-3 top-2.5 text-gray-400">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
            <path
              d="M21 21l-4.35-4.35"
              stroke="rgba(71,69,85,.4)"
              strokeWidth="2"
              strokeLinecap="round"
            />
            <circle
              cx="11"
              cy="11"
              r="7"
              stroke="rgba(71,69,85,.4)"
              strokeWidth="2"
            />
          </svg>
        </span>
        <input
          className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-blue-200"
          placeholder="Search visitor..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* List */}
      {filtered.length === 0 ? (
        <div className="text-center text-gray-500 py-3">
          No missed visits found.
        </div>
      ) : (
        <ul className="divide-y divide-gray-200">
          {filtered.map((it) => {
            const selfieUrl = it.visitor?._id
              ? `${BASE_URL}/api/visitors/${it.visitor._id}/selfie`
              : "/assets/default-avatar.png";

            return (
              <li
                key={it._id}
                className="flex items-center justify-between py-3 hover:bg-gray-50 transition"
              >
                <div className="flex items-center gap-3">
                  <img
                    src={selfieUrl}
                    alt={it.visitorName || "Visitor"}
                    className="w-12 h-12 rounded-full object-cover border border-gray-200"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = "/assets/default-avatar.png";
                    }}
                  />
                  <div>
                    <div className="font-medium text-gray-800">
                      {it.visitorName || "Unknown"}
                    </div>
                    <div className="text-sm text-gray-500">{it.purpose}</div>
                    <div className="text-xs text-gray-400">
                      {new Date(it.scheduled_at).toLocaleString("en-IN", {
                        dateStyle: "medium",
                        timeStyle: "short",
                      })}
                    </div>
                  </div>
                </div>
                
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
function ApprovalPanel() {
  const [visits, setVisits] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMissedVisits = async () => {
      try {
        const res = await api.get("/host/requests");
        setVisits(res.data || []);
      } catch (err) {
        console.error("Error fetching missed visits:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchMissedVisits();
  }, []);

  // 🔍 Filter missed visits only
  const filtered = visits.filter((v) => {
    
    const matchSearch =
      v.visitorName?.toLowerCase().includes(search.toLowerCase()) ||
      v.purpose?.toLowerCase().includes(search.toLowerCase());
    return matchSearch;
  });

  if (loading)
    return (
      <div className="p-4 text-center text-gray-500">
        Loading missed visits...
      </div>
    );

  return (
    <div>
      {/* Search Bar */}
      <div className="relative mb-3">
        <span className="absolute left-3 top-2.5 text-gray-400">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
            <path
              d="M21 21l-4.35-4.35"
              stroke="rgba(71,69,85,.4)"
              strokeWidth="2"
              strokeLinecap="round"
            />
            <circle
              cx="11"
              cy="11"
              r="7"
              stroke="rgba(71,69,85,.4)"
              strokeWidth="2"
            />
          </svg>
        </span>
        <input
          className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-blue-200"
          placeholder="Search visitor..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* List */}
      {filtered.length === 0 ? (
        <div className="text-center text-gray-500 py-3">
          No missed visits found.
        </div>
      ) : (
        <ul className="divide-y divide-gray-200">
          {filtered.map((it) => {
            const selfieUrl = it.visitor?._id
              ? `${BASE_URL}/api/visitors/${it.visitor._id}/selfie`
              : "/assets/default-avatar.png";

            return (
              <li
                key={it._id}
                className="flex items-center justify-between py-3 hover:bg-gray-50 transition"
              >
                <div className="flex items-center gap-3">
                  <img
                    src={selfieUrl}
                    alt={it.visitorName || "Visitor"}
                    className="w-12 h-12 rounded-full object-cover border border-gray-200"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = "/assets/default-avatar.png";
                    }}
                  />
                  <div>
                    <div className="font-medium text-gray-800">
                      {it.visitorName || "Unknown"}
                    </div>
                    <div className="text-sm text-gray-500">{it.purpose}</div>
                    <div className="text-xs text-gray-400">
                      {new Date(it.scheduled_at).toLocaleString("en-IN", {
                        dateStyle: "medium",
                        timeStyle: "short",
                      })}
                    </div>
                  </div>
                </div>
                 <button className="mv-cta" type="button">
                <span className="mv-cta-icon">
                  <svg width="20" height="18" viewBox="0 0 20 18" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M2.521 7.06051C2.86148 5.78865 3.53079 4.62883 4.46163 3.69765C5.39247 2.76647 6.55205 2.09675 7.82379 1.75581C9.09553 1.41487 10.4346 1.41472 11.7064 1.75539C12.9782 2.09606 14.138 2.76553 15.069 3.69651L16.972 5.59951H13.789C13.5901 5.59951 13.3993 5.67853 13.2587 5.81918C13.118 5.95983 13.039 6.1506 13.039 6.34951C13.039 6.54842 13.118 6.73919 13.2587 6.87984C13.3993 7.02049 13.5901 7.09951 13.789 7.09951H18.781C18.9799 7.09951 19.1707 7.02049 19.3113 6.87984C19.452 6.73919 19.531 6.54842 19.531 6.34951V1.35751C19.531 1.1586 19.452 0.967832 19.3113 0.82718C19.1707 0.686527 18.9799 0.60751 18.781 0.60751C18.5821 0.60751 18.3913 0.686527 18.2507 0.82718C18.11 0.967832 18.031 1.1586 18.031 1.35751V4.53751L16.131 2.63751C15.014 1.51996 13.6224 0.716194 12.0962 0.307012C10.57 -0.102169 8.96303 -0.10234 7.43676 0.306516C5.91049 0.715373 4.51876 1.51885 3.40149 2.63616C2.28422 3.75346 1.4808 5.14522 1.072 6.67151C1.04652 6.76672 1.04005 6.86601 1.05295 6.96372C1.06584 7.06143 1.09786 7.15565 1.14717 7.24098C1.19648 7.32632 1.26211 7.40111 1.34032 7.46108C1.41853 7.52105 1.50779 7.56503 1.603 7.59051C1.69821 7.61599 1.7975 7.62246 1.89521 7.60956C1.99292 7.59667 2.08714 7.56465 2.17247 7.51534C2.25781 7.46603 2.3326 7.4004 2.39257 7.32219C2.45254 7.24398 2.49652 7.15472 2.522 7.05951L2.521 7.06051ZM17.929 10.4125C17.8339 10.3869 17.7346 10.3804 17.6369 10.3932C17.5392 10.406 17.445 10.4379 17.3597 10.4871C17.2744 10.5363 17.1996 10.6019 17.1395 10.68C17.0795 10.7582 17.0355 10.8474 17.01 10.9425C16.6695 12.2144 16.0002 13.3742 15.0694 14.3054C14.1385 15.2365 12.979 15.9063 11.7072 16.2472C10.4355 16.5882 9.09639 16.5883 7.82458 16.2476C6.55276 15.907 5.39304 15.2375 4.462 14.3065L2.56 12.4035H5.743C5.94191 12.4035 6.13268 12.3245 6.27333 12.1838C6.41398 12.0432 6.493 11.8524 6.493 11.6535C6.493 11.4546 6.41398 11.2638 6.27333 11.1232C6.13268 10.9825 5.94191 10.9035 5.743 10.9035H0.75C0.551088 10.9035 0.360322 10.9825 0.21967 11.1232C0.0790178 11.2638 0 11.4546 0 11.6535V16.6455C0 16.8444 0.0790178 17.0352 0.21967 17.1758C0.360322 17.3165 0.551088 17.3955 0.75 17.3955C0.948912 17.3955 1.13968 17.3165 1.28033 17.1758C1.42098 17.0352 1.5 16.8444 1.5 16.6455V13.4655L3.4 15.3655C4.5171 16.483 5.90873 17.2868 7.43498 17.6959C8.96122 18.105 10.5683 18.1051 12.0946 17.6961C13.6209 17.2872 15.0126 16.4836 16.1298 15.3662C17.247 14.2487 18.0503 12.8569 18.459 11.3305C18.5103 11.1385 18.4833 10.934 18.384 10.7618C18.2846 10.5897 18.121 10.4641 17.929 10.4125Z" fill="white"/>
</svg>

                </span>
                Approve
              </button>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
function ScheduledPanel() {
 const [visits, setVisits] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchScheduledVisits = async () => {
      try {
        const res = await api.get("/host/upcoming");
        setVisits(res.data || []);
      } catch (err) {
        console.error("Error fetching missed visits:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchScheduledVisits();
  }, []);

  // 🔍 Filter missed visits only
  const filtered = visits.filter((v) => {
    // const matchStatus = v.status?.toLowerCase() === "missed";
    const matchSearch =
      v.visitorName?.toLowerCase().includes(search.toLowerCase()) ||
      v.purpose?.toLowerCase().includes(search.toLowerCase());
    return matchSearch;
  });

  if (loading)
    return (
      <div className="p-4 text-center text-gray-500">
        Loading missed visits...
      </div>
    );

  return (
    <div>
      {/* Search Bar */}
      <div className="relative mb-3">
        <span className="absolute left-3 top-2.5 text-gray-400">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
            <path
              d="M21 21l-4.35-4.35"
              stroke="rgba(71,69,85,.4)"
              strokeWidth="2"
              strokeLinecap="round"
            />
            <circle
              cx="11"
              cy="11"
              r="7"
              stroke="rgba(71,69,85,.4)"
              strokeWidth="2"
            />
          </svg>
        </span>
        <input
          className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-blue-200"
          placeholder="Search visitor..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* List */}
      {filtered.length === 0 ? (
        <div className="text-center text-gray-500 py-3">
          No Scheduled visits found.
        </div>
      ) : (
        <ul className="divide-y divide-gray-200">
          {filtered.map((it) => {
            const selfieUrl = it.visitor?._id
              ? `${BASE_URL}/api/visitors/${it.visitor._id}/selfie`
              : "/assets/default-avatar.png";

            return (
              <li
                key={it._id}
                className="flex items-center justify-between py-3 hover:bg-gray-50 transition"
              >
                <div className="flex items-center gap-3">
                  <img
                    src={selfieUrl}
                    alt={it.visitorName || "Visitor"}
                    className="w-12 h-12 rounded-full object-cover border border-gray-200"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = "/assets/default-avatar.png";
                    }}
                  />
                  <div>
                    <div className="font-medium text-gray-800">
                      {it.visitorName || "Unknown"}
                    </div>
                    <div className="text-sm text-gray-500">{it.purpose}</div>
                    <div className="text-xs text-gray-400">
                      {new Date(it.scheduled_at).toLocaleString("en-IN", {
                        dateStyle: "medium",
                        timeStyle: "short",
                      })}
                    </div>
                  </div>
                </div>
                
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
