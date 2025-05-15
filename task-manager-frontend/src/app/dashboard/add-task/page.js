'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/app/context/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

export default function AddTaskPage() {
const router = useRouter();
const { user } = useAuth();

const [task, setTask] = useState({
title: '',
description: '',
dueDate: '',
priority: 'Medium',
});

const [error, setError] = useState('');

const handleChange = (e) => {
setTask((prev) => ({
...prev,
[e.target.name]: e.target.value,
}));
};

const handleSubmit = async (e) => {
e.preventDefault();
try {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/tasks`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${user?.token}`,
    },
    body: JSON.stringify(task),
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.message || 'Failed to create task');
  }

  router.push('/dashboard');
} catch (err) {
  console.error(err);
  setError(err.message || 'Failed to add task. Please try again.');
}
};

return (
<div className="max-w-xl mx-auto mt-10 bg-white p-6 rounded-2xl shadow">
<h2 className="text-2xl font-bold mb-4 text-center">Add New Task</h2>
<form onSubmit={handleSubmit} className="space-y-4">
<Input name="title" placeholder="Task Title" value={task.title} onChange={handleChange} required />
<Textarea name="description" placeholder="Task Description" value={task.description} onChange={handleChange} required />
<Input type="date" name="dueDate" value={task.dueDate} onChange={handleChange} required />
<select name="priority" value={task.priority} onChange={handleChange} className="w-full px-4 py-2 border rounded-lg" >
<option value="Low">Low</option>
<option value="Medium">Medium</option>
<option value="High">High</option>
</select>
{error && <p className="text-red-500">{error}</p>}
<Button type="submit" className="w-full">
Create Task
</Button>
</form>
</div>
);
}