



import { NavLink } from "react-router-dom";

export default function Sidebar({ role }) {
  return (
    <div className="w-64 min-h-screen bg-gradient-to-b from-[#0f172a] via-[#1e1b4b] to-[#312e81] text-white p-6 border-r border-white/10">

      {/* Title */}
      <h2 className="text-xl font-bold mb-10 bg-gradient-to-r from-purple-400 via-pink-400 to-indigo-400 bg-clip-text text-transparent">
        Excel Analytics
      </h2>

      <nav className="space-y-4">

        {/* USER ROUTES */}
        {role === "user" && (
          <>
            <NavLink
              to="/dashboard"
              className={({ isActive }) =>
                `block px-4 py-2 rounded-lg transition duration-300 ${
                  isActive
                    ? "bg-white/20 backdrop-blur-md border border-white/20"
                    : "hover:bg-white/10"
                }`
              }
            >
              📊 Upload
            </NavLink>

            <NavLink
              to="/history"
              className={({ isActive }) =>
                `block px-4 py-2 rounded-lg transition duration-300 ${
                  isActive
                    ? "bg-white/20 backdrop-blur-md border border-white/20"
                    : "hover:bg-white/10"
                }`
              }
            >
              🕘 History
            </NavLink>
          </>
        )}

        {/* ADMIN ROUTES */}
        {role === "admin" && (
          <NavLink
            to="/admin"
            className={({ isActive }) =>
              `block px-4 py-2 rounded-lg transition duration-300 ${
                isActive
                  ? "bg-white/20 backdrop-blur-md border border-white/20"
                  : "hover:bg-white/10"
              }`
            }
          >
            👑 User Management
          </NavLink>
        )}

      </nav>
    </div>
  );
}
