'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/app/context/AuthContext';
import ProtectedRoute from '@/app/components/ProtectedRoute';

export default function AddTaskPage() {
const { user } = useAuth();
const router = useRouter();
const [formData, setFormData] = useState({
title: '',
description: '',
dueDate: '',
priority: 'medium',
});
const [error, setError] = useState('');
const [loading, setLoading] = useState(false);

const handleChange = (e) => {
setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
};

const handleSubmit = async (e) => {
e.preventDefault();
setError('');
setLoading(true);


try {
  const res = await fetch('http://localhost:5000/api/tasks', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
    body: JSON.stringify(formData),
  });

  const data = await res.json();
  if (!res.ok) {
    setError(data.message || 'Failed to create task');
    return;
  }

  router.push('/dashboard/tasks');
} catch (err) {
  setError('Something went wrong.');
} finally {
  setLoading(false);
}
};

return (
<ProtectedRoute>
<div className="max-w-xl mx-auto mt-10 bg-white p-6 rounded-2xl shadow">
<h2 className="text-2xl font-bold mb-4">Add New Task</h2>
<form onSubmit={handleSubmit} className="space-y-4">
<input type="text" name="title" placeholder="Title" className="w-full px-4 py-2 border rounded-lg" value={formData.title} onChange={handleChange} required />
<textarea name="description" placeholder="Description" className="w-full px-4 py-2 border rounded-lg" value={formData.description} onChange={handleChange} rows={4} required />
<input type="date" name="dueDate" className="w-full px-4 py-2 border rounded-lg" value={formData.dueDate} onChange={handleChange} required />
<select name="priority" value={formData.priority} onChange={handleChange} className="w-full px-4 py-2 border rounded-lg" >
<option value="low">Low</option>
<option value="medium">Medium</option>
<option value="high">High</option>
</select>


      {error && <p className="text-red-500 text-sm">{error}</p>}

      <button
        type="submit"
        disabled={loading}
        className="w-full py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
      >
        {loading ? 'Creating...' : 'Create Task'}
      </button>
    </form>
  </div>
</ProtectedRoute>
);
}