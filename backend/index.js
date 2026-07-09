const express = require("express");
const cors = require("cors");
const pool = require("./db");
const computerRoutes = require("./routes/computers");

const app = express();

app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 3001;

// Route
app.use("/api/computers", computerRoutes);

// Health Check
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

// Create Table
async function createTable() {
  try {

    await pool.query(`
      CREATE TABLE IF NOT EXISTS computers (
        id SERIAL PRIMARY KEY,
        asset_code VARCHAR(30) NOT NULL,
        brand_model VARCHAR(100) NOT NULL,
        cpu VARCHAR(100) NOT NULL,
        ram_gb INTEGER NOT NULL,
        room VARCHAR(30) NOT NULL,
        status VARCHAR(30) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);

    console.log("✅ Table computers ready");

  } catch (err) {
    console.error(err);
  }
}

// Start Server
async function startServer() {

  await createTable();

  app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
  });

}

startServer();