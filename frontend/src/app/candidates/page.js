"use client"

import candidates from "../../data/candidates"
import CandidateCard from "../../components/CandidateCard"

export default function CandidatesPage(){

return(

<div className="min-h-screen bg-gray-100 px-6 py-16">

<h1 className="text-4xl font-bold text-center text-blue-900 mb-12">
Election Candidates
</h1>

<div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-8">

{candidates.map((candidate)=>(
<CandidateCard
key={candidate.id}
candidate={candidate}
/>
))}

</div>

</div>

)

}