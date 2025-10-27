import React, { useState, useEffect, useMemo } from 'react';

// Import all your components
import Sidebar from './components/Sidebar';
import HeaderStats from './components/HeaderStats';
import Activities from './components/Activities';
import VisitorHistory from './components/VisitorHistory';
import DepartmentVisits from './components/DepartmentVisits';
import Header from './components/Header';
const activitiesData = [
  { text: "Ridiculus tempus vitae lectus blandit vulputate dolor integer natoque augue.", timeAgo: "7 days ago", icon: "&#128172;" }, // Speech Balloon
  { text: "Scelerisque ultrices tellus tellus sed mattis egestas purus ut vel.", timeAgo: "7 days ago", icon: "&#128100;" }, // Bust in Silhouette
  { text: "Turpis fringilla pellentesque adipiscing neque sit.", timeAgo: "7 days ago", icon: "&#128052;" }, // Reindeer
  { text: "Massa viverra sed arcu scelerisque malesuada.", timeAgo: "7 days ago", icon: "&#128054;" }, // Dog Face
  { text: "Vestibulum lobortis nunc duis tortor malesuada lacinia magna proin.", timeAgo: "7 days ago", icon: "&#128118;" }, // Man Wearing Turban
  { text: "Felis pellentesque morbi nunc non enim, tincidunt maecenas.", timeAgo: "7 days ago", icon: "&#128008;" }, // Cat Face
];

const initialVisitors = [
  { id: 1, name: "John Doe", email: "john.doe@gmail.com", visiting: "John Smith", visiting_role: "Developer Lead", purpose: "Delivery Service", purpose_color: "green", check_in: "24/10/2025 5:00 PM", check_out: "24/10/2025 5:00 PM", avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face" },
  { id: 2, name: "Alicia Ray", email: "alicia.ray@gmail.com", visiting: "John Smith", visiting_role: "Developer Lead", purpose: "Delivery Service", purpose_color: "green", check_in: "24/10/2025 5:00 PM", check_out: "24/10/2025 5:00 PM", avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b147?w=40&h=40&fit=crop&crop=face" },
  { id: 3, name: "Kate Hunington", email: "kate.hunington@gmail.com", visiting: "Jane Doe", visiting_role: "IT Director", purpose: "Enquiry", purpose_color: "blue", check_in: "24/10/2025 5:00 PM", check_out: "24/10/2025 5:00 PM", avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=40&h=40&fit=crop&crop=face" }
];

function debounce(func, delay) {
  let timeout;
  return function(...args) {
    clearTimeout(timeout);
    timeout = setTimeout(() => func.apply(this, args), delay);
  };
}

function App() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredVisitors, setFilteredVisitors] = useState(initialVisitors);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const debouncedSearch = useMemo(() => debounce((term) => {
    if (!term) {
      setFilteredVisitors(initialVisitors);
    } else {
      const lowercasedTerm = term.toLowerCase();
      const filtered = initialVisitors.filter(visitor =>
        visitor.name.toLowerCase().includes(lowercasedTerm) ||
        visitor.email.toLowerCase().includes(lowercasedTerm) ||
        visitor.visiting.toLowerCase().includes(lowercasedTerm) ||
        visitor.purpose.toLowerCase().includes(lowercasedTerm)
      );
      setFilteredVisitors(filtered);
    }
  }, 300), []);

  useEffect(() => {
    debouncedSearch(searchTerm);
  }, [searchTerm, debouncedSearch]);

  return (
    // Use Flexbox for the main layout
    <div className="flex min-h-screen">
      <Sidebar isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />

      {/* Main content area that grows to fill the space */}
      <main className={`flex-1 p-4 md:p-8 ${isSidebarOpen ? 'main-content-shifted' : ''}`}>
        <div className="dashboard-container">
        <Header />
          <HeaderStats />
          <div className="main-layout">
            <VisitorHistory visitors={filteredVisitors} onSearch={setSearchTerm} />
            {/* <Activities activitiesData={activitiesData} /> */}
            {/* <DepartmentVisits /> */}
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;