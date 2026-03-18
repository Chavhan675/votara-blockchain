"use client"

import { useState, useEffect } from "react"
import ProtectedRoute from "../../../components/ProtectedRoute"
import { getCandidates, createCandidate } from "../../../services/candidateService"

export default function AdminCandidatesPage(){

const [candidates,setCandidates] = useState([])
const [name,setName] = useState("")
const [party,setParty] = useState("")
const [constituency,setConstituency] = useState("")
const [loading,setLoading] = useState(false)
const [error,setError] = useState("")

// Fetch candidates from backend
useEffect(()=>{
loadCandidates()
},[])

const loadCandidates = async()=>{
try{
const data = await getCandidates()
setCandidates(data)
}catch(err){
setError("Failed to load candidates")
}
}

// Add candidate
const addCandidate = async()=>{

if(!name || !party || !constituency){
setError("All fields are required")
return
}

try{

setLoading(true)

const newCandidate = await createCandidate({
name,
party,
constituency
})

setCandidates([...candidates,newCandidate])

setName("")
setParty("")
setConstituency("")
setError("")

}catch(err){

setError("Failed to add candidate")

}finally{

setLoading(false)

}

}

return(

<ProtectedRoute role="admin">

<div className="min-h-screen bg-gradient-to-br from-blue-50 to-gray-100 px-6 py-16">

<h1 className="text-3xl font-bold text-blue-900 mb-10 text-center">
Candidate Management
</h1>

<div className="max-w-4xl mx-auto bg-white shadow-lg rounded-xl p-8">

<h2 className="text-xl font-semibold mb-6">
Add New Candidate
</h2>

{error && (
<p className="text-red-500 mb-4">{error}</p>
)}

<div className="grid md:grid-cols-3 gap-4 mb-6">

<input
type="text"
placeholder="Candidate Name"
value={name}
onChange={(e)=>setName(e.target.value)}
className="border p-3 rounded-lg focus:ring-2 focus:ring-blue-500"
/>

<input
type="text"
placeholder="Party"
value={party}
onChange={(e)=>setParty(e.target.value)}
className="border p-3 rounded-lg focus:ring-2 focus:ring-blue-500"
/>

<input
type="text"
placeholder="Constituency"
value={constituency}
onChange={(e)=>setConstituency(e.target.value)}
className="border p-3 rounded-lg focus:ring-2 focus:ring-blue-500"
/>

</div>

<button
onClick={addCandidate}
disabled={loading}
className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition"
>
{loading ? "Adding..." : "Add Candidate"}
</button>

</div>


<div className="max-w-4xl mx-auto mt-12">

<h2 className="text-xl font-semibold mb-4">
Candidate List
</h2>

<table className="w-full bg-white shadow-lg rounded-xl overflow-hidden">

<thead className="bg-blue-100">

<tr>
<th className="p-4 text-left">Name</th>
<th className="p-4 text-left">Party</th>
<th className="p-4 text-left">Constituency</th>
</tr>

</thead>

<tbody>

{candidates.map((candidate)=>(

<tr key={candidate._id} className="border-t hover:bg-gray-50">

<td className="p-4">{candidate.name}</td>
<td className="p-4">{candidate.party}</td>
<td className="p-4">{candidate.constituency}</td>

</tr>

))}

</tbody>

</table>

</div>

</div>

</ProtectedRoute>

)

}