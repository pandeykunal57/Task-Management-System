"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuth } from "../context/AuthContext";

export default function Sidebar() {
  const pathname = usePathname();
  const { user, logout } = useAuth();

  const navItems = [
    { label: "Dashboard", href: "/dashboard" },
    { label: "Tasks", href: "/dashboard/tasks" },
    ...(user?.role === "admin"
       ? [{ label: "Audit Logs", href: "/dashboard/auditlogs" }]
      : []),
  ];

  return (
    <aside className="w-64 min-h-screen bg-white shadow-md p-4">
      

      <nav className="space-y-2">
        {navItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={`block px-3 py-2 rounded-lg ${
              pathname === item.href
                ? "bg-green-600 text-white mt-20"
                : "text-gray-700 hover:bg-gray-100 mt-10"
            }`}
          >
            {item.label}
          </Link>
        ))}
        <button
          onClick={logout}
          className="mt-10 w-full text-left px-3 py-2 bg-red-100 hover:bg-red-200 rounded-lg text-red-700"
        >
          Logout
        </button>
      </nav>
    </aside>
  );
}
