"use client";

import { useParams, useRouter } from "next/navigation";
import candidates from "../../../../data/candidates";
import Image from "next/image";


export default function CandidateDetails() {

  const { id } = useParams();
  const router = useRouter();

  const candidate = candidates.find(
    (c) => String(c.id) === String(id)
  );

  if (!candidate) return <h1>Not found</h1>;

  return (
    <div className="max-w-xl mx-auto p-6 text-center">

      <Image
        src={candidate.image}
        alt={candidate.name}
        width={150}
        height={150}
        className="mx-auto rounded-full"
      />

      <h1 className="text-2xl font-bold mt-4">
        {candidate.name}
      </h1>

      <p className="text-gray-600 mb-6">
        {candidate.party}
      </p>

      {/* 🔥 go to confirm */}
      <button
        onClick={() => router.push(`/voter/vote/${candidate.id}/confirm`)}
        className="bg-green-600 text-white px-6 py-2 rounded"
      >
        Vote for {candidate.name}
      </button>

    </div>
  );
}