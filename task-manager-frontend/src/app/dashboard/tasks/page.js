'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '../../context/AuthContext';
import ProtectedRoute from '../../components/ProtectedRoute';


export default function TasksPage() {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.push('/login'); // redirect if not logged in
    }
  }, [user, loading, router]);

  if (loading) return <div className="text-center mt-10">Loading...</div>;

  return (
    <ProtectedRoute>
  
      <div className="min-h-screen p-6 bg-gray-50">
        <h1 className="text-2xl font-bold mb-4">Tasks</h1>

        <p className="text-gray-600 mb-4">
          Here you'll see tasks assigned to you ({user?.email}) — based on your role: <b>{user?.role}</b>.
        </p>

        <div className="border border-dashed border-gray-300 p-4 rounded-lg text-gray-500">
          📌 Task list will appear here soon (from mock API).
        </div>
      </div>
    </ProtectedRoute>
  );
}
