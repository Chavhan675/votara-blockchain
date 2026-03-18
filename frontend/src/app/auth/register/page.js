"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import axios from "axios"

export default function RegisterPage(){

  const router = useRouter()

  const [form,setForm] = useState({
    name:"",
    email:"",
    voterId:"",
    password:""
  })

  const [loading,setLoading] = useState(false)

  const handleChange = (e)=>{
    setForm({
      ...form,
      [e.target.name]:e.target.value
    })
  }

  const handleSubmit = async (e)=>{
    e.preventDefault()

    setLoading(true)

    try{

      const res = await axios.post(
        "http://localhost:5000/api/auth/register",
        {
          name:form.name,
          email:form.email,
          voterId:form.voterId,
          password:form.password
        }
      )

      alert("Registration Successful")

      console.log("User:",res.data)

      router.push("/auth/login")

    }catch(error){

      console.error(error)

      if(error.response){
        alert(error.response.data.message)
      }else{
        alert("Server not reachable")
      }

    }finally{
      setLoading(false)
    }

  }

  return(

    <div className="flex justify-center items-center min-h-screen bg-gray-100">

      <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md">

        <h1 className="text-2xl font-bold text-center mb-6">
          Voter Registration
        </h1>

        <form onSubmit={handleSubmit} className="space-y-4">

          <input
            type="text"
            name="name"
            placeholder="Full Name"
            value={form.name}
            onChange={handleChange}
            required
            className="w-full border p-3 rounded"
          />

          <input
            type="email"
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            required
            className="w-full border p-3 rounded"
          />

          <input
            type="text"
            name="voterId"
            placeholder="Voter ID"
            value={form.voterId}
            onChange={handleChange}
            required
            className="w-full border p-3 rounded"
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            required
            className="w-full border p-3 rounded"
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-900 text-white p-3 rounded hover:bg-blue-800"
          >
            {loading ? "Registering..." : "Register"}
          </button>

        </form>

      </div>

    </div>

  )
}