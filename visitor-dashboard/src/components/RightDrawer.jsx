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
               <svg width="20" height="18" viewBox="0 0 20 18" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M2.521 7.06051C2.86148 5.78865 3.53079 4.62883 4.46163 3.69765C5.39247 2.76647 6.55205 2.09675 7.82379 1.75581C9.09553 1.41487 10.4346 1.41472 11.7064 1.75539C12.9782 2.09606 14.138 2.76553 15.069 3.69651L16.972 5.59951H13.789C13.5901 5.59951 13.3993 5.67853 13.2587 5.81918C13.118 5.95983 13.039 6.1506 13.039 6.34951C13.039 6.54842 13.118 6.73919 13.2587 6.87984C13.3993 7.02049 13.5901 7.09951 13.789 7.09951H18.781C18.9799 7.09951 19.1707 7.02049 19.3113 6.87984C19.452 6.73919 19.531 6.54842 19.531 6.34951V1.35751C19.531 1.1586 19.452 0.967832 19.3113 0.82718C19.1707 0.686527 18.9799 0.60751 18.781 0.60751C18.5821 0.60751 18.3913 0.686527 18.2507 0.82718C18.11 0.967832 18.031 1.1586 18.031 1.35751V4.53751L16.131 2.63751C15.014 1.51996 13.6224 0.716194 12.0962 0.307012C10.57 -0.102169 8.96303 -0.10234 7.43676 0.306516C5.91049 0.715373 4.51876 1.51885 3.40149 2.63616C2.28422 3.75346 1.4808 5.14522 1.072 6.67151C1.04652 6.76672 1.04005 6.86601 1.05295 6.96372C1.06584 7.06143 1.09786 7.15565 1.14717 7.24098C1.19648 7.32632 1.26211 7.40111 1.34032 7.46108C1.41853 7.52105 1.50779 7.56503 1.603 7.59051C1.69821 7.61599 1.7975 7.62246 1.89521 7.60956C1.99292 7.59667 2.08714 7.56465 2.17247 7.51534C2.25781 7.46603 2.3326 7.4004 2.39257 7.32219C2.45254 7.24398 2.49652 7.15472 2.522 7.05951L2.521 7.06051ZM17.929 10.4125C17.8339 10.3869 17.7346 10.3804 17.6369 10.3932C17.5392 10.406 17.445 10.4379 17.3597 10.4871C17.2744 10.5363 17.1996 10.6019 17.1395 10.68C17.0795 10.7582 17.0355 10.8474 17.01 10.9425C16.6695 12.2144 16.0002 13.3742 15.0694 14.3054C14.1385 15.2365 12.979 15.9063 11.7072 16.2472C10.4355 16.5882 9.09639 16.5883 7.82458 16.2476C6.55276 15.907 5.39304 15.2375 4.462 14.3065L2.56 12.4035H5.743C5.94191 12.4035 6.13268 12.3245 6.27333 12.1838C6.41398 12.0432 6.493 11.8524 6.493 11.6535C6.493 11.4546 6.41398 11.2638 6.27333 11.1232C6.13268 10.9825 5.94191 10.9035 5.743 10.9035H0.75C0.551088 10.9035 0.360322 10.9825 0.21967 11.1232C0.0790178 11.2638 0 11.4546 0 11.6535V16.6455C0 16.8444 0.0790178 17.0352 0.21967 17.1758C0.360322 17.3165 0.551088 17.3955 0.75 17.3955C0.948912 17.3955 1.13968 17.3165 1.28033 17.1758C1.42098 17.0352 1.5 16.8444 1.5 16.6455V13.4655L3.4 15.3655C4.5171 16.483 5.90873 17.2868 7.43498 17.6959C8.96122 18.105 10.5683 18.1051 12.0946 17.6961C13.6209 17.2872 15.0126 16.4836 16.1298 15.3662C17.247 14.2487 18.0503 12.8569 18.459 11.3305C18.5103 11.1385 18.4833 10.934 18.384 10.7618C18.2846 10.5897 18.121 10.4641 17.929 10.4125Z" fill="white"/>
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
  <svg width="18" height="20" viewBox="0 0 18 20" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M11.25 6.75V3C11.25 2.40326 11.0129 1.83097 10.591 1.40901C10.169 0.987053 9.59674 0.75 9 0.75H3C2.40326 0.75 1.83097 0.987053 1.40901 1.40901C0.987053 1.83097 0.75 2.40326 0.75 3V16.5C0.75 17.0967 0.987053 17.669 1.40901 18.091C1.83097 18.5129 2.40326 18.75 3 18.75H9C9.59674 18.75 10.169 18.5129 10.591 18.091C11.0129 17.669 11.25 17.0967 11.25 16.5V12.75M7.5 6.75L4.5 9.75M4.5 9.75L7.5 12.75M4.5 9.75H17.25" stroke="#1890FF" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
