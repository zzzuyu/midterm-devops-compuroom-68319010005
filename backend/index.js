const express = require("express");
const cors = require("cors");
const pool = require("./db");

const app = express();

app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 3001;

app.get("/health", async (req, res) => {
  try {
    await pool.query("SELECT NOW()");
    res.json({
      status: "OK",
      version: "1.0.0",
    });
  } catch (err) {
    res.status(500).json({
      status: "Database Error",
    });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});