export default function ResultCard({ candidate, rank }) {

  // 🔥 Map candidate name → image
  const getImage = (name) => {
    const n = name.toLowerCase()

    if (n.includes("modi")) return "/images/candidates/modi.png"
    if (n.includes("rahul")) return "/images/candidates/rahul.png"
    if (n.includes("kejriwal")) return "/images/candidates/kejriwal.png"

    return "/default-user.png"
  }

  return (

    <div
      className={`p-6 rounded-xl shadow-md transition-all duration-300 ${
        rank === 1
          ? "border-2 border-green-500 bg-green-50 scale-105"
          : "bg-white"
      }`}
    >

      {/* Rank Badge */}
      <div className="text-center mb-3">

        {rank === 1 && (
          <p className="text-green-600 font-bold text-lg">
            🥇 Winner
          </p>
        )}

        {rank === 2 && (
          <p className="text-gray-500 font-semibold">
            🥈 2nd Place
          </p>
        )}

        {rank === 3 && (
          <p className="text-orange-500 font-semibold">
            🥉 3rd Place
          </p>
        )}

      </div>

      {/* ✅ Candidate Image (FIXED) */}
      <img
        src={getImage(candidate.name)}
        alt={candidate.name}
        className="w-20 h-20 rounded-full mx-auto mb-4 object-cover border"
      />

      {/* Name */}
      <h2 className="text-center text-lg font-bold text-blue-700">
        {candidate.name}
      </h2>

      {/* Votes */}
      <p className="text-center mt-2 font-semibold">
        Votes: {candidate.votes}
      </p>

      {/* Progress Bar */}
      <div className="w-full bg-gray-200 rounded-full h-3 mt-4">

        <div
          className="bg-blue-500 h-3 rounded-full transition-all duration-500"
          style={{ width: `${candidate.percentage}%` }}
        ></div>

      </div>

      {/* Percentage */}
      <p className="text-center text-sm text-gray-500 mt-2">
        {candidate.percentage}% of votes
      </p>

    </div>

  )

}