"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import axios from "axios"

export default function RegisterPage() {

  const router = useRouter()

  const [form, setForm] = useState({
    name: "",
    email: "",
    voterId: "",
    password: ""
  })

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    })
  }

  const validateForm = () => {
    if (form.password.length < 6) {
      return "Password must be at least 6 characters"
    }

    if (!form.email.includes("@")) {
      return "Invalid email format"
    }

    if (form.voterId.length < 5) {
      return "Invalid Voter ID"
    }

    return null
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    setError("")
    setSuccess("")

    const validationError = validateForm()
    if (validationError) {
      setError(validationError)
      return
    }

    setLoading(true)

    try {

      const res = await axios.post(
        "http://localhost:5000/api/auth/register",
        form
      )

      setSuccess("Registration Successful 🎉")

      setTimeout(() => {
        router.push("/auth/login")
      }, 1500)

    } catch (err) {

      if (err.response) {
        setError(err.response.data.message)
      } else {
        setError("Server not reachable")
      }

    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-blue-100 to-gray-200">

      <div className="bg-white shadow-2xl rounded-2xl p-8 w-full max-w-md">

        <h1 className="text-3xl font-bold text-center mb-6 text-blue-900">
          🗳️ Voter Registration
        </h1>

        {error && (
          <p className="bg-red-100 text-red-600 p-2 rounded text-sm text-center">
            {error}
          </p>
        )}

        {success && (
          <p className="bg-green-100 text-green-600 p-2 rounded text-sm text-center">
            {success}
          </p>
        )}

        <form onSubmit={handleSubmit} className="space-y-4 mt-4">

          <input
            type="text"
            name="name"
            placeholder="Full Name"
            value={form.name}
            onChange={handleChange}
            required
            className="w-full border p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          />

          <input
            type="email"
            name="email"
            placeholder="Email Address"
            value={form.email}
            onChange={handleChange}
            required
            className="w-full border p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          />

          <input
            type="text"
            name="voterId"
            placeholder="Voter ID"
            value={form.voterId}
            onChange={handleChange}
            required
            className="w-full border p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            required
            className="w-full border p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-900 text-white p-3 rounded-lg hover:bg-blue-800 transition duration-200 disabled:bg-gray-400 flex justify-center items-center"
          >
            {loading ? (
              <span className="animate-pulse">Registering...</span>
            ) : (
              "Register"
            )}
          </button>

        </form>

      </div>

    </div>
  )
}