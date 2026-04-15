export default function CandidateCard({ candidate }) {
  return (
    <div className="bg-white shadow-md rounded-2xl p-6 text-center hover:shadow-xl transition duration-300">

      {/* Candidate Image */}
      <div className="w-28 h-28 mx-auto mb-4">
        <img
          src={candidate.image}
          alt={candidate.name}
          className="w-full h-full object-cover rounded-full border-2 border-blue-500"
        />
      </div>

      {/* Name */}
      <h2 className="text-xl font-bold text-blue-900">
        {candidate.name}
      </h2>

      {/* Party */}
      <p className="text-gray-600">{candidate.party}</p>

      {/* Constituency */}
      <p className="text-sm text-gray-500 mt-1">
        Constituency: {candidate.constituency}
      </p>

      {/* Role */}
      <p className="text-sm text-gray-500">
        {candidate.role}
      </p>

      {/* Description */}
      <p className="text-sm text-gray-600 mt-3 italic">
        "{candidate.description}"
      </p>
    </div>
  );
}