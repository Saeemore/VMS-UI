import StatCard from '../components/cards/StatCard';
import VisitorTable from '../components/tables/VisitorTable';
import ProgressRing from '../components/common/ProgressRing';
import visitors from '../data/visitors';
import { useState } from 'react';
import { useMemo, useEffect } from 'react';

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

export default function Dashboard() {
      const [searchTerm, setSearchTerm] = useState('');
  const [filteredVisitors, setFilteredVisitors] = useState(initialVisitors);

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
    <div className="dashboard-grid">
      <section className="stats">
        <StatCard label="Checked In Visitors" value={18} />
        <StatCard label="Expected Visitors" value={24} />
        <StatCard label="Scheduled Visits" value={14} />
        <StatCard label="Missed Visits" value={10} />
      </section>

     <VisitorTable visitors={filteredVisitors} onSearch={setSearchTerm} />

      <section className="split">
        <div className="card">
          <h3>Activities</h3>
          <ul className="activity">
            <li>
              Ridiculus tempus vitae lectus blandit vulputate dolor integer natoque augue. <span className="muted">7 days ago</span>
            </li>
            <li>
              Scelerisque ultrices tellus sed mattis egestas purus ut vel. <span className="muted">7 days ago</span>
            </li>
            <li>
              Turpis fringilla pellentesque adipiscing neque sit. <span className="muted">7 days ago</span>
            </li>
          </ul>
        </div>

        <div className="card">
          <div className="card-title between">
            <h3>Department Visits</h3>
            <div className="segmented">
              <button className="seg active">Weekly</button>
              <button className="seg">Monthly</button>
            </div>
          </div>
          <div className="ring-wrap">
            <ProgressRing value={10} label="Sales" />
          </div>
        </div>
      </section>
    </div>
  );
}
