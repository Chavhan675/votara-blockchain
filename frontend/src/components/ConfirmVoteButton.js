"use client";

import { useState } from "react";
import api from "../utils/api";

export default function ConfirmVoteButton({ candidateId, electionId }) {

  const [loading, setLoading] = useState(false);

  const handleVote = async () => {
    try {
      setLoading(true);

      console.log("Sending Vote:", { candidateId, electionId });

      const token = localStorage.getItem("token"); // ✅ IMPORTANT

      const res = await api.post(
        "/vote/cast",
        {
          candidateId,
          electionId
        },
        {
          headers: {
            Authorization: `Bearer ${token}` // ✅ FIX
          }
        }
      );

      console.log("Response:", res.data);

      alert("✅ Vote submitted successfully!");

    } catch (error) {
      console.log("ERROR:", error?.response || error);

      alert(
        error?.response?.data?.message ||
        error.message ||
        "Voting failed"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handleVote}
      disabled={loading}
      className="mt-6 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
    >
      {loading ? "Submitting..." : "Confirm Vote"}
    </button>
  );
}