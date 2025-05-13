"use client";

import { useAuth } from "../context/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function ProtectedRoute({ children, role }) {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    // Redirect if not logged in
    if (!loading && !user) {
      router.push("/login");
    }

    // If role is specified, redirect if user doesn't match role
    if (!loading && user && role && user.role !== role) {
      router.push("/unauthorized");
    }
  }, [user, loading, role, router]);

  // While checking auth status
  if (loading || !user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-500">Loading...</p>
      </div>
    );
  }

  return children;
}
