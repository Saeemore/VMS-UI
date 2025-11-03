import React from "react";
import { RefreshCcw, Search } from "lucide-react";

const visits = [
  {
    id: 1,
    name: "John Doe",
    visiting: "Sneha S",
    date: "23 Jul 25 at 4:00 PM",
    image: "https://randomuser.me/api/portraits/men/32.jpg",
  },
  {
    id: 2,
    name: "John Doe",
    visiting: "Sneha S",
    date: "23 Jul 25 at 4:00 PM",
    image: "https://randomuser.me/api/portraits/women/44.jpg",
  },
  {
    id: 3,
    name: "John Doe",
    visiting: "Sneha S",
    date: "23 Jul 25 at 4:00 PM",
    image: "https://randomuser.me/api/portraits/women/47.jpg",
  },
  {
    id: 4,
    name: "John Doe",
    visiting: "Sneha S",
    date: "23 Jul 25 at 4:00 PM",
    image: "https://randomuser.me/api/portraits/men/31.jpg",
  },
];

export default function MissedVisits() {
  return (
    <div className="flex flex-col bg-white rounded-lg w-[492px] h-[1024px] p-6 gap-2">
      <h1 className="text-2xl font-semibold text-gray-900 mb-4">
        Missed Visits
      </h1>

      {/* Search Bar */}
      <div className="relative w-full mb-4">
        <Search className="absolute left-3 top-3 text-gray-400" size={20} />
        <input
          type="text"
          placeholder="Search Anything ..."
          className="w-full pl-10 pr-4 py-2 rounded-lg bg-gray-100 text-gray-600 placeholder-gray-400 outline-none"
        />
      </div>

      {/* Visits List */}
      <div className="flex flex-col gap-6 w-full">
        {visits.map((visit) => (
          <div
            key={visit.id}
            className="flex items-center justify-between w-full"
          >
            {/* Left - Profile + Details */}
            <div className="flex items-center gap-4">
              <img
                src={visit.image}
                alt={visit.name}
                className="w-14 h-14 rounded-full object-cover"
              />
              <div>
                <p className="text-lg font-semibold text-gray-800">
                  {visit.name}
                </p>
                <p className="text-gray-500 text-sm">
                  Visiting {visit.visiting}
                </p>
                <p className="text-gray-500 text-sm">On {visit.date}</p>
              </div>
            </div>

            {/* Right - Button */}
            <button className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-xl text-sm font-medium transition-all">
              <RefreshCcw size={18} />
              Reschedule
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
