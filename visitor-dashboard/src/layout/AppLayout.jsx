import React, { useEffect, useMemo, useRef, useState } from "react";
import "./layout.css";

const SIDEBAR_WIDTH_EXPANDED = 260;
const SIDEBAR_WIDTH_COLLAPSED = 76;
const MOBILE_BREAKPOINT = 992; // px, matches CSS --bp-lg

function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const handler = () => setReduced(!!mq.matches);
    handler();
    mq.addEventListener?.("change", handler);
    return () => mq.removeEventListener?.("change", handler);
  }, []);
  return reduced;
}

export default function AppLayout({ children }) {
  const prefersReducedMotion = usePrefersReducedMotion();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isDesktop, setIsDesktop] = useState(
    typeof window !== "undefined" ? window.innerWidth >= MOBILE_BREAKPOINT : true
  );

  useEffect(() => {
    const onResize = () => {
      const desktop = window.innerWidth >= MOBILE_BREAKPOINT;
      setIsDesktop(desktop);
      if (!desktop) {
        setSidebarOpen(false); // collapse visual state on small screens
      } else {
        setMobileOpen(false); // ensure drawer closed on desktop
      }
    };
    onResize();
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  // Persist desktop collapsed/expanded state
  useEffect(() => {
    if (isDesktop) {
      const raw = localStorage.getItem("layout:sidebarOpen");
      if (raw !== null) setSidebarOpen(raw === "1");
    }
  }, [isDesktop]);

  useEffect(() => {
    if (isDesktop) {
      localStorage.setItem("layout:sidebarOpen", sidebarOpen ? "1" : "0");
    }
  }, [sidebarOpen, isDesktop]);

  // Derived widths
  const sidebarWidth = useMemo(
    () => (isDesktop ? (sidebarOpen ? SIDEBAR_WIDTH_EXPANDED : SIDEBAR_WIDTH_COLLAPSED) : 0),
    [isDesktop, sidebarOpen]
  );

  // Accessibility: trap focus when mobile drawer is open
  const drawerRef = useRef(null);
  useEffect(() => {
    if (!mobileOpen) return;
    const drawer = drawerRef.current;
    if (!drawer) return;

    const focusable = drawer.querySelectorAll(
      "a,button,input,select,textarea,[tabindex]:not([tabindex='-1'])"
    );
    const first = focusable[0];
    const last = focusable[focusable.length - 1];

    const onKeyDown = (e) => {
      if (e.key === "Escape") setMobileOpen(false);
      if (e.key !== "Tab" || focusable.length === 0) return;
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };

    document.body.style.overflow = "hidden";
    drawer.addEventListener("keydown", onKeyDown);
    first?.focus();
    return () => {
      drawer.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  return (
    <div className="app-shell" data-reduced={prefersReducedMotion ? "1" : "0"}>
      {/* Left rail (desktop) */}
      <aside
        className={`sidebar ${isDesktop ? "sidebar--desktop" : "sidebar--hidden"} ${
          sidebarOpen ? "is-open" : "is-collapsed"
        }`}
        style={{ width: isDesktop ? `${sidebarWidth}px` : undefined }}
        aria-label="Primary"
      >
        {/* Brand */}
        <div className="sidebar__brand">
          {/* Put your logo here */}
          <div className="brand__logo" aria-hidden />
          <span className="brand__title">DISHA</span>
        </div>

        {/* Nav */}
        <nav className="sidebar__nav">
          {/* Add your links; icons are placeholders */}
          <button className="nav__item" type="button">
            <span className="nav__icon" />
            <span className="nav__label">Dashboard</span>
          </button>
          <button className="nav__item" type="button">
            <span className="nav__icon" />
            <span className="nav__label">Employee</span>
          </button>
          <button className="nav__item" type="button">
            <span className="nav__icon" />
            <span className="nav__label">Transaction</span>
          </button>
          <button className="nav__item" type="button">
            <span className="nav__icon" />
            <span className="nav__label">Reports</span>
          </button>
          <button className="nav__item" type="button">
            <span className="nav__icon" />
            <span className="nav__label">Master</span>
          </button>
          <button className="nav__item" type="button">
            <span className="nav__icon" />
            <span className="nav__label">Account</span>
          </button>
          <button className="nav__item" type="button">
            <span className="nav__icon" />
            <span className="nav__label">My Royalties</span>
          </button>
          <button className="nav__item" type="button">
            <span className="nav__icon" />
            <span className="nav__label">Exams & Certificates</span>
          </button>
        </nav>

        {/* Collapse toggle (desktop only) */}
        {isDesktop && (
          <div className="sidebar__footer">
            <button
              type="button"
              className="collapse-btn"
              aria-pressed={sidebarOpen ? "true" : "false"}
              aria-label={sidebarOpen ? "Collapse sidebar" : "Expand sidebar"}
              onClick={() => setSidebarOpen((v) => !v)}
            >
              <span className="collapse-btn__icon" />
            </button>
          </div>
        )}
      </aside>

      {/* Mobile drawer */}
      <div
        className={`drawer ${mobileOpen ? "is-open" : ""}`}
        role="dialog"
        aria-modal="true"
        aria-label="Mobile navigation"
      >
        <div className="drawer__backdrop" onClick={() => setMobileOpen(false)} />
        <aside className="drawer__panel" ref={drawerRef}>
          <div className="sidebar__brand">
            <div className="brand__logo" aria-hidden />
            <span className="brand__title">DISHA</span>
          </div>
          <nav className="sidebar__nav">
            {/* same items as desktop */}
            <button className="nav__item" type="button">
              <span className="nav__icon" />
              <span className="nav__label">Dashboard</span>
            </button>
            <button className="nav__item" type="button">
              <span className="nav__icon" />
              <span className="nav__label">Employee</span>
            </button>
            <button className="nav__item" type="button">
              <span className="nav__icon" />
              <span className="nav__label">Transaction</span>
            </button>
            <button className="nav__item" type="button">
              <span className="nav__icon" />
              <span className="nav__label">Reports</span>
            </button>
            <button className="nav__item" type="button">
              <span className="nav__icon" />
              <span className="nav__label">Master</span>
            </button>
            <button className="nav__item" type="button">
              <span className="nav__icon" />
              <span className="nav__label">Account</span>
            </button>
            <button className="nav__item" type="button">
              <span className="nav__icon" />
              <span className="nav__label">My Royalties</span>
            </button>
            <button className="nav__item" type="button">
              <span className="nav__icon" />
              <span className="nav__label">Exams & Certificates</span>
            </button>
          </nav>
        </aside>
      </div>

      {/* Right side: header + content */}
      <div className="main" style={{ marginLeft: isDesktop ? `${sidebarWidth}px` : 0 }}>
        <header className="topbar">
          <div className="topbar__left">
            {/* Hamburger: desktop toggles collapse, mobile opens drawer */}
            <button
              type="button"
              className="icon-btn"
              aria-label={isDesktop ? (sidebarOpen ? "Collapse sidebar" : "Expand sidebar") : "Open navigation"}
              onClick={() => (isDesktop ? setSidebarOpen((v) => !v) : setMobileOpen(true))}
            >
              <span className="icon-btn__hamburger" />
            </button>

            <div className="welcome">
              <span className="welcome__title">Welcome ADARSH SHELORE!</span>
            </div>
          </div>

          <div className="topbar__right">
            {/* Topbar icons placeholders */}
            <button className="icon-btn" aria-label="Academics">
              <span className="icon-btn__dot" />
            </button>
            <button className="icon-btn" aria-label="Messages">
              <span className="icon-btn__dot" />
            </button>
            <button className="icon-btn" aria-label="Notifications">
              <span className="icon-btn__dot" />
            </button>

            <div className="avatar">
              <div className="avatar__img" />
              <span className="avatar__status" aria-hidden />
            </div>
          </div>
        </header>

        <main className="content">
          {/* ===== Empty containers you can fill ===== */}
          <section className="cards">
            <div className="card">
              <div className="card__title">Monthly Status</div>
              <div className="card__body">
                {/* Put your filter/date input, KPIs etc. */}
              </div>
            </div>
            <div className="card">
              <div className="card__title">Daily Status</div>
              <div className="card__body">
                {/* Put your date selector, KPIs etc. */}
              </div>
            </div>
          </section>

          <section className="quick-links">
            {/* 8 quick link boxes, empty placeholders */}
            {[
              "Admission",
              "Enquiry",
              "Fees",
              "Add Expenses",
              "Task",
              "Student Reports",
              "Enquiry Reports",
              "Alloted Exam",
              "Student Attendance",
              "Print Receipt",
            ].map((label) => (
              <button key={label} className="qlink" type="button">
                <span className="qlink__icon" />
                <span className="qlink__label">{label}</span>
              </button>
            ))}
          </section>

          {/* Extra space for more sections */}
          <section className="panel">
            {/* Add tables, charts, or any components here */}
          </section>
        </main>
      </div>
    </div>
  );
}
