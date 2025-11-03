// src/pages/ManageVisitors.jsx (content under AppLayout)
import React, { useMemo, useEffect, useState } from "react";
import VisitorHistory from "../components/VisitorHistory";

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
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=faces",
    company: "Acme Inc",
    status:'checked-out'
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
    avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b147?w=40&h=40&fit=crop&crop=faces",
    company: "Orbit Labs",
    status:'checked-out'
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
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=40&h=40&fit=crop&crop=faces",
    company: "Globex",
    status:'checked-out'
  },
];

// simple debounce
const debounce = (fn, delay) => { let t; return (...a)=>{ clearTimeout(t); t=setTimeout(()=>fn(...a), delay); }; };

export default function ManageVisitors() {
  const [searchTerm, setSearchTerm] = useState("");
  const [rows, setRows] = useState(initialVisitors);

  const debouncedFilter = useMemo(() =>
    debounce((term) => {
      const q = term.trim().toLowerCase();
      if (!q) return setRows(initialVisitors);
      setRows(
        initialVisitors.filter((r) =>
          [r.name, r.email, r.visiting, r.purpose, r.company]
            .filter(Boolean)
            .some((v) => String(v).toLowerCase().includes(q))
        )
      );
    }, 250),
  []);

  useEffect(() => { debouncedFilter(searchTerm); }, [searchTerm, debouncedFilter]);

  // Custom columns demo (you can use defaults by omitting this prop)
  const columns = [
    {
      key: "visitor",
      header: "Visitor",
      width: 280,
      render: (r) => (
        <div className="visitor-cell">
          <img className="visitor-avatar" src={r.avatar} alt="" />
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
      render: (r) => <span className={`purpose-badge ${r.purposecolor}`}>{r.purpose}</span>,
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
      render: (r) => <div className="time-cell">{r.status || "-"}</div>,
    },
  ];

  const handleRowAction = (action, row) => {
    if (action === "view") {
      // open side drawer or detail modal
      console.log("View", row);
    } else if (action === "edit") {
      // open edit modal
      console.log("Edit", row);
    } else if (action === "delete") {
      // confirm then delete
      console.log("Delete", row);
    }
  };

  return (
    <>
      <VisitorHistory
        title="All Visitors"
        visitors={rows}
        onSearch={setSearchTerm}
        /* show the Add button */
        showAddButton
        onAdd={() => console.log("Add New clicked")}
        addButtonText="Add New"
        /* custom columns (omit this prop to use defaults) */
        columns={columns}
        /* compact three-dots menu on the right; opens to the left */
        showRowMenu
        onRowAction={handleRowAction}
      />
    </>
  );
}
