// server/server.js
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const authRoutes = require("./routes/auth");

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);

app.get("/api/dashboard", (req, res) => {
  res.json({
    lessons: ["Greetings", "Numbers", "Verbs"],
    quizzes: ["Vocabulary Quiz", "Grammar Quiz"],
    practice: ["Speaking Practice", "Flashcards"],
    trending: ["Duolingo Tips", "Grammar Hacks"],
  });
});
app.get('/health', (req, res) => {
  res.status(200).send('OK');
});

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("Connected to MongoDB");
    app.listen(5000, () => console.log("Server running on port 5000"));
  })
  .catch((err) => console.error("MongoDB connection error:", err));
