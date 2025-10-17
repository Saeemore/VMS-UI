import { FaEnvelope, FaUserShield, FaUsersCog, FaCog, FaHome } from "react-icons/fa";

export default function Sidebar() {
  return (
    <div className="bg-custom-blue text-white w-64 min-h-screen flex flex-col p-4">
      {/* Brand name */}
      <h1 className="text-2xl font-semibold mb-8">ESTMAC</h1>

      {/* Navigation links */}
      <nav className="space-y-3 flex-1">
        <a href="#" className="flex items-center gap-3 p-2 text-custom-blue rounded-md bg-white font-semibold">
          <FaHome /> Dashboard
        </a>
        <a href="#" className="flex items-center gap-3 p-2 hover:bg-white/20 rounded-md">
          <FaEnvelope /> Inbox
        </a>
        <a href="#" className="flex items-center gap-3 p-2 hover:bg-white/20 rounded-md">
          <FaUsersCog /> Manage Visitors
        </a>
        <a href="#" className="flex items-center gap-3 p-2 hover:bg-white/20 rounded-md">
          <FaUserShield /> Security
        </a>
      </nav>

      {/* Settings at bottom */}
      <div className="mt-auto">
        <a href="#" className="flex items-center gap-3 p-2 hover:bg-white/20 rounded-md">
          <FaCog /> Settings
        </a>
      </div>
    </div>
  );
}
