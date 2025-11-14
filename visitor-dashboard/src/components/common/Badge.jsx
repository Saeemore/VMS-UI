// FILE: src/components/common/Badge.js
import React from 'react';

const Badge = ({ status }) => {
    const statusStyles = {
        AWAITING_APPROVAL: 'bg-yellow-100 text-yellow-800',
        SCHEDULED: 'bg-blue-100 text-blue-800',
        APPROVED: 'bg-green-100 text-green-800',
        CHECKED_IN: 'bg-teal-100 text-teal-800',
        CHECKED_OUT: 'bg-gray-100 text-gray-800',
        REJECTED: 'bg-red-100 text-red-800',
    };

    return (
        <span className={`px-3 py-1 text-sm font-medium rounded-full ${statusStyles[status] || 'bg-gray-100 text-gray-800'}`}>
            {status.replace('_', ' ')}
        </span>
    );
};

export default Badge;