"use client"

import { useEffect, useState } from "react"
import ResultCard from "../../components/ResultCard"
import { getResults } from "../../services/voteService"

export default function ResultsPage(){

  const [results,setResults] = useState([])
  const [loading,setLoading] = useState(true)
  const [error,setError] = useState("")
  const [totalVotes,setTotalVotes] = useState(0)

  useEffect(()=>{

    const loadResults = async ()=>{

      try{
        const data = await getResults()

        // Sort by votes
        const sorted = [...data].sort((a,b)=>b.votes-a.votes)

        // Total votes
        const total = sorted.reduce((sum,c)=>sum + c.votes,0)

        // Add percentage
        const updated = sorted.map(c => ({
          ...c,
          percentage: total ? ((c.votes / total) * 100).toFixed(1) : 0
        }))

        setResults(updated)
        setTotalVotes(total)

      }catch(err){
        console.error(err)
        setError("Failed to load results")
      }

      setLoading(false)
    }

    loadResults()

  },[])

  if(loading){
    return(
      <div className="text-center mt-20 text-lg animate-pulse">
        Loading results...
      </div>
    )
  }

  const winner = results[0]

  return(

    <div className="max-w-6xl mx-auto p-6">

      {/* Header */}
      <div className="bg-white shadow-md rounded-lg p-6 mb-6 text-center">

        <h1 className="text-3xl font-bold text-blue-600">
          Election Results
        </h1>

        <p className="text-gray-600 mt-2">
          Live vote count with percentage analysis
        </p>

        <p className="mt-3 text-sm text-gray-500">
          Total Votes: <span className="font-semibold">{totalVotes}</span>
        </p>

      </div>

      {/* Winner */}
      {winner && (
        <div className="bg-green-100 border border-green-400 rounded-lg p-4 mb-6 text-center">

          <h2 className="text-xl font-bold text-green-700">
            🏆 Leading Candidate
          </h2>

          <p className="mt-2 text-lg font-semibold">
            {winner.name}
          </p>

          <p className="text-gray-700">
            {winner.votes} Votes ({winner.percentage}%)
          </p>

        </div>
      )}

      {/* Error */}
      {error && (
        <p className="text-red-500 text-center mb-6">
          {error}
        </p>
      )}

      {/* Grid */}
      <div className="grid md:grid-cols-3 gap-6">

        {results.length === 0 ? (

          <p className="text-center col-span-3 text-gray-500">
            No votes yet
          </p>

        ):(

          results.map((candidate,index)=>(
            <ResultCard
              key={candidate._id}
              candidate={candidate}
              rank={index + 1}
            />
          ))

        )}

      </div>

    </div>

  )

}