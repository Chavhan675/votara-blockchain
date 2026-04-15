"use client";

import { useEffect, useState } from "react";
import CandidateCard from "../../components/CandidateCard";

export default function CandidatesPage() {
  const [candidates, setCandidates] = useState([]);

  useEffect(() => {
    setCandidates([
      {
        _id: "1",
        name: "Narendra Modi",
        party: "BJP",
        constituency: "Varanasi",
        role: "Prime Minister of India",
        description:
          "Experienced leader focusing on development, Digital India, and strong global relations.",
        image: "/images/candidates/modi.png",
      },
      {
        _id: "2",
        name: "Rahul Gandhi",
        party: "Congress",
        constituency: "Wayanad",
        role: "Leader of Congress",
        description:
          "Advocates for youth empowerment, equality, and inclusive economic growth.",
        image: "/images/candidates/rahul.png",
      },
      {
        _id: "3",
        name: "Arvind Kejriwal",
        party: "AAP",
        constituency: "New Delhi",
        role: "CM of Delhi",
        description:
          "Focused on improving education, healthcare, and transparent governance.",
        image: "/images/candidates/kejriwal.png",
      },
    ]);
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 px-6 py-16">
      <h1 className="text-4xl font-bold text-center text-blue-900 mb-12">
        Election Candidates
      </h1>

      <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-8">
        {candidates.map((candidate) => (
          <CandidateCard key={candidate._id} candidate={candidate} />
        ))}
      </div>
    </div>
  );
}