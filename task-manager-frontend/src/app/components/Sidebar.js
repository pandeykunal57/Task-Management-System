"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuth } from "../context/AuthContext";

export default function Sidebar() {
  const pathname = usePathname();
  const { user, logout } = useAuth();

  const navItems = [
    { label: "Dashboard", href: "/dashboard" },
    { label: "All Tasks", href: "/dashboard/tasks" },
    { label: "Add Task", href: "/dashboard/tasks/add" },
    ...(user?.role === "admin"
      ? [
          { label: "Analytics", href: "/dashboard/analytics" },        
          { label: "Audit Logs", href: "/dashboard/auditlogs" },
          { label: "Manage Users", href: "/dashboard/users" },
        ]
      : []),
  ];

  return (
    <aside className="w-64 min-h-screen bg-white shadow-md p-4">
      <h2 className="text-xl font-bold mb-6">Task Manager</h2>

      <nav className="space-y-2">
        {navItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={`block px-3 py-2 rounded-lg ${
              pathname === item.href
                ? "bg-green-600 text-white"
                : "text-gray-700 hover:bg-gray-100"
            }`}
          >
            {item.label}
          </Link>
        ))}

        <button
          onClick={logout}
          className="mt-6 w-full text-left px-3 py-2 bg-red-100 hover:bg-red-200 rounded-lg text-red-700"
        >
          Logout
        </button>
      </nav>
    </aside>
  );
}
