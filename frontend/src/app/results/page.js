"use client"

import { useEffect, useState } from "react"
import ResultCard from "../../components/ResultCard"
import { getResults } from "../../services/voteService"

export default function ResultsPage(){

  const [results,setResults] = useState([])
  const [loading,setLoading] = useState(true)
  const [error,setError] = useState("")

  useEffect(()=>{

    const loadResults = async ()=>{

      try{

        const data = await getResults()

        const sorted = [...data].sort((a,b)=>b.votes-a.votes)

        setResults(sorted)

      }catch(err){

        setError("Failed to load results")

      }

      setLoading(false)

    }

    loadResults()

  },[])

  if(loading){
    return(
      <div className="text-center mt-20 text-lg">
        Loading results...
      </div>
    )
  }

  return(

    <div className="max-w-6xl mx-auto p-6">

      <div className="bg-white shadow-md rounded-lg p-6 mb-6 text-center">

        <h1 className="text-2xl font-bold">
          Election Results
        </h1>

        <p className="text-gray-600 mt-2">
          Live vote count for each candidate
        </p>

      </div>

      {error && (
        <p className="text-red-500 text-center mb-6">
          {error}
        </p>
      )}

      <div className="grid md:grid-cols-3 gap-6">

        {results.length === 0 ? (

          <p className="text-center col-span-3 text-gray-500">
            No results available
          </p>

        ):(

          results.map((candidate)=>(
            <ResultCard
              key={candidate._id}
              candidate={candidate}
            />
          ))

        )}

      </div>

    </div>

  )

}