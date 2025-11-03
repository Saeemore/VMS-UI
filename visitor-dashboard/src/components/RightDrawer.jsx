// src/components/RightDrawer.jsx
import React, { useEffect, useRef, useState } from "react";
import { useDrawer } from "../hooks/useDrawer";

export default function RightDrawer() {
  const { isOpen, view, close } = useDrawer();
  const panelRef = useRef(null);

  // Close on Esc
  useEffect(() => {
    function onKey(e) {
      if (e.key === "Escape") close();
    }
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
        <div className="drawer-header">
          <h3 id="drawer-title" className="drawer-title">
            {view === "missedVisits" && "Missed Visits"}
            {view === "expectedVisitors" && "Expected Visitors"}
            {view === "checkedIn" && "Checked In"}
            {view === "scheduled" && "Scheduled"}
            {view === "notifications" && "Notifications"}
            {!view && "Details"}
          </h3>
          <button className="drawer-close" onClick={close} aria-label="Close panel">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
              <path d="M6 6l12 12M18 6L6 18" stroke="#6b7280" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </button>
        </div>

        <div className="drawer-body">
          {view === "missedVisits" && <MissedVisitsPanel />}
          {view === "expectedVisitors" && <ExpectedVisitorsPanel />}
          {view === "checkedIn" && <CheckedInPanel />}
          {view === "scheduled" && <ScheduledPanel />}
          {view === "notifications" && <NotificationsPanel />}
        </div>
      </aside>
    </>
  );
}

/* =========================
   Missed Visits Panel
   ========================= */
function MissedVisitsPanel() {
  const items = [
    { id: 1, name: "John Doe", visiting: "Sneha S", time: "On 23 Jul 25 at 4:00 PM", avatar: "https://i.pravatar.cc/120?img=12" },
    { id: 2, name: "John Doe", visiting: "Sneha S", time: "On 23 Jul 25 at 4:00 PM", avatar: "https://i.pravatar.cc/120?img=32" },
    { id: 3, name: "John Doe", visiting: "Sneha S", time: "On 23 Jul 25 at 4:00 PM", avatar: "https://i.pravatar.cc/120?img=33" },
    { id: 4, name: "John Doe", visiting: "Sneha S", time: "On 23 Jul 25 at 4:00 PM", avatar: "https://i.pravatar.cc/120?img=14" },
  ];

  return (
    <div>
      <div className="mv-search mb-3">
        <span className="mv-search-icon">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
            <path d="M21 21l-4.35-4.35" stroke="rgba(71,69,85,.4)" strokeWidth="2" strokeLinecap="round" />
            <circle cx="11" cy="11" r="7" stroke="rgba(71,69,85,.4)" strokeWidth="2" />
          </svg>
        </span>
        <input className="mv-search-input" placeholder="Search Anything ..." />
      </div>

      <ul className="mv-list">
        {items.map((it) => (
          <li key={it.id} className="mv-row">
            <div className="mv-left">
              <img src={it.avatar} alt="" className="mv-avatar" />
              <div className="mv-text">
                <div className="mv-name">{it.name}</div>
                <div className="mv-sub">Visiting {it.visiting}</div>
                <div className="mv-sub">{it.time}</div>
              </div>
            </div>
            <button className="mv-cta" type="button">
              <span className="mv-cta-icon">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                  <path d="M12 8v4l3 3" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M21 12a9 9 0 1 1-9-9" stroke="#fff" strokeWidth="2" strokeLinecap="round" />
                </svg>
              </span>
              Reschedule
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

/* =========================
   Notifications Panel
   ========================= */
function NotificationsPanel() {
  const [tab, setTab] = useState("all");
  const tabs = [
    { key: "all", label: "All" },
    { key: "unread", label: "Unread" },
    { key: "sent", label: "Sent" },
    { key: "requests", label: "Requests" },
    { key: "approvals", label: "Approvals" },
    { key: "rejections", label: "Rejections" },
  ];

  const Section = ({ title, children }) => (
    <div className="mb-6">
      <div className="nt-section-title">{title}</div>
      <div className="nt-list">{children}</div>
    </div>
  );

  const Row = ({ icon, text, time, muted }) => (
    <div className={`nt-row ${muted ? "muted" : ""}`}>
      <div className="nt-icon">{icon}</div>
      <div className="nt-text">{text}</div>
      <div className="nt-time">{time}</div>
    </div>
  );

  return (
    <div>
      {/* search */}
      <div className="mv-search">
        <span className="mv-search-icon">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
            <path d="M21 21l-4.35-4.35" stroke="rgba(71,69,85,.4)" strokeWidth="2" strokeLinecap="round" />
            <circle cx="11" cy="11" r="7" stroke="rgba(71,69,85,.4)" strokeWidth="2" />
          </svg>
        </span>
        <input className="mv-search-input" placeholder="Search Anything ..." />
      </div>

      {/* tabs */}
      <div className="nt-top-gap flex items-center gap-3 overflow-auto pb-2 mb-4 -mx-1 px-1 nt-tabs">
        {tabs.map(t => (
          <button
            key={t.key}
            onClick={() => setTab(t.key)}
            className={`nt-chip ${tab === t.key ? "active" : ""}`}
          >
            {t.label}
          </button>
        ))}
      </div>

      {/* sections */}
      <Section title="Today">
        <Row icon={<InIcon />} text="Dheeraj Bhaskar has checked out" time="7 days ago" />
        <Row icon={<XIcon className="text-red-500" />} text="Host John has rejected a visit by Ritesh at 9:45 AM" time="7 days ago" />
        <Row icon={<PlusIcon />} text="New Visit Request from Ritesh More at 9:45 AM" time="7 days ago" />
        <Row icon={<OutCard />} text="Anjali Gupta has checked out" time="7 days ago" muted />
        <Row icon={<InCard />} text="Dheeraj Bhaskar has checked in" time="7 days ago" muted />
      </Section>

      <Section title="Yesterday">
        <Row icon={<CheckIcon className="text-emerald-600" />} text="Host John has approved a visit by Ritesh at 9:45 AM" time="7 days ago" />
        <Row icon={<OutCard />} text="Anjali Gupta has checked out" time="7 days ago" muted />
        <Row icon={<InCard />} text="Dheeraj Bhaskar has checked in" time="7 days ago" muted />
      </Section>

      <Section title="Oct 23, 2025">
        <Row icon={<CheckIcon className="text-emerald-600" />} text="Host John has approved a visit by Ritesh at 9:45 AM" time="7 days ago" />
        <Row icon={<OutCard />} text="Anjali Gupta has checked out" time="7 days ago" muted />
        <Row icon={<InCard />} text="Dheeraj Bhaskar has checked in" time="7 days ago" muted />
      </Section>
    </div>
  );
}

/* =========================
   Simple placeholders for other tabs
   ========================= */
function ExpectedVisitorsPanel() {
  return <div className="text-gray-700">Expected visitors list…</div>;
}
function CheckedInPanel() {
  return <div className="text-gray-700">Checked‑in visitors list…</div>;
}
function ScheduledPanel() {
  return <div className="text-gray-700">Scheduled visits list…</div>;
}

/* =========================
   Inline icons
   ========================= */
const InIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
    <path d="M4 12h12M10 6l6 6-6 6" stroke="#6b7280" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);
const OutCard = InIcon;

const InCard = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
    <path d="M20 12H8M14 18l-6-6 6-6" stroke="#6b7280" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);
const CheckIcon = ({ className }) => (
  <svg className={className} width="20" height="20" viewBox="0 0 24 24" fill="none">
    <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="2" />
    <path d="M8 12l3 3 5-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);
const XIcon = ({ className }) => (
  <svg className={className} width="20" height="20" viewBox="0 0 24 24" fill="none">
    <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="2" />
    <path d="M9 9l6 6M15 9l-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
  </svg>
);
const PlusIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
    <path d="M12 5v14M5 12h14" stroke="#6b7280" strokeWidth="2" strokeLinecap="round" />
  </svg>
);
