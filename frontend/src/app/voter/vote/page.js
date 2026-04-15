"use client";

import { useEffect, useState } from "react";
import api from "../../../utils/api";
import VoteButton from "../../../components/VoteButton";
import Image from "next/image";

export default function VotePage() {
  const [candidates, setCandidates] = useState([]);
  const [electionId, setElectionId] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const load = async () => {
      try {
        const c = await api.get("/candidates");
        setCandidates(c.data);

        const e = await api.get("/elections/active");
        setElectionId(e.data._id);
      } catch (err) {
        console.log(err);

        if (err.response?.status === 404) {
          setError("No active election");
        } else {
          setError("Server error");
        }
      }
    };

    load();
  }, []);

  if (error) {
    return <p className="text-center mt-10 text-red-500">{error}</p>;
  }

  if (!electionId) {
    return <p className="text-center mt-10">Loading election...</p>;
  }

  return (
    <div className="p-6 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold text-center mb-6">
        Cast Your Vote
      </h1>

      {candidates.map((c) => (
        <div
          key={c._id}
          className="border rounded-lg p-6 mb-5 text-center shadow hover:shadow-md transition"
        >
          {/* PARTY LOGO */}
          <div className="flex justify-center mb-4">
            <Image
              src={
                c.party === "BJP"
                  ? "/images/candidates/bjp.png"
                  : c.party === "Congress"
                  ? "/images/candidates/cng.png"
                  : "/images/candidates/aap.png"
              }
              alt="party logo"
              width={80}
              height={80}
              className="object-contain"
            />
          </div>

          {/* PARTY NAME */}
          <h2 className="text-lg font-semibold mb-4">
            {c.party}
          </h2>

          {/* VOTE BUTTON */}
          <VoteButton
            candidateId={c._id}
            electionId={electionId}
          />
        </div>
      ))}
    </div>
  );
}