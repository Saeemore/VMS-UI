import React, { useState } from "react";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

const departmentData = [
  { department: "Development", value: 45, color: "#448DF4" },
  { department: "QA",          value: 20, color: "#43DE93" },
  { department: "Production",  value: 25, color: "#FFD600" },
  { department: "Sales",       value: 10, color: "#7136D0" }
];

const DepartmentVisits = () => {
  const [activePeriod, setActivePeriod] = useState("weekly");

  const chartData = {
    labels: departmentData.map((i) => i.department),
    datasets: [
      {
        data: departmentData.map((i) => i.value),
        backgroundColor: departmentData.map((i) => i.color),
        borderWidth: 0,
        cutout: "70%"
      }
    ]
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      tooltip: {
        callbacks: {
          label: (ctx) => {
            const label = ctx.label || "";
            const value = (Array.isArray(ctx.parsed) ? ctx.parsed[0] : ctx.parsed) ?? 0;
            const total = ctx.dataset.data.reduce((a, b) => a + b, 0);
            const pct = total ? Math.round((value / total) * 100) : 0;
            return `${label}: ${value} (${pct}%)`;
          }
        }
      }
    }
  };

  const totalSales = departmentData.find((i) => i.department === "Sales")?.value ?? 0;

  return (
    <div className="department-visits-card">
      <div className="department-visits-header">
        <h2 className="department-visits-title">Department Visits</h2>
        <div className="department-visits-buttons">
          <button
            className={`department-visits-button ${activePeriod === "weekly" ? "active" : ""}`}
            onClick={() => setActivePeriod("weekly")}
            type="button"
          >
            Weekly
          </button>
          <button
            className={`department-visits-button ${activePeriod === "monthly" ? "active" : ""}`}
            onClick={() => setActivePeriod("monthly")}
            type="button"
          >
            Monthly
          </button>
        </div>
      </div>

      <div className="department-visits-chart-container">
        <div style={{ width: "200px", height: "200px", position: "relative" }}>
          <Doughnut data={chartData} options={chartOptions} />
        </div>
        <div className="department-visits-center-label">
          <span className="department-visits-center-value">{totalSales}</span>
          <span className="department-visits-center-text">Sales</span>
        </div>
      </div>

      <div className="department-visits-legend">
        {departmentData.map((item) => (
          <div className="legend-item" key={item.department}>
            <span className="legend-color-box" style={{ backgroundColor: item.color }} />
            <span>{item.department}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DepartmentVisits;