</svg>

);
const OutCard = ()=>(
  <svg width="18" height="20" viewBox="0 0 18 20" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M6.75 6.75V3C6.75 2.40326 6.98705 1.83097 7.40901 1.40901C7.83097 0.987053 8.40326 0.75 9 0.75H15C15.5967 0.75 16.169 0.987053 16.591 1.40901C17.0129 1.83097 17.25 2.40326 17.25 3V16.5C17.25 17.0967 17.0129 17.669 16.591 18.091C16.169 18.5129 15.5967 18.75 15 18.75H9C8.40326 18.75 7.83097 18.5129 7.40901 18.091C6.98705 17.669 6.75 17.0967 6.75 16.5V12.75M10.5 6.75L13.5 9.75M13.5 9.75L10.5 12.75M13.5 9.75H0.75" stroke="#474555" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
</svg>

);

const InCard = InIcon;
const CheckIcon = ({ className }) => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M6.75 10.5L9 12.75L12.75 7.5M18.75 9.75C18.75 10.9319 18.5172 12.1022 18.0649 13.1942C17.6126 14.2861 16.9497 15.2782 16.114 16.114C15.2782 16.9497 14.2861 17.6126 13.1942 18.0649C12.1022 18.5172 10.9319 18.75 9.75 18.75C8.5681 18.75 7.39778 18.5172 6.30585 18.0649C5.21392 17.6126 4.22177 16.9497 3.38604 16.114C2.55031 15.2782 1.88738 14.2861 1.43508 13.1942C0.982792 12.1022 0.75 10.9319 0.75 9.75C0.75 7.36305 1.69821 5.07387 3.38604 3.38604C5.07387 1.69821 7.36305 0.75 9.75 0.75C12.1369 0.75 14.4261 1.69821 16.114 3.38604C17.8018 5.07387 18.75 7.36305 18.75 9.75Z" stroke="#008752" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
</svg>

);
const XIcon = ({ className }) => (
 <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M7.5 7.5L12 12M12 7.5L7.5 12M18.75 9.75C18.75 10.9319 18.5172 12.1022 18.0649 13.1942C17.6126 14.2861 16.9497 15.2782 16.114 16.114C15.2782 16.9497 14.2861 17.6126 13.1942 18.0649C12.1022 18.5172 10.9319 18.75 9.75 18.75C8.5681 18.75 7.39778 18.5172 6.30585 18.0649C5.21392 17.6126 4.22177 16.9497 3.38604 16.114C2.55031 15.2782 1.88738 14.2861 1.43508 13.1942C0.982792 12.1022 0.75 10.9319 0.75 9.75C0.75 7.36305 1.69821 5.07387 3.38604 3.38604C5.07387 1.69821 7.36305 0.75 9.75 0.75C12.1369 0.75 14.4261 1.69821 16.114 3.38604C17.8018 5.07387 18.75 7.36305 18.75 9.75Z" stroke="#FF495E" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
</svg>


);
const PlusIcon = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M15.75 5.25V8.25M15.75 8.25V11.25M15.75 8.25H18.75M15.75 8.25H12.75M10.5 4.125C10.5 5.02011 10.1444 5.87855 9.51149 6.51149C8.87855 7.14442 8.02011 7.5 7.125 7.5C6.22989 7.5 5.37145 7.14442 4.73851 6.51149C4.10558 5.87855 3.75 5.02011 3.75 4.125C3.75 3.22989 4.10558 2.37145 4.73851 1.73851C5.37145 1.10558 6.22989 0.75 7.125 0.75C8.02011 0.75 8.87855 1.10558 9.51149 1.73851C10.1444 2.37145 10.5 3.22989 10.5 4.125ZM0.75 16.985V16.875C0.75 15.1842 1.42165 13.5627 2.61719 12.3672C3.81274 11.1716 5.43424 10.5 7.125 10.5C8.81576 10.5 10.4373 11.1716 11.6328 12.3672C12.8284 13.5627 13.5 15.1842 13.5 16.875V16.984C11.5755 18.1431 9.37061 18.7538 7.124 18.75C4.793 18.75 2.612 18.105 0.75 16.984V16.985Z" stroke="#975FE4" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
</svg>

);
