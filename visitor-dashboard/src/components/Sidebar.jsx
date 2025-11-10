// import React from "react";
// import { Home, Mail, Users, Shield, Settings, ChevronLeft, ChevronRight } from "lucide-react";
// import { NavLink } from "react-router-dom";
// import visitordeskicon from "../assets/visitor-desk-icon.svg";
// import visitordesktext from "../assets/text.svg";

// const Sidebar = ({ isSidebarOpen, toggleSidebar }) => {
//   return (
//     <div
//       className={`sidebar ${isSidebarOpen ? "open w-56" : "hidden-mobile w-16"}`}
//       aria-label="Main sidebar"
//     >
//       {/* Desktop edge toggle remains */}
//       <button
//         onClick={toggleSidebar}
//         aria-label={isSidebarOpen ? "Collapse sidebar" : "Expand sidebar"}
//         title={isSidebarOpen ? "Collapse" : "Expand"}
//         style={{
//           position: "absolute",
//           top: "5rem",
//           right: 0,
//           transform: "translate(50%, -50%)",
//           zIndex: 1001,
//           width: 35,
//           height: 35,
//           paddingRight:5,
//           borderRadius: 50,
//           background: "#ffffff",
//           color: "#325CF3",
//           display: "flex",
//           alignItems: "center",
//           justifyContent: "center",
//           boxShadow: "0 4px 10px rgba(0,0,0,0.25)",
//           border: "none",
//           cursor: "pointer"
//         }}
//         type="button"
//       >
//         {isSidebarOpen ? <ChevronLeft size={20} /> : <ChevronRight size={20} />}
//       </button>

//       <div className="logo flex items-center justify-center mb-10 px-3 pt-10">
//         <img
//           src={visitordeskicon}
//           alt="Visitordesk icon"
//           className="shrink-0"
//           style={{ height: "32px", width: "auto" }}
//         />
//         <img
//           src={visitordesktext}
//           alt="Visitordesk"
//           className={isSidebarOpen ? "block" : "hidden"}
//           style={{ height: "36px", width: "auto", marginLeft: "12px" }}
//         />
//       </div>

//       <nav className="flex-1" aria-label="Primary">
//         <ul className="space-y-2 px-2">
//           <li>
//             <NavLink to="/" end style={{ textDecoration: "none" }} className={({ isActive }) => `nav-item${isActive ? " active" : ""}`} title="Dashboard">
//               <Home size={20} className="shrink-0" />
//               <span className={isSidebarOpen ? "label" : "label hidden"}>Dashboard</span>
//             </NavLink>
//           </li>
//           {/* <li>
//             <NavLink to="/inbox" style={{ textDecoration: "none" }} className={({ isActive }) => `nav-item${isActive ? " active" : ""}`} title="Inbox">
//               <Mail size={20} className="shrink-0" />
//               <span className={isSidebarOpen ? "label" : "label hidden"}>Inbox</span>
//             </NavLink>
//           </li> */}
//           <li>
//             <NavLink to="/manage-visitors" style={{ textDecoration: "none" }} className={({ isActive }) => `nav-item${isActive ? " active" : ""}`} title="Manage Visitors">
//               <Users size={20} className="shrink-0" />
//               <span className={isSidebarOpen ? "label" : "label hidden"}>Manage Visitors</span>
//             </NavLink>
//           </li>
//           <li>
//             <NavLink to="/security" style={{ textDecoration: "none" }} className={({ isActive }) => `nav-item${isActive ? " active" : ""}`} title="Security">
//               <Shield size={20} className="shrink-0" />
//               <span className={isSidebarOpen ? "label" : "label hidden"}>Security</span>
//             </NavLink>
//           </li>
//         </ul>
//       </nav>

//       <div className="mt-auto px-2 pb-4">
//         <NavLink to="/settings" style={{ textDecoration: "none" }} className={({ isActive }) => `nav-item${isActive ? " active" : ""}`} title="Settings">
//           <Settings size={20} className="shrink-0" />
//           <span className={isSidebarOpen ? "label" : "label hidden"}>Settings</span>
//         </NavLink>
//       </div>
//     </div>
//   );
// };

// export default Sidebar;










import React from "react";
// 1. Make sure useLocation and NavLink are imported
import { NavLink, useLocation } from "react-router-dom";

// 2. Make sure ALL your icons are on ONE line
import { 
  Home, 
  Mail, 
  Users, 
  Shield, 
  Settings, 
  ChevronLeft, 
  ChevronRight, 
  QrCode 
} from "lucide-react";
import visitordeskicon from "../assets/visitor-desk-icon.svg";
import visitordesktext from "../assets/text.svg";

