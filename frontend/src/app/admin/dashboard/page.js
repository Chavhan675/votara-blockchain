"use client"

import { useEffect, useState } from "react"
import ProtectedRoute from "../../../components/ProtectedRoute"
import Link from "next/link"
import { getCandidates } from "../../../services/candidateService"
import { getVoters } from "../../../services/voterService"
import { getResults } from "../../../services/voteService"

export default function AdminDashboard(){

  const [stats,setStats] = useState({
    voters:0,
    candidates:0,
    votes:0
  })

  const [loading,setLoading] = useState(true)

  useEffect(()=>{

    const loadStats = async ()=>{

      try{

        const voters = await getVoters()
        const candidates = await getCandidates()
        const votes = await getResults()

        setStats({
          voters:voters.length,
          candidates:candidates.length,
          votes:votes.totalVotes || 0
        })

      }catch(err){

        console.error("Failed to load dashboard data",err)

      }

      setLoading(false)

    }

    loadStats()

  },[])

  if(loading){
    return(
      <div className="text-center mt-20 text-lg">
        Loading dashboard...
      </div>
    )
  }

  return(

    <ProtectedRoute role="admin">

      <div className="min-h-screen bg-gray-100 p-6">

        <div className="max-w-6xl mx-auto">

          {/* Header */}

          <div className="bg-white shadow-lg rounded-xl p-8 mb-8 text-center">

            <h1 className="text-3xl font-bold">
              Election Commission Dashboard
            </h1>

            <p className="text-gray-500 mt-2">
              Manage voters, candidates, and election process
            </p>

          </div>


          {/* Statistics */}

          <div className="grid md:grid-cols-3 gap-6 mb-10">

            <div className="bg-blue-600 text-white p-6 rounded-xl shadow text-center">
              <h2 className="text-2xl font-bold">{stats.voters}</h2>
              <p>Total Voters</p>
            </div>

            <div className="bg-green-600 text-white p-6 rounded-xl shadow text-center">
              <h2 className="text-2xl font-bold">{stats.candidates}</h2>
              <p>Total Candidates</p>
            </div>

            <div className="bg-purple-600 text-white p-6 rounded-xl shadow text-center">
              <h2 className="text-2xl font-bold">{stats.votes}</h2>
              <p>Total Votes</p>
            </div>

          </div>


          {/* Dashboard Links */}

          <div className="grid md:grid-cols-3 gap-6">

            <Link
              href="/admin/voters"
              className="bg-blue-900 text-white p-6 rounded-xl text-center hover:bg-blue-800"
            >
              Manage Voters
            </Link>

            <Link
              href="/admin/candidates"
              className="bg-green-700 text-white p-6 rounded-xl text-center hover:bg-green-600"
            >
              Manage Candidates
            </Link>

            <Link
              href="/admin/election"
              className="bg-orange-500 text-white p-6 rounded-xl text-center hover:bg-orange-600"
            >
              Election Control
            </Link>

          </div>

        </div>

      </div>

    </ProtectedRoute>

  )

}