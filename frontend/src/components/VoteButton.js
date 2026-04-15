"use client";

import api from "../utils/api";

export default function VoteButton({ candidateId, electionId }) {

  const handleVote = async () => {
    try {
      console.log("DATA:", candidateId, electionId);

      if (!candidateId || !electionId) {
        alert("Invalid data");
        return;
      }

      await api.post("/votes/cast", {
        candidateId,
        electionId
      });

      alert("✅ Vote Successful");

    } catch (error) {
      console.log(error);

      if (error.response) {
        alert(error.response.data.message);
      } else {
        alert("Server error");
      }
    }
  };

  return (
    <button onClick={handleVote} className="bg-blue-600 text-white px-4 py-2 mt-2">
      Vote
    </button>
  );
}