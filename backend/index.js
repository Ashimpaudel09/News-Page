const express = require("express");
const axios = require("axios");
const cors = require("cors");
const path = require("path");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 5000;

// Enable CORS (can be restricted later if needed)
app.use(cors());

// Serve the static React files from frontend build
app.use(express.static(path.join(__dirname, "../my-news/build")));

// News API route
app.get("/api/news", async (req, res) => {
  try {
    const { category = "general", page = 1, pageSize = 6 } = req.query;

    const categoryParam = category === "all" ? "general" : category;

    const params = {
      country: "us",
      apiKey: process.env.NEWS_API_KEY,
      page,
      pageSize,
    };

    const validCategories = [
      "business",
      "cricket",
      "general",
      "health",
      "fashion",
      "sports",
      "entertainment",
      "technology"
    ];

    if (validCategories.includes(categoryParam)) {
      params.category = categoryParam;
    } else if (categoryParam !== "general") {
      params.q = categoryParam;
    }

    const response = await axios.get("https://newsapi.org/v2/top-headlines", { params });

    res.json(response.data);
  } catch (err) {
    console.error("NewsAPI error:", err.response?.data || err.message);
    res.status(500).json({ error: "Failed to fetch news" });
  }
});

// All remaining routes return the React app (for client-side routing)
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../my-news/build/index.html"));
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
