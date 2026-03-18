"use client";

import { useRouter } from "next/navigation";

export default function VoteButton({ candidateId }) {

  const router = useRouter();

  return (
    <button
      onClick={() => router.push(`/voter/vote/${candidateId}/confirm`)}
      className="mt-4 px-5 py-2 bg-green-600 text-white rounded"
    >
      Vote
    </button>
  );
}