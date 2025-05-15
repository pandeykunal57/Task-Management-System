'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '../../context/AuthContext';
import ProtectedRoute from '../../components/ProtectedRoute';

export default function TasksPage() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const [tasks, setTasks] = useState([]);
  const [fetching, setFetching] = useState(true);

  useEffect(() => {
    if (!loading && !user) {
      router.push('/login');
    }
  }, [user, loading, router]);

  useEffect(() => {
    async function fetchTasks() {
      try {
        const res = await fetch('http://localhost:5000/api/tasks', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });
        const data = await res.json();
        setTasks(data.tasks || []);
        setFetching(false);
      } catch (err) {
        console.error('Failed to fetch tasks:', err);
        setFetching(false);
      }
    }

    if (user) fetchTasks();
  }, [user]);

  if (loading || fetching) {
    return <div className="text-center mt-10">Loading...</div>;
  }

  return (
    <ProtectedRoute>
      <div className="min-h-screen p-6 bg-gray-50">
        <h1 className="text-2xl font-bold mb-4">Tasks</h1>

        <p className="text-gray-600 mb-4">
          Tasks assigned to <b>{user?.email}</b> ({user?.role})
        </p>

        {tasks.length === 0 ? (
          <div className="border border-dashed border-gray-300 p-4 rounded-lg text-gray-500">
            No tasks found.
          </div>
        ) : (
          <ul className="space-y-4">
            {tasks.map((task) => (
              <li
                key={task._id}
                className="bg-white border p-4 rounded-lg hover:shadow transition"
              >
                <Link href={`/dashboard/tasks/${task._id}`} className="block">
                  <h3 className="text-lg font-semibold">{task.title}</h3>
                  <p className="text-gray-600">{task.description?.slice(0, 100)}...</p>
                  <div className="text-sm text-gray-500 mt-1">
                    Due: {new Date(task.dueDate).toLocaleDateString()} | Priority: {task.priority}
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </div>
    </ProtectedRoute>
  );
}
