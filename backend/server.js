const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const morgan = require("morgan");

const connectDB = require("./config/db");

// ✅ Load environment variables
dotenv.config();

// ✅ Connect MongoDB
connectDB();

const app = express();

/* ================= MIDDLEWARE ================= */

// ✅ CORS (allow frontend)
app.use(cors({
  origin: "http://localhost:3000", // frontend URL (Next.js)
  credentials: true
}));

// ✅ Body parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ✅ Logger (for debugging)
app.use(morgan("dev"));

/* ================= TEST ROUTE ================= */

app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "🚀 Blockchain Voting Backend Running Successfully"
  });
});

/* ================= ROUTES ================= */

const authRoutes = require("./routes/authRoutes");
const adminRoutes = require("./routes/adminRoutes");
const userRoutes = require("./routes/userRoutes");
const candidateRoutes = require("./routes/candidateRoutes");
const electionRoutes = require("./routes/electionRoutes");
const voteRoutes = require("./routes/voteRoutes");

// ✅ API Routes
app.use("/api/auth", authRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/users", userRoutes);
app.use("/api/candidates", candidateRoutes);
app.use("/api/elections", electionRoutes);
app.use("/api/votes", voteRoutes);

/* ================= 404 HANDLER ================= */

app.use((req, res, next) => {
  res.status(404).json({
    success: false,
    message: "API route not found"
  });
});

/* ================= ERROR HANDLER ================= */

const errorMiddleware = require("./middleware/errorMiddleware");
app.use(errorMiddleware);

/* ================= SERVER ================= */

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});