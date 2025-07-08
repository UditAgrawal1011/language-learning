const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const authRoutes = require("./routes/auth");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);

app.get("/api/dashboard", (req, res) => {
  res.json({
    lessons: ["Greetings", "Numbers", "Verbs"],
    quizzes: ["Vocabulary Quiz", "Grammar Quiz"],
    practice: ["Speaking Practice", "Flashcards"],
    trending: ["Duolingo Tips", "Grammar Hacks"],
  });
});

app.get("/health", (req, res) => {
  res.status(200).send("OK");
});

// MongoDB connection
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to MongoDB");
    app.listen(process.env.PORT || 5000, '0.0.0.0', () =>
  console.log(`Server running on port ${process.env.PORT || 5000}`)
);

  })
  .catch((err) => {
    console.error("❌ MongoDB connection error:", err.message);
  });
