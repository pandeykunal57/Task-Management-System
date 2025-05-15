'use client';

import { useEffect, useState } from 'react';
import { useAuth } from '@/app/context/AuthContext';
import { useRouter } from 'next/navigation';
import ProtectedRoute from '@/app/components/ProtectedRoute';
import Card from '@/app/components/ui/Card';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

export default function AnalyticsPage() {
  const { user, token, loading } = useAuth();
  const router = useRouter();
  const [analytics, setAnalytics] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!loading && (!user || (user.role !== 'admin' && user.role !== 'manager'))) {
      router.push('/dashboard');
      return;
    }

    const fetchAnalytics = async () => {
      try {
        const res = await fetch('http://localhost:5000/api/analytics', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await res.json();

        if (!res.ok) throw new Error(data.message || 'Failed to fetch analytics');

        setAnalytics(data);
      } catch (err) {
        console.error(err);
        setError('Error fetching analytics');
      }
    };

    if (user?.role === 'admin' || user?.role === 'manager') {
      fetchAnalytics();
    }
  }, [user, loading, token, router]);

  if (loading || !user) return <div className="text-center mt-10">Loading...</div>;
  if (error) return <div className="text-center text-red-600 mt-10">{error}</div>;

  const chartData = analytics
    ? [
        { name: 'Created', value: analytics.createdCount },
        { name: 'Assigned', value: analytics.assignedCount },
        { name: 'Completed', value: analytics.completedCount },
        { name: 'Overdue', value: analytics.overdueCount },
      ]
    : [];

  return (
    <ProtectedRoute>
      <div className="min-h-screen p-6 bg-gray-100">
        <h1 className="text-3xl font-bold mb-6">Analytics Dashboard</h1>

        {analytics && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            <Card>
              <div className="p-4">
                <h3 className="text-lg font-semibold">Tasks Created</h3>
                <p className="text-2xl font-bold">{analytics.createdCount}</p>
              </div>
            </Card>

            <Card>
              <div className="p-4">
                <h3 className="text-lg font-semibold">Assigned To You</h3>
                <p className="text-2xl font-bold">{analytics.assignedCount}</p>
              </div>
            </Card>

            <Card>
              <div className="p-4">
                <h3 className="text-lg font-semibold">Completed</h3>
                <p className="text-2xl font-bold">{analytics.completedCount}</p>
              </div>
            </Card>

            <Card>
              <div className="p-4">
                <h3 className="text-lg font-semibold">Overdue</h3>
                <p className="text-2xl font-bold">{analytics.overdueCount}</p>
              </div>
            </Card>
          </div>
        )}

        {chartData.length > 0 && (
          <div className="bg-white rounded shadow p-4">
            <h2 className="text-xl font-bold mb-4">Overview</h2>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={chartData}>
                <XAxis dataKey="name" />
                <YAxis allowDecimals={false} />
                <Tooltip />
                <Bar dataKey="value" fill="#10b981" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        )}
      </div>
    </ProtectedRoute>
  );
}
