"use client";

import { useParams, useRouter } from "next/navigation";
import candidates from "../../../../../data/candidates";
import Image from "next/image";
import ConfirmVoteButton from "../../../../../components/ConfirmVoteButton"; // ✅ ADD THIS
import ProtectedRoute from "../../../../../components/ProtectedRoute"; // ✅ OPTIONAL

export default function ConfirmPage() {

  const { id } = useParams();
  const router = useRouter();

  const candidate = candidates.find(
    (c) => String(c.id) === String(id)
  );

  if (!candidate) {
    return <h1 className="text-center mt-20">Not found</h1>;
  }

  return (
    <ProtectedRoute role="voter">

      <div className="min-h-screen flex items-center justify-center bg-gray-100">

        <div className="bg-white p-8 rounded-xl shadow text-center max-w-md w-full">

          <h1 className="text-2xl font-bold mb-6">
            Confirm Your Vote
          </h1>

          {/* ✅ PARTY LOGO */}
          <Image
            src={candidate.partyLogo}
            alt={candidate.party}
            width={140}
            height={140}
            className="mx-auto mb-4"
          />

          <h2 className="text-xl font-semibold">
            {candidate.party}
          </h2>

          <p className="text-gray-500 mb-4">
            Candidate: {candidate.name}
          </p>

          {/* 🔥 CONFIRM BUTTON */}
          <ConfirmVoteButton
            candidateId={candidate.id}
            electionId="1"
          />

          {/* CANCEL BUTTON */}
          <button
            onClick={() => router.back()}
            className="mt-4 text-gray-500 underline"
          >
            Cancel
          </button>

        </div>

      </div>

    </ProtectedRoute>
  );
}