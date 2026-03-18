import api from "./apiClient"

export const getCandidates = async () => {

  const res = await api.get("/candidates")

  return res.data
}

export const createCandidate = async (candidate) => {

  const res = await api.post("/candidates", candidate)

  return res.data
}

export const updateCandidate = async (id, data) => {

  const res = await api.put(`/candidates/${id}`, data)

  return res.data
}

export const deleteCandidate = async (id) => {

  const res = await api.delete(`/candidates/${id}`)

  return res.data
}