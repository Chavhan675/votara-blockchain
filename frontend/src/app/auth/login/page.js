"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "../../../context/AuthContext";

export default function LoginPage(){

  const router = useRouter();
  const { login } = useAuth(); // 🔥 IMPORTANT

  const [form,setForm] = useState({
    email:"",
    password:""
  });

  const [loading,setLoading] = useState(false);
  const [error,setError] = useState("");

  const handleChange = (e)=>{
    setForm({
      ...form,
      [e.target.name]:e.target.value
    });
  };

  const handleSubmit = async (e)=>{

    e.preventDefault();

    try{

      setLoading(true);
      setError("");

      // 🔥 USE CONTEXT LOGIN
      const data = await login({
        email: form.email,
        password: form.password
      });

      // 🔥 redirect
      if(data.role === "admin"){
        router.push("/admin");
      }else{
        router.push("/");
      }

      router.refresh(); // 🔥 CRITICAL FIX

    }catch(err){

      console.error(err);
      setError(err.message || "Login failed");

    }finally{
      setLoading(false);
    }

  };

  return(

    <div className="flex justify-center items-center min-h-screen bg-gray-100">

      <div className="bg-white shadow-lg rounded-xl p-8 w-full max-w-md">

        <h1 className="text-2xl font-bold text-center mb-6">
          Voter Login
        </h1>

        {error && (
          <p className="text-red-500 text-center mb-4">
            {error}
          </p>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">

          <input
            type="email"
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            required
            className="w-full border p-3 rounded-lg"
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            required
            className="w-full border p-3 rounded-lg"
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-900 text-white p-3 rounded-lg hover:bg-blue-800"
          >
            {loading ? "Logging in..." : "Login"}
          </button>

        </form>

      </div>

    </div>

  );
}