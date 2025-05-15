'use client';

import { useEffect, useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useRouter } from 'next/navigation';
import ProtectedRoute from '../../components/ProtectedRoute';

export default function AuditLogsPage() {
  const { user, loading, token } = useAuth();
  const router = useRouter();
  const [logs, setLogs] = useState([]);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Redirect if not admin
    if (!loading && user?.role !== 'admin') {
      router.push('/dashboard');
      return;
    }

    async function fetchLogs() {
      try {
        const res = await fetch('/api/audit', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await res.json();

        if (!res.ok) throw new Error(data.message || 'Failed to fetch audit logs');

        setLogs(data.logs || []);
      } catch (err) {
        console.error('Error fetching audit logs:', err);
        setError('Error loading audit logs');
      } finally {
        setIsLoading(false);
      }
    }

    if (user?.role === 'admin') {
      fetchLogs();
    }
  }, [user, loading, router, token]);

  if (loading || !user || isLoading) {
    return <div className="text-center mt-10">Loading...</div>;
  }

  if (error) {
    return <div className="text-center mt-10 text-red-600">{error}</div>;
  }

  return (
    <ProtectedRoute>
      <div className="min-h-screen p-6 bg-gray-100">
        <h1 className="text-3xl font-bold mb-4">Audit Logs</h1>
        {logs.length > 0 ? (
          <div className="bg-white rounded shadow p-4 overflow-x-auto">
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
                  <tr key={log._id} className="border-t">
                    <td className="p-2">{index + 1}</td>
                    <td className="p-2">{log.action}</td>
                    <td className="p-2">
                      {new Date(log.timestamp).toLocaleString()}
                    </td>
                    <td className="p-2">{log.user?.email || 'N/A'}</td>
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
