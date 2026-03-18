import api from "./apiClient"

// Get all voters
export const getVoters = async () => {

  try {

    const res = await api.get("/users")

    return res.data

  } catch (error) {

    console.error("Error fetching voters:", error)

    throw error

  }

}

// Get single voter
export const getVoterById = async (id) => {

  try {

    const res = await api.get(`/users/${id}`)

    return res.data

  } catch (error) {

    console.error("Error fetching voter:", error)

    throw error

  }

}

// Verify voter
export const verifyVoter = async (id) => {

  try {

    const res = await api.put(`/users/verify/${id}`)

    return res.data

  } catch (error) {

    console.error("Error verifying voter:", error)

    throw error

  }

}