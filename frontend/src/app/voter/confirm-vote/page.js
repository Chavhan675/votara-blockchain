"use client";

import { useSearchParams, useRouter } from "next/navigation";
import Image from "next/image";
import { useState } from "react";
import api from "../../../utils/api";

export default function ConfirmVotePage() {

  const params = useSearchParams();
  const router = useRouter();

  const candidateId = params.get("candidateId");
  const name = params.get("name");
  const party = params.get("party");
  const image = params.get("image");
  const logo = params.get("logo");

  const [loading, setLoading] = useState(false);

  const handleConfirmVote = async () => {

    try {
      setLoading(true);

      await api.post("/vote/cast", {
        candidateId,
        electionId: "default-election"
      });

      alert("✅ Vote successfully submitted!");

      router.push("/voter/dashboard");

    } catch (error) {
      alert(error.response?.data?.message || "Voting failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto mt-20 bg-white p-6 rounded-lg shadow text-center">

      <h1 className="text-2xl font-bold mb-6">
        Confirm Your Vote
      </h1>

      {/* Candidate Image */}
      <Image
        src={image}
        alt={name}
        width={120}
        height={120}
        className="mx-auto rounded-full"
      />

      <h2 className="text-xl font-semibold mt-4">{name}</h2>
      <p className="text-gray-500">{party}</p>

      {/* Party Logo */}
      <div className="mt-4">
        <Image
          src={logo}
          alt="party logo"
          width={80}
          height={80}
          className="mx-auto"
        />
      </div>

      {/* Buttons */}
      <div className="flex justify-center gap-4 mt-8">

        <button
          onClick={() => router.back()}
          className="px-5 py-2 bg-gray-400 text-white rounded"
        >
          Cancel
        </button>

        <button
          onClick={handleConfirmVote}
          disabled={loading}
          className="px-5 py-2 bg-green-600 text-white rounded"
        >
          {loading ? "Submitting..." : "Confirm Vote"}
        </button>

      </div>

    </div>
  );
}