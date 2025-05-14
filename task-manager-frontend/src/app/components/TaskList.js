'use client';

import { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';

export default function TaskList() {
  const { user } = useAuth();
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch user-specific or role-specific tasks
    async function fetchTasks() {
      try {
        const res = await fetch('/api/tasks'); // Replace with your real API endpoint
        const data = await res.json();
        setTasks(data); // You could also filter here based on user role
      } catch (err) {
        console.error('Error fetching tasks:', err);
        setTasks([]);
      } finally {
        setLoading(false);
      }
    }

    fetchTasks();
  }, []);

  if (loading) return <div className="mt-6">Loading tasks...</div>;

  const renderTasks = () => {
    if (!tasks.length) return <p>No tasks available.</p>;

    // Optional role-based filters
    const visibleTasks =
      user.role === 'admin'
        ? tasks
        : user.role === 'manager'
        ? tasks.filter((t) => t.assignedBy === user.email || t.assignedTo.includes(user.email))
        : tasks.filter((t) => t.assignedTo.includes(user.email));

    return (
      <ul className="space-y-2">
        {visibleTasks.map((task) => (
          <li
            key={task.id}
            className="bg-white rounded-lg p-4 shadow border-l-4 border-blue-500 hover:bg-gray-50"
          >
            <h3 className="text-lg font-semibold">{task.title}</h3>
            <p className="text-sm text-gray-600">{task.description}</p>
            <p className="text-xs text-gray-400 mt-1">
              Status: <span className="font-medium">{task.status}</span>
            </p>
          </li>
        ))}
      </ul>
    );
  };

  return (
    <div className="mt-6">
      <h2 className="text-xl font-semibold mb-3">Tasks</h2>
      {renderTasks()}
    </div>
  );
}
