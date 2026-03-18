"use client"

import ProtectedRoute from "../../../components/ProtectedRoute"
import { useAuth } from "../../../context/AuthContext"

export default function ProfilePage(){

  const { user } = useAuth()

  return(

    <ProtectedRoute role="voter">

      <div className="min-h-screen bg-gray-100 p-6">

        <div className="max-w-3xl mx-auto">

          <div className="bg-white shadow-lg rounded-xl p-8">

            <div className="text-center mb-6">

              <div className="w-20 h-20 bg-blue-900 text-white rounded-full flex items-center justify-center mx-auto text-2xl font-bold">
                {user?.name?.charAt(0) || "U"}
              </div>

              <h1 className="text-2xl font-bold mt-4">
                Voter Profile
              </h1>

              <p className="text-gray-500">
                Your voter account details
              </p>

            </div>


            <div className="space-y-4">

              <div className="flex justify-between border-b pb-2">
                <span className="font-semibold">Name</span>
                <span>{user?.name}</span>
              </div>

              <div className="flex justify-between border-b pb-2">
                <span className="font-semibold">Email</span>
                <span>{user?.email}</span>
              </div>

              <div className="flex justify-between border-b pb-2">
                <span className="font-semibold">Voter ID</span>
                <span>{user?.voterId}</span>
              </div>

              <div className="flex justify-between border-b pb-2">
                <span className="font-semibold">Role</span>
                <span className="capitalize">{user?.role}</span>
              </div>

              <div className="flex justify-between border-b pb-2">
                <span className="font-semibold">Verification</span>

                {user?.verified ? (
                  <span className="text-green-600 font-semibold">
                    Verified
                  </span>
                ) : (
                  <span className="text-orange-500 font-semibold">
                    Pending Approval
                  </span>
                )}

              </div>

            </div>

          </div>

        </div>

      </div>

    </ProtectedRoute>

  )

}