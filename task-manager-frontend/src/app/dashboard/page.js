// frontend/src/app/dashboard/page.js
'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '../context/AuthContext'; // ✅ use the hook, not context directly
import ProtectedRoute from '../components/ProtectedRoute'; // ✅ wrap UI in auth guard

export default function DashboardPage() {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.push('/login'); // Redirect unauthenticated users to login
    }
  }, [user, loading, router]);

  if (loading) return <div className="text-center mt-10">Loading...</div>;

  return (
    <ProtectedRoute>
      <div className="min-h-screen p-6 bg-gray-100">
        <h1 className="text-3xl font-bold mb-4">Welcome to the Dashboard</h1>
        <p className="text-lg text-gray-700 mb-4">
          Hello, <span className="font-semibold">{user?.email}</span>! You are logged in as <b>{user?.role}</b>.
        </p>

        {/* Role-based content */}
        {user?.role === 'admin' ? (
          <div className="bg-white p-4 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-2 text-blue-700">Admin Panel</h2>
            <ul className="list-disc list-inside text-gray-700 space-y-1">
              <li>Manage all tasks</li>
              <li>View all users</li>
              <li>View system logs</li>
            </ul>
          </div>
        ) : (
          <div className="bg-white p-4 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-2 text-green-700">User Dashboard</h2>
            <ul className="list-disc list-inside text-gray-700 space-y-1">
              <li>View your tasks</li>
              <li>Update your profile</li>
              <li>Track your progress</li>
            </ul>
          </div>
        )}
      </div>
    </ProtectedRoute>
  );
}
