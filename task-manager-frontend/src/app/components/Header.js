"use client";

import Link from "next/link";
import { useAuth } from "../context/AuthContext";

export default function Header() {
  const { user, logout } = useAuth();

  if (!user) return null; // Hide header if not logged in

  return (
    <header className="bg-white shadow-md py-4 px-6 flex justify-between items-center">
      <div className="text-xl font-bold text-green-700">
        TaskManager
      </div>

      <nav className="flex items-center space-x-4">
        <span className="text-gray-700 text-sm">
          👤 {user.email} ({user.role})
        </span>

        <Link href="/dashboard" className="text-sm hover:underline">
          Dashboard
        </Link>

        <button
          onClick={logout}
          className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded text-sm"
        >
          Logout
        </button>
      </nav>
    </header>
  );
}
