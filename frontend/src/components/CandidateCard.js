"use client"

import Image from "next/image"

export default function CandidateCard({ candidate }) {

const partyLogos = {
"BJP": "/images/bjp.png",
"Congress": "/images/cng.png",
"AAP": "/images/aap.png"
}

return(

<div className="bg-white shadow-lg rounded-xl p-6 text-center hover:shadow-xl transition">

<Image
src={candidate.image}
alt={candidate.name}
width={150}
height={150}
className="mx-auto rounded-full"
/>

<h3 className="text-xl font-bold text-blue-900 mt-4">
{candidate.name}
</h3>

<p className="text-gray-600 font-medium">
{candidate.party}
</p>

{/* Party Logo */}

{partyLogos[candidate.party] && (

<Image
src={partyLogos[candidate.party]}
alt={candidate.party}
width={50}
height={50}
className="mx-auto mt-2"
/>

)}

<p className="text-sm text-gray-500">
Constituency: {candidate.constituency}
</p>

<p className="text-gray-600 mt-3 text-sm">
{candidate.description}
</p>

</div>

)

}