"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "../context/AuthContext";

export default function ProtectedRoute({ children, role }) {

  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {

    // ⏳ Wait until auth check completes
    if (loading) return;

    // ❌ Not logged in
    if (!user) {
      router.replace("/auth/login");
      return;
    }

    // ❌ Role not allowed
    if (role) {
      const roles = Array.isArray(role) ? role : [role];

      if (!roles.includes(user.role)) {
        router.replace("/");
        return;
      }
    }

  }, [user, loading, role, router]);

  // ⏳ Show loading screen while checking auth
  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-100">
        <div className="text-center">
          <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-900 mx-auto mb-3"></div>
          <p className="text-gray-600">Checking authentication...</p>
        </div>
      </div>
    );
  }

  // 🚫 Prevent rendering if not authorized
  if (!user) return null;

  if (role) {
    const roles = Array.isArray(role) ? role : [role];
    if (!roles.includes(user.role)) return null;
  }

  // ✅ Authorized → show page
  return children;
}