const Sidebar = ({ isSidebarOpen, toggleSidebar }) => {
  // 3. Get the current page's location
  const location = useLocation();

  // 4. THIS IS THE MAIN FIX
  // We check if the path is EITHER /security OR /scan-pass
  const isSecurityModule =
    location.pathname === "/security" || location.pathname === "/scan-pass";

  return (
    <div
      className={`sidebar ${
        isSidebarOpen ? "open w-56" : "hidden-mobile w-16"
      }`}
      aria-label="Main sidebar"
    >
      {/* --- Toggle Button (unchanged) --- */}
     <button
        onClick={toggleSidebar}
        aria-label={isSidebarOpen ? "Collapse sidebar" : "Expand sidebar"}
        title={isSidebarOpen ? "Collapse" : "Expand"}
        style={{
          position: "absolute",
          top: "5rem",
          right: 0,
          transform: "translate(50%, -50%)",
          zIndex: 1001,
          width: 35, // Keep width and height for a square
          height: 35, // Keep width and height for a square
          padding: 0, // REMOVE PADDING (especially paddingRight)
          borderRadius: 8, // Make it a square with slightly rounded corners
          background: "#ffffff",
          color: "#325CF3",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          boxShadow: "0 4px 10px rgba(0,0,0,0.25)",
          border: "none",
          cursor: "pointer",
        }}
        type="button"
      >
        {isSidebarOpen ? <ChevronLeft size={20} /> : <ChevronRight size={20} />}
      </button>

      {/* --- Logo (unchanged) --- */}
      <div className="logo flex items-center justify-center mb-10 px-3 pt-10">
        <img
          src={visitordeskicon}
          alt="Visitordesk icon"
          className="shrink-0"
          style={{ height: "32px", width: "auto" }}
        />
        <img
          src={visitordesktext}
          alt="Visitordesk"
          className={isSidebarOpen ? "block" : "hidden"}
          style={{ height: "36px", width: "auto", marginLeft: "12px" }}
        />
      </div>

      <nav className="flex-1" aria-label="Primary">
        <ul className="space-y-2 px-2">
          {/* 5. Use the new isSecurityModule variable for logic */}
      _     {isSecurityModule ? (
            // --- IF IN SECURITY MODULE: Show only Security & Scan Pass ---
            <>
              <li>
                <NavLink
                  to="/security"
                  style={{ textDecoration: "none" }}
                  className={({ isActive }) =>
                    `nav-item${isActive ? " active" : ""}`
                  }
                  title="Security"
                >
                  <Shield size={20} className="shrink-0" />
                  <span className={isSidebarOpen ? "label" : "label hidden"}>
                    Security
                  </span>
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/scan-pass"
                  style={{ textDecoration: "none" }}
                  className={({ isActive }) =>
                    `nav-item${isActive ? " active" : ""}`
                  }
                  title="Scan Pass"
                >
                  <QrCode size={20} className="shrink-0" />
                  <span className={isSidebarOpen ? "label" : "label hidden"}>
                    Scan Pass
                  </span>
_               </NavLink>
              </li>
            </>
          ) : (
            // --- ELSE: Show the normal links ---
            <>
              <li>
                <NavLink
                  to="/"
          _       end
                  style={{ textDecoration: "none" }}
                  className={({ isActive }) =>
                    `nav-item${isActive ? " active" : ""}`
                  }
                  title="Dashboard"
                >
    	           <Home size={20} className="shrink-0" />
                  <span className={isSidebarOpen ? "label" : "label hidden"}>
                    Dashboard
              	 </span>
          	     </NavLink>
              </li>
              <li>
              	 <NavLink
                  to="/manage-visitors"
                  style={{ textDecoration: "none" }}
            t     className={({ isActive }) =>
                    `nav-item${isActive ? " active" : ""}`
          	       }
            	     title="Manage Visitors"
          	 	 >
          	 	   <Users size={20} className="shrink-0" />
            	 	   <span className={isSidebarOpen ? "label" : "label hidden"}>
                	   Manage Visitors
            	 	   </span>
          	 	 </NavLink>
          	 </li>
        	 	 <li>
          	 	   <NavLink
            	 	     to="/security"
            	 	     style={{ textDecoration: "none" }}
            	 	     className={({ isActive }) =>
      	       	       `nav-item${isActive ? " active" : ""}`
          	 	       }
  	       	 	     title="Security"
    	     	 	 >
        	 	 	   <Shield size={20} className="shrink-0" />
    	     	 	 	 <span className={isSidebarOpen ? "label" : "label hidden"}>
  	     	 	 	   f   Security
    	     	 	   </span>
  	     	 	 	 </NavLink>
    	   	 	 </li>
          	 </>
          	)}
        </ul>
      </nav>

      {/* --- Settings Link (unchanged) --- */}
      <div className="mt-auto px-2 pb-4">
        <NavLink
          to="/settings"
          style={{ textDecoration: "none" }}
          className={({ isActive }) => `nav-item${isActive ? " active" : ""}`}
          title="Settings"
        >
          <Settings size={20} className="shrink-0" />
          <span className={isSidebarOpen ? "label" : "label hidden"}>
            Settings
          </span>
        </NavLink>
      </div>
    </div>
  );
};

export default Sidebar;