// import React, { useMemo, useEffect, useState } from "react";
// import "../styles/Dashboard.css";
// import Sidebar from "../components/Sidebar";
// import HeaderStats from "../components/HeaderStats";
// import Activities from "../components/Activities";
// import VisitorHistory from "../components/VisitorHistory";
// import DepartmentVisits from "../components/DepartmentVisits";
// import Header from "../components/Header";
// import { useDrawer } from "../hooks/useDrawer";
// const activitiesData = [
//   { text: "Ridiculus tempus vitae lectus blandit vulputate dolor integer natoque augue.", timeAgo: "7 days ago", icon: "&#128172;" },
//   { text: "Scelerisque ultrices tellus tellus sed mattis egestas purus ut vel.", timeAgo: "7 days ago", icon: "&#128100;" },
//   { text: "Turpis fringilla pellentesque adipiscing neque sit.", timeAgo: "7 days ago", icon: "&#128052;" },
//   { text: "Massa viverra sed arcu scelerisque malesuada.", timeAgo: "7 days ago", icon: "&#128054;" },
//   { text: "Vestibulum lobortis nunc duis tortor malesuada lacinia magna proin.", timeAgo: "7 days ago", icon: "&#128118;" },
//   { text: "Felis pellentesque morbi nunc non enim, tincidunt maecenas.", timeAgo: "7 days ago", icon: "&#128008;" }
// ];

// const initialVisitors = [
//   {
//     id: 1,
//     name: "John Doe",
//     email: "john.doe@gmail.com",
//     visiting: "John Smith",
//     visitingrole: "Developer Lead",
//     purpose: "Delivery Service",
//     purposecolor: "green",
//     checkin: "24/10/2025 5:00 PM",
//     checkout: "24/10/2025 5:00 PM",
//     avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=faces"
//   },
//   {
//     id: 2,
//     name: "Alicia Ray",
//     email: "alicia.ray@gmail.com",
//     visiting: "John Smith",
//     visitingrole: "Developer Lead",
//     purpose: "Delivery Service",
//     purposecolor: "green",
//     checkin: "24/10/2025 5:00 PM",
//     checkout: "24/10/2025 5:00 PM",
//     avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b147?w=40&h=40&fit=crop&crop=faces"
//   },
//   {
//     id: 3,
//     name: "Kate Hunington",
//     email: "kate.hunington@gmail.com",
//     visiting: "Jane Doe",
//     visitingrole: "IT Director",
//     purpose: "Enquiry",
//     purposecolor: "blue",
//     checkin: "24/10/2025 5:00 PM",
//     checkout: "24/10/2025 5:00 PM",
//     avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=40&h=40&fit=crop&crop=faces"
//   }
// ];

// const debounce = (fn, delay) => {
//   let t;
//   return (...args) => {
//     clearTimeout(t);
//     t = setTimeout(() => fn(...args), delay);
//   };
// };

// const Dashboard = ({ pageType ="dashboard" }) => {
//   const [searchTerm, setSearchTerm] = useState("");
//   const [filteredVisitors, setFilteredVisitors] = useState(initialVisitors);
//   const [isSidebarOpen, setIsSidebarOpen] = useState(false);
//   // const [showMissedVisits, setShowMissedVisits] = useState(false);
//   const { open } = useDrawer();

//    const handleViewDetails = (key, openerEl) => {
//     // key will be 'missedVisits' | 'expectedVisitors' | 'checkedIn' | 'scheduled'
//     open(key, { opener: openerEl });
//   };

//   const toggleSidebar = () => setIsSidebarOpen((v) => !v);
//   const closeSidebar = () => setIsSidebarOpen(false);

//   const debouncedSearch = useMemo(
//     () =>
//       debounce((term) => {
//         const lower = term.trim().toLowerCase();
//         if (!lower) return setFilteredVisitors(initialVisitors);
//         setFilteredVisitors(
//           initialVisitors.filter(
//             (v) =>
//               v.name.toLowerCase().includes(lower) ||
//               v.email.toLowerCase().includes(lower) ||
//               v.visiting.toLowerCase().includes(lower) ||
//               v.purpose.toLowerCase().includes(lower)
//           )
//         );
//       }, 250),
//     []
//   );

//   useEffect(() => {
//     debouncedSearch(searchTerm);
//   }, [searchTerm, debouncedSearch]);

//   return (
//     <>
//       {/* If this page needs search in the header, pass down via a Header control bar or add a local search input */}
//       <HeaderStats onViewDetails={handleViewDetails} />
//       <div className="main-layout">
//         <VisitorHistory title="Recent Visitor History" visitors={filteredVisitors} onSearch={setSearchTerm} />
//         <div className="side-by-side">
//           <Activities activitiesData={activitiesData} />
//           <DepartmentVisits />
//         </div>
//       </div>
//     </>
//   );
// };

// export default Dashboard;





