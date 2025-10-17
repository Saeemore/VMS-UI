import React, { useState } from 'react';
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

// ✨ FIX: Register the components you need right after importing them
ChartJS.register(ArcElement, Tooltip, Legend);

// Data for the department chart
const departmentData = [
  { department: "Development", value: 45, color: "#3B82F6" },
  { department: "QA", value: 20, color: "#10B981" },
  { department: "Production", value: 25, color: "#F59E0B" },
  { department: "Sales", value: 10, color: "#8B5CF6" }
];

const DepartmentVisits = () => {
    const [activePeriod, setActivePeriod] = useState('weekly');

    const chartData = {
        labels: departmentData.map(item => item.department),
        datasets: [{
            data: departmentData.map(item => item.value),
            backgroundColor: departmentData.map(item => item.color),
            borderWidth: 0,
            cutout: '60%'
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

    return (
        <aside className="right-sidebar">
            <div className="department-section">
                <h3 className="section-title">Department Visits</h3>
                <div className="toggle-buttons">
                    <button
                        className={`toggle-btn ${activePeriod === 'weekly' ? 'active' : ''}`}
                        onClick={() => setActivePeriod('weekly')}
                    >
                        Weekly
                    </button>
                    <button
                        className={`toggle-btn ${activePeriod === 'monthly' ? 'active' : ''}`}
                        onClick={() => setActivePeriod('monthly')}
                    >
                        Monthly
                    </button>
                </div>
                <div className="chart-container">
                    <Doughnut data={chartData} options={chartOptions} />
                </div>
                <div className="chart-legend">
                    {departmentData.map(item => (
                        <div className="legend-item" key={item.department}>
                            <div className="legend-label">
                                <div className="legend-color" style={{ backgroundColor: item.color }}></div>
                                <span className="legend-text">{item.department}</span>
                            </div>
                            <span className="legend-value">{item.value}</span>
                        </div>
                    ))}
                </div>
            </div>
        </aside>
    );
};

export default DepartmentVisits;