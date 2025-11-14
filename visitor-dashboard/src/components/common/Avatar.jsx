// FILE: src/components/common/Avatar.jsx
import React, { useState } from 'react';

// A helper function to get initials from a name
const getInitials = (name) => {
    if (!name) return '?';
    const names = name.split(' ');
    if (names.length > 1) {
        return `${names[0][0]}${names[names.length - 1][0]}`.toUpperCase();
    }
    return name.substring(0, 2).toUpperCase();
};

const Avatar = ({ src, name, className = 'w-20 h-20' }) => {
    const [imageError, setImageError] = useState(false);

    const handleImageError = () => {
        setImageError(true);
    };

    return (
        <div className={`relative rounded-full flex items-center justify-center bg-gray-200 text-text-secondary font-bold ${className}`}>
            {!imageError && src ? (
                <img
                    src={src}
                    alt={name}
                    onError={handleImageError}
                    className="w-full h-full rounded-full object-cover"
                />
            ) : (
                <span className="text-xl">{getInitials(name)}</span>
            )}
        </div>
    );
};

export default Avatar;