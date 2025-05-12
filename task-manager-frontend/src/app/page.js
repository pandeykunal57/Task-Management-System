import Link from "next/link";

export default function HomePage() {
  return (
    <section className="flex flex-col items-center justify-center h-[70vh] text-center space-y-4">
      <h1 className="text-5xl font-bold text-gray-900">Welcome to Task Manager</h1>
      <p className="text-2xl mb-8 text-gray-600 py-2 ">Manage your team tasks efficiently and collaboratively.</p>
      <div className="space-x-4">
        <Link
          href="/login"
          className="text-2xl bg-blue-600 text-white px-6 py-4 rounded-lg hover:bg-blue-700 transition"
        >
          Login
        </Link>
        <Link
          href="/signup"
          className="text-2xl bg-gray-100 text-gray-800 px-6 py-4 rounded-lg hover:bg-gray-200 transition"
        >
          Sign Up
        </Link>
      </div>
    </section>
  );
}