import React, { useMemo, useEffect, useState } from "react";
import "../styles/Dashboard.css";
// Sidebar is NOT imported here, it's in the parent layout
import HeaderStats from "../components/HeaderStats";
import Activities from "../components/Activities";
import VisitorHistory from "../components/VisitorHistory";
import DepartmentVisits from "../components/DepartmentVisits";
import Header from "../components/Header";
import { useDrawer } from "../hooks/useDrawer";

// --- Your data and helper functions (unchanged) ---
const activitiesData = [
  { text: "Ridiculus tempus vitae lectus blandit vulputate dolor integer natoque augue.", timeAgo: "7 days ago", icon: "&#128172;" },
  { text: "Scelerisque ultrices tellus tellus sed mattis egestas purus ut vel.", timeAgo: "7 days ago", icon: "&#128100;" },
  { text: "Turpis fringilla pellentesque adipiscing neque sit.", timeAgo: "7 days ago", icon: "&#128052;" },
  { text: "Massa viverra sed arcu scelerisque malesuada.", timeAgo: "7 days ago", icon: "&#128054;" },
  { text: "Vestibulum lobortis nunc duis tortor malesuada lacinia magna proin.", timeAgo: "7 days ago", icon: "&#128118;" },
  { text: "Felis pellentesque morbi nunc non enim, tincidunt maecenas.", timeAgo: "7 days ago", icon: "&#128008;" }
];

const initialVisitors = [
  {
    id: 1,
    name: "John Doe",
    email: "john.doe@gmail.com",
    visiting: "John Smith",
    visitingrole: "Developer Lead",
    purpose: "Delivery Service",
    purposecolor: "green",
    checkin: "24/10/2025 5:00 PM",
    checkout: "24/10/2025 5:00 PM",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=faces"
  },
  {
    id: 2,
    name: "Alicia Ray",
    email: "alicia.ray@gmail.com",
    visiting: "John Smith",
    visitingrole: "Developer Lead",
    purpose: "Delivery Service",
    purposecolor: "green",
    checkin: "24/10/2025 5:00 PM",
    checkout: "24/10/2025 5:00 PM",
    avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b147?w=40&h=40&fit=crop&crop=faces"
  },
  {
    id: 3,
    name: "Kate Hunington",
    email: "kate.hunington@gmail.com",
    visiting: "Jane Doe",
    visitingrole: "IT Director",
    purpose: "Enquiry",
    purposecolor: "blue",
    checkin: "24/10/2025 5:00 PM",
    checkout: "24/10/2025 5:00 PM",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=40&h=40&fit=crop&crop=faces"
  }
];

const debounce = (fn, delay) => {
  let t;
  return (...args) => {
    clearTimeout(t);
    t = setTimeout(() => fn(...args), delay);
  };
};

// 1. Accept 'pageType' as a prop. Default to 'dashboard' if none is provided.
const Dashboard = ({ pageType = "dashboard" }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredVisitors, setFilteredVisitors] = useState(initialVisitors);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { open } = useDrawer();

  const handleViewDetails = (key, openerEl) => {
    open(key, { opener: openerEl });
  };

  // NEW: open drawer specifically for a visitor row (uses same drawer infra)
  const handleVisitorClick = (row, openerEl) => {
    // replace "visitor.details" with your actual drawer key if different
    open("visitor.details", { data: row, opener: openerEl });
  };

  const toggleSidebar = () => setIsSidebarOpen((v) => !v);
  const closeSidebar = () => setIsSidebarOpen(false);

  // --- Your search logic (unchanged) ---
  const debouncedSearch = useMemo(
    () =>
      debounce((term) => {
        const lower = term.trim().toLowerCase();
        if (!lower) return setFilteredVisitors(initialVisitors);
        setFilteredVisitors(
          initialVisitors.filter(
            (v) =>
              v.name.toLowerCase().includes(lower) ||
              v.email.toLowerCase().includes(lower) ||
              v.visiting.toLowerCase().includes(lower) ||
              v.purpose.toLowerCase().includes(lower)
          )
        );
    }, 250),
    []
  );

  useEffect(() => {
    debouncedSearch(searchTerm);
  }, [searchTerm, debouncedSearch]);

  // 2. Conditionally set the table title
  const tableTitle =
    pageType === "security" ? "Recent Visitor History" : "Today's Visits";

  return (
    <>
      {/* 3. Pass the pageType prop down to HeaderStats */}
      <HeaderStats onViewDetails={handleViewDetails} pageType={pageType} />
      <div className="main-layout">
        {/* 4. Use the dynamic tableTitle */}
        <VisitorHistory
          title={tableTitle}
          visitors={filteredVisitors}
          onSearch={setSearchTerm}
          onVisitorClick={handleVisitorClick}  
        />
        {/* 5. Conditionally render these sections */}
        {/* They will HIDE if pageType is 'security' */}
        {pageType !== "security" && (
          <div className="side-by-side">
            <Activities activitiesData={activitiesData} />
            <DepartmentVisits />
          </div>
        )}
      </div>
    </>
  );
};

export default Dashboard;
