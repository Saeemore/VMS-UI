import React, { useState } from 'react';
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

// ✨ FIX: Register the components you need right after importing them
ChartJS.register(ArcElement, Tooltip, Legend);

// Data for the department chart
const departmentData = [
  { department: "Development", value: 45, color: "#448DF4" },
  { department: "QA", value: 20, color: "#43DE93" },
  { department: "Production", value: 25, color: "#FFD600" },
  { department: "Sales", value: 10, color: "#7136D0" }
];

const DepartmentVisits = () => {
    const [activePeriod, setActivePeriod] = useState('weekly');

    const chartData = {
        labels: departmentData.map(item => item.department),
        datasets: [{
            data: departmentData.map(item => item.value),
            backgroundColor: departmentData.map(item => item.color),
            borderWidth: 0,
            cutout: '70%' // Adjusted cutout to match the image
        }]
    };

    const chartOptions = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                display: false
            },
            tooltip: {
                callbacks: {
                    label: function (context) {
                        const label = context.label || '';
                        const value = context.parsed || 0;
                        const total = context.dataset.data.reduce((a, b) => a + b, 0);
                        const percentage = Math.round((value / total) * 100);
                        return `${label}: ${value} (${percentage}%)`;
                    }
                }
            }
        }
    };

    // Calculate total sales for the center label
    const totalSales = departmentData.find(item => item.department === "Sales")?.value || 0;

    return (
        <div className="department-visits-card">
            <div className="department-visits-header">
                <h2 className="department-visits-title">Department Visits</h2>
                <div className="department-visits-buttons">
                    <button
                        className={`department-visits-button ${activePeriod === 'weekly' ? 'active' : ''}`}
                        onClick={() => setActivePeriod('weekly')}
                    >
                        Weekly
                    </button>
                    <button
                        className={`department-visits-button ${activePeriod === 'monthly' ? 'active' : ''}`}
                        onClick={() => setActivePeriod('monthly')}
                    >
                        Monthly
                    </button>
                </div>
            </div>
            <div className="department-visits-chart-container">
                <Doughnut data={chartData} options={chartOptions} />
                <div className="department-visits-center-label">
                    <span className="department-visits-center-value">{totalSales}</span>
                    <span className="department-visits-center-text">Sales</span>
                </div>
            </div>
            <div className="department-visits-legend">
                {departmentData.map(item => (
                    <div className="legend-item" key={item.department}>
                        <span className="legend-color-box" style={{ backgroundColor: item.color }}></span>
                        <span>{item.department}</span>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default DepartmentVisits;