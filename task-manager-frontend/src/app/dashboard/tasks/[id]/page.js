'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';

export default function TaskDetailsPage() {
  const { id } = useParams();
  const router = useRouter();
  const [task, setTask] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    async function fetchTask() {
      try {
        const res = await fetch(`http://localhost:5000/api/tasks/${id}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });
        const data = await res.json();
        if (!res.ok) throw new Error(data.message || 'Failed to fetch task');
        setTask(data.task);
      } catch (err) {
        console.error('Error loading task:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchTask();
  }, [id]);

  const handleDelete = async () => {
    const confirmDelete = confirm('Are you sure you want to delete this task?');
    if (!confirmDelete) return;

    try {
      const res = await fetch(`http://localhost:5000/api/tasks/${id}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Delete failed');
      router.push('/dashboard/tasks');
    } catch (err) {
      alert('Error deleting task: ' + err.message);
    }
  };

  if (loading) return <div className="text-center mt-10">Loading task...</div>;
  if (error) return <div className="text-center mt-10 text-red-500">{error}</div>;
  if (!task) return <div className="text-center mt-10 text-red-500">Task not found.</div>;

  return (
    <div className="max-w-2xl mx-auto mt-10 p-6 bg-white rounded-xl shadow">
      <h2 className="text-2xl font-bold mb-2">{task.title}</h2>
      <p className="text-gray-700 mb-4">{task.description}</p>
      <div className="text-sm text-gray-500 space-y-1">
        <p><strong>Due Date:</strong> {new Date(task.dueDate).toLocaleDateString()}</p>
        <p><strong>Priority:</strong> {task.priority}</p>
        <p><strong>Created By:</strong> {task.createdBy?.email || 'Unknown'}</p>
        <p><strong>Status:</strong> {task.status}</p>
      </div>

      <div className="mt-6 flex gap-4">
        <button
          onClick={() => router.push(`/dashboard/tasks/${id}/edit`)}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          Edit Task
        </button>

        <button
          onClick={handleDelete}
          className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
        >
          Delete Task
        </button>
      </div>
    </div>
  );
}
