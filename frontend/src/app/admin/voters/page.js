"use client"

import { useEffect, useState } from "react"
import ProtectedRoute from "../../../components/ProtectedRoute"
import { getVoters, verifyVoter } from "../../../services/voterService"

export default function ManageVoters(){

  const [voters,setVoters] = useState([])
  const [loading,setLoading] = useState(true)

  useEffect(()=>{

    const loadVoters = async ()=>{

      try{

        const data = await getVoters()

        setVoters(data)

      }catch(err){

        console.error("Failed to load voters",err)

      }

      setLoading(false)

    }

    loadVoters()

  },[])

  const handleApprove = async (id)=>{

    try{

      await verifyVoter(id)

      setVoters(voters.map(voter =>
        voter._id === id ? { ...voter, verified:true } : voter
      ))

    }catch(err){

      console.error("Verification failed")

    }

  }

  if(loading){
    return(
      <div className="text-center mt-20">
        Loading voters...
      </div>
    )
  }

  return(

    <ProtectedRoute role="admin">

      <div className="min-h-screen bg-gray-100 p-6">

        <div className="max-w-6xl mx-auto">

          <div className="bg-white shadow-lg rounded-xl p-6">

            <h1 className="text-2xl font-bold mb-6">
              Manage Voters
            </h1>

            <table className="w-full">

              <thead className="bg-gray-200">

                <tr>
                  <th className="p-3 text-left">Name</th>
                  <th className="p-3 text-left">Voter ID</th>
                  <th className="p-3 text-left">Status</th>
                  <th className="p-3 text-left">Action</th>
                </tr>

              </thead>

              <tbody>

                {voters.map((voter)=>(

                  <tr key={voter._id} className="border-t">

                    <td className="p-3">{voter.name}</td>

                    <td className="p-3">{voter.voterId}</td>

                    <td className="p-3">

                      {voter.verified ? (

                        <span className="text-green-600 font-semibold">
                          Approved
                        </span>

                      ):(

                        <span className="text-orange-500 font-semibold">
                          Pending
                        </span>

                      )}

                    </td>

                    <td className="p-3">

                      {!voter.verified && (

                        <button
                          onClick={()=>handleApprove(voter._id)}
                          className="bg-green-600 text-white px-4 py-1 rounded hover:bg-green-700"
                        >
                          Approve
                        </button>

                      )}

                    </td>

                  </tr>

                ))}

              </tbody>

            </table>

          </div>

        </div>

      </div>

    </ProtectedRoute>

  )

}