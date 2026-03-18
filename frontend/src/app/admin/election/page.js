"use client"

import { useEffect, useState } from "react"
import ProtectedRoute from "../../../components/ProtectedRoute"
import { startElection, endElection, getElections } from "../../../services/electionService"

export default function ElectionControl(){

  const [status,setStatus] = useState("loading")
  const [loading,setLoading] = useState(false)

  // Load election status
  useEffect(()=>{

    const loadElection = async ()=>{

      try{

        const data = await getElections()

        if(data && data.length > 0){
          setStatus(data[0].status)
        }else{
          setStatus("closed")
        }

      }catch(err){

        console.error("Failed to fetch election",err)
        setStatus("closed")

      }

    }

    loadElection()

  },[])

  const handleStart = async ()=>{

    try{

      setLoading(true)

      await startElection()

      setStatus("active")

    }catch(err){

      console.error("Start election failed")

    }

    setLoading(false)

  }

  const handleEnd = async ()=>{

    try{

      setLoading(true)

      await endElection()

      setStatus("closed")

    }catch(err){

      console.error("End election failed")

    }

    setLoading(false)

  }

  return(

    <ProtectedRoute role="admin">

      <div className="min-h-screen bg-gray-100 p-6">

        <div className="max-w-4xl mx-auto">

          <div className="bg-white shadow-lg rounded-xl p-8 text-center">

            <h1 className="text-3xl font-bold mb-6">
              Election Control Panel
            </h1>

            <p className="text-lg mb-6">

              Current Status:

              <span className={`ml-3 font-semibold ${
                status === "active"
                ? "text-green-600"
                : "text-red-600"
              }`}>

                {status}

              </span>

            </p>

            <div className="flex justify-center gap-6">

              <button
                onClick={handleStart}
                disabled={loading || status === "active"}
                className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700"
              >
                Start Election
              </button>

              <button
                onClick={handleEnd}
                disabled={loading || status === "closed"}
                className="bg-red-600 text-white px-6 py-3 rounded-lg hover:bg-red-700"
              >
                End Election
              </button>

            </div>

          </div>

        </div>

      </div>

    </ProtectedRoute>

  )

}