"use client";

import api from "../utils/api";

export default function VoteButton({ candidateId, electionId }) {

  const handleVote = async () => {
    try {
      const token = localStorage.getItem("token");

      console.log("Sending:", candidateId, electionId);

      if (!candidateId || !electionId) {
        alert("Invalid data");
        return;
      }

      const res = await api.post(
        "/votes/cast",
        {
          candidateId,
          electionId
        },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      alert("✅ Vote successful");

    } catch (error) {
      console.log("ERROR:", error);

      if (error.response) {
        alert(error.response.data.message);
      } else {
        alert("Server error");
      }
    }
  };

  return (
    <button
      onClick={handleVote}
      className="bg-blue-600 text-white px-4 py-2 mt-2"
    >
      Vote
    </button>
  );
}