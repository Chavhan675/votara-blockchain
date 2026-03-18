const API_BASE = "http://localhost:5000/api"

// AUTH

export const registerUser = async (data) => {

const res = await fetch(`${API_BASE}/auth/register`,{
method:"POST",
headers:{
"Content-Type":"application/json"
},
body:JSON.stringify(data)
})

return res.json()

}


export const loginUser = async (data) => {

const res = await fetch(`${API_BASE}/auth/login`,{
method:"POST",
headers:{
"Content-Type":"application/json"
},
body:JSON.stringify(data)
})

return res.json()

}



// CANDIDATES

export const getCandidates = async () => {

const res = await fetch(`${API_BASE}/candidates`)

return res.json()

}


export const addCandidate = async (data,token) => {

const res = await fetch(`${API_BASE}/candidates`,{

method:"POST",

headers:{
"Content-Type":"application/json",
Authorization:`Bearer ${token}`
},

body:JSON.stringify(data)

})

return res.json()

}



// VOTE

export const submitVote = async (candidateId,token) => {

const res = await fetch(`${API_BASE}/vote`,{

method:"POST",

headers:{
"Content-Type":"application/json",
Authorization:`Bearer ${token}`
},

body:JSON.stringify({candidateId})

})

return res.json()

}



// RESULTS

export const getResults = async () => {

const res = await fetch(`${API_BASE}/results`)

return res.json()

}



// USERS

export const getUsers = async () => {

const res = await fetch(`${API_BASE}/users`)

return res.json()

}



// ADMIN

export const getVoters = async () => {

const res = await fetch(`${API_BASE}/admin/voters`)

return res.json()

}