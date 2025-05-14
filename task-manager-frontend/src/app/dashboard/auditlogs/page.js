'use client';

import { useEffect, useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useRouter } from 'next/navigation';
import ProtectedRoute from '../../components/ProtectedRoute';


export default function AuditLogsPage() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const [logs, setLogs] = useState([]);

  useEffect(() => {
    if (!loading && user?.role !== 'admin') {
      router.push('/dashboard'); // Non-admins redirected
    }

    // Simulate mock audit logs (will be replaced with API later)
    const mockLogs = [
      { id: 1, action: 'User created task', timestamp: '2025-05-14 09:00', performedBy: 'user1@example.com' },
      { id: 2, action: 'Admin deleted task', timestamp: '2025-05-14 09:15', performedBy: 'admin@example.com' },
      { id: 3, action: 'User updated task', timestamp: '2025-05-14 09:30', performedBy: 'user2@example.com' },
    ];
    setLogs(mockLogs);
  }, [loading, user, router]);

  if (loading || !user) return <div className="text-center mt-10">Loading...</div>;

  return (
    <ProtectedRoute>
      
      <div className="min-h-screen p-6 bg-gray-100">
        <h1 className="text-3xl font-bold mb-4">Audit Logs</h1>
        {logs.length > 0 ? (
          <div className="bg-white rounded shadow p-4">
            <table className="w-full table-auto border-collapse">
              <thead>
                <tr className="bg-gray-200 text-left">
                  <th className="p-2">#</th>
                  <th className="p-2">Action</th>
                  <th className="p-2">Timestamp</th>
                  <th className="p-2">Performed By</th>
                </tr>
              </thead>
              <tbody>
                {logs.map((log, index) => (
                  <tr key={log.id} className="border-t">
                    <td className="p-2">{index + 1}</td>
                    <td className="p-2">{log.action}</td>
                    <td className="p-2">{log.timestamp}</td>
                    <td className="p-2">{log.performedBy}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p>No logs available.</p>
        )}
      </div>
    </ProtectedRoute>
  );
}
