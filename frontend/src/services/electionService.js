import api from "./apiClient"

export const getElections = async () => {

  const res = await api.get("/elections")

  return res.data
}

export const createElection = async (data) => {

  const res = await api.post("/elections", data)

  return res.data
}

export const startElection = async (id) => {

  const res = await api.put(`/elections/start/${id}`)

  return res.data
}

export const endElection = async (id) => {

  const res = await api.put(`/elections/end/${id}`)

  return res.data
}