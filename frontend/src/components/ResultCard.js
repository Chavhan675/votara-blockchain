"use client"

import Image from "next/image"

export default function ResultCard({ candidate, maxVotes }){

  const percentage = maxVotes
    ? Math.round((candidate.votes / maxVotes) * 100)
    : 0

  return(

    <div className="bg-white shadow-md rounded-xl p-6 text-center hover:shadow-lg transition">

      {/* Candidate Image */}

      <div className="flex justify-center mb-4">

        <Image
          src={candidate.image || "/images/default-candidate.png"}
          alt={candidate.name}
          width={100}
          height={100}
          className="rounded-full object-cover"
        />

      </div>

      {/* Candidate Info */}

      <h2 className="text-lg font-semibold text-blue-900">
        {candidate.name}
      </h2>

      <p className="text-gray-600">
        {candidate.party}
      </p>

      {/* Vote Count */}

      <div className="mt-4 text-blue-900 font-bold">
        Votes: {candidate.votes}
      </div>

      {/* Vote Progress */}

      <div className="mt-3 w-full bg-gray-200 rounded-full h-3">

        <div
          className="bg-blue-900 h-3 rounded-full"
          style={{ width: `${percentage}%` }}
        />

      </div>

      <p className="text-sm text-gray-500 mt-1">
        {percentage}% of votes
      </p>

    </div>

  )

}