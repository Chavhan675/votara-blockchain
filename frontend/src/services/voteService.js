import api from "./apiClient"

// Cast vote
export const castVote = async (data) => {

  const res = await api.post("/votes", data)

  return res.data
}

// Get all votes
export const getVotes = async () => {

  const res = await api.get("/votes")

  return res.data
}

// Get results
export const getResults = async () => {

  const res = await api.get("/votes/results")

  return res.data
}

// Check if current voter has voted
export const checkMyVote = async () => {

  const res = await api.get("/votes/my-vote")

  return res.data
}

// Get votes for a specific candidate
export const getVotesByCandidate = async (candidateId) => {

  const res = await api.get(`/votes/candidate/${candidateId}`)

  return res.data
}