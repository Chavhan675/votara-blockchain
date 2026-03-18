const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

const connectDB = require("./config/db");

// Load env variables
dotenv.config();

// Connect Database
connectDB();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Test route
app.get("/", (req, res) => {
  res.json({
    message: "Blockchain Voting Backend Running Successfully"
  });
});

/*
ROUTES
*/

const authRoutes = require("./routes/authRoutes");
const adminRoutes = require("./routes/adminRoutes");
const userRoutes = require("./routes/userRoutes");
const candidateRoutes = require("./routes/candidateRoutes");
const electionRoutes = require("./routes/electionRoutes");
const voteRoutes = require("./routes/voteRoutes");

// Route Middleware
app.use("/api/auth", authRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/users", userRoutes);
app.use("/api/candidates", candidateRoutes);
app.use("/api/elections", electionRoutes);
app.use("/api/votes", voteRoutes);

// Error handler
const errorMiddleware = require("./middleware/errorMiddleware");
app.use(errorMiddleware);

// Start server
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});