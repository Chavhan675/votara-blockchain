"use client";

import ProtectedRoute from "../../../components/ProtectedRoute";
import candidates from "../../../data/candidates"; // ✅ FIXED PATH
import VoteButton from "../../../components/VoteButton";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function VotePage() {

  const router = useRouter();

  return (
    <ProtectedRoute role="voter">

      <div className="max-w-6xl mx-auto p-6">

        <h1 className="text-3xl font-bold text-center mb-10">
          Cast Your Vote
        </h1>

        <div className="grid md:grid-cols-3 gap-8">

          {candidates.map((candidate) => (

            <div
              key={candidate.id}
              onClick={() => router.push(`/voter/vote/${candidate.id}`)}
              className="bg-white shadow-lg rounded-xl p-6 text-center cursor-pointer"
            >

              <Image
                src={candidate.image}
                alt={candidate.name}
                width={120}
                height={120}
                className="mx-auto rounded-full"
              />

              <h2 className="text-lg font-bold mt-4">
                {candidate.name}
              </h2>

              <p className="text-gray-600">
                {candidate.party}
              </p>

              {/* Prevent click bubbling */}
              <div onClick={(e) => e.stopPropagation()}>
                <VoteButton candidateId={candidate.id} />
              </div>

            </div>

          ))}

        </div>

      </div>

    </ProtectedRoute>
  );
}