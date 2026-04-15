"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "../../../context/AuthContext";

export default function LoginPage() {

  const router = useRouter();
  const { login } = useAuth();

  const [form, setForm] = useState({
    email: "",
    password: ""
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const validate = () => {
    if (!form.email.includes("@")) {
      return "Invalid email format";
    }
    if (form.password.length < 6) {
      return "Password must be at least 6 characters";
    }
    return null;
  };

  const handleSubmit = async (e) => {

    e.preventDefault();

    const validationError = validate();
    if (validationError) {
      setError(validationError);
      return;
    }

    try {

      setLoading(true);
      setError("");

      const data = await login(form);

      // success UX
      if (data.role === "admin") {
        router.push("/admin");
      } else {
        router.push("/");
      }

      router.refresh();

    } catch (err) {

      if (err.response?.data?.message) {
        setError(err.response.data.message);
      } else {
        setError("Invalid credentials or server error");
      }

    } finally {
      setLoading(false);
    }

  };

  return (

    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-blue-100 to-gray-200">

      <div className="bg-white shadow-2xl rounded-2xl p-8 w-full max-w-md">

        <h1 className="text-3xl font-bold text-center mb-6 text-blue-900">
          🔐 Voter Login
        </h1>

        {error && (
          <p className="bg-red-100 text-red-600 p-2 rounded text-sm text-center mb-3">
            {error}
          </p>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">

          <input
            type="email"
            name="email"
            placeholder="Email Address"
            value={form.email}
            onChange={handleChange}
            required
            className="w-full border p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          />

          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Password"
              value={form.password}
              onChange={handleChange}
              required
              className="w-full border p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            />

            <span
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-3 cursor-pointer text-sm text-gray-500"
            >
              {showPassword ? "Hide" : "Show"}
            </span>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-900 text-white p-3 rounded-lg hover:bg-blue-800 transition duration-200 disabled:bg-gray-400 flex justify-center"
          >
            {loading ? "Logging in..." : "Login"}
          </button>

        </form>

        {/* Extra UX */}
        <p className="text-center text-sm text-gray-500 mt-4">
          Don’t have an account?{" "}
          <span
            className="text-blue-700 cursor-pointer hover:underline"
            onClick={() => router.push("/auth/register")}
          >
            Register
          </span>
        </p>

      </div>

    </div>

  );
}