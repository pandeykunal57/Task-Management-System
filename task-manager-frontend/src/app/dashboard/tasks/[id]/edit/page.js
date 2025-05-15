'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useAuth } from '@/app/context/AuthContext';
import ProtectedRoute from '@/app/components/ProtectedRoute';

export default function EditTaskPage() {
  const { user } = useAuth();
  const router = useRouter();
  const { id } = useParams();

  const [task, setTask] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchTask() {
      try {
        const res = await fetch(`http://localhost:5000/api/tasks/${id}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });
        const data = await res.json();
        if (!res.ok) {
          throw new Error(data.message || 'Failed to fetch task');
        }
        setTask(data);
      } catch (err) {
        setError('Failed to load task');
      } finally {
        setLoading(false);
      }
    }

    if (id) fetchTask();
  }, [id]);

  const handleChange = (e) => {
    setTask((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const res = await fetch(`http://localhost:5000/api/tasks/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify(task),
      });

      const data = await res.json();
      if (!res.ok) {
        setError(data.message || 'Update failed');
        return;
      }

      router.push('/dashboard/tasks');
    } catch (err) {
      setError('Error updating task');
    }
  };

  if (loading) return <div className="text-center mt-10">Loading...</div>;

  return (
    <ProtectedRoute>
      <div className="max-w-xl mx-auto mt-10 bg-white p-6 rounded-2xl shadow">
        <h2 className="text-2xl font-bold mb-4">Edit Task</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="title"
            placeholder="Title"
            className="w-full px-4 py-2 border rounded-lg"
            value={task?.title || ''}
            onChange={handleChange}
            required
          />
          <textarea
            name="description"
            placeholder="Description"
            className="w-full px-4 py-2 border rounded-lg"
            value={task?.description || ''}
            onChange={handleChange}
            rows={4}
            required
          />
          <input
            type="date"
            name="dueDate"
            className="w-full px-4 py-2 border rounded-lg"
            value={task?.dueDate?.split('T')[0] || ''}
            onChange={handleChange}
            required
          />
          <select
            name="priority"
            value={task?.priority || 'medium'}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg"
          >
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>

          {error && <p className="text-red-500 text-sm">{error}</p>}

          <button
            type="submit"
            className="w-full py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
          >
            Save Changes
          </button>
        </form>
      </div>
    </ProtectedRoute>
  );
}
