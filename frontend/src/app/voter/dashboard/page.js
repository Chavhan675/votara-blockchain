"use client";

import ProtectedRoute from "../../../components/ProtectedRoute";
import { useAuth } from "../../../context/AuthContext";
import Link from "next/link";

export default function VoterDashboard() {

  const { user, loading } = useAuth();

  return (
    <ProtectedRoute role="voter">

      {/* 🔥 EXTRA SAFETY (fix blank issue) */}
      {loading ? (
        <div className="text-center mt-20 text-xl">
          Loading dashboard...
        </div>
      ) : !user ? null : (

        <div className="max-w-5xl mx-auto p-6">

          <div className="bg-white shadow-lg rounded-xl p-6">

            <h1 className="text-3xl font-bold mb-4 text-gray-800">
              👋 Welcome, {user.name}
            </h1>

            <p className="text-gray-500 mb-6">
              Manage your voting activity below
            </p>

            {/* DASHBOARD CARDS */}
            <div className="grid md:grid-cols-3 gap-6">

              {/* PROFILE */}
              <Link
                href="/voter/profile"
                className="bg-blue-600 hover:bg-blue-700 text-white p-6 rounded-xl text-center shadow-md transition"
              >
                <h2 className="text-xl font-semibold mb-2">
                  Profile
                </h2>
                <p className="text-sm opacity-80">
                  View your details
                </p>
              </Link>

              {/* CAST VOTE */}
              <Link
                href="/voter/vote"
                className="bg-green-600 hover:bg-green-700 text-white p-6 rounded-xl text-center shadow-md transition"
              >
                <h2 className="text-xl font-semibold mb-2">
                  Cast Vote
                </h2>
                <p className="text-sm opacity-80">
                  Participate in election
                </p>
              </Link>

              {/* RESULTS */}
              <Link
                href="/results"
                className="bg-purple-600 hover:bg-purple-700 text-white p-6 rounded-xl text-center shadow-md transition"
              >
                <h2 className="text-xl font-semibold mb-2">
                  Results
                </h2>
                <p className="text-sm opacity-80">
                  View election results
                </p>
              </Link>

            </div>

            {/* EXTRA INFO */}
            <div className="mt-8 p-4 bg-gray-50 rounded-lg">
              <p className="text-gray-600">
                <b>Email:</b> {user.email}
              </p>
              <p className="text-gray-600">
                <b>Role:</b> {user.role}
              </p>
            </div>

          </div>

        </div>

      )}

    </ProtectedRoute>
  );
}