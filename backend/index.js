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

async function startServer() {
  await createTable();

  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}

app.get("/api/computers", async (req, res) => {
  const result = await pool.query(
    "SELECT * FROM computers ORDER BY id"
  );
  res.json(result.rows);
});

app.get("/api/computers/:id", async (req, res) => {
  const result = await pool.query(
    "SELECT * FROM computers WHERE id=$1",
    [req.params.id]
  );

  res.json(result.rows[0]);
});

app.post("/api/computers", async (req, res) => {

  const {
    asset_code,
    brand_model,
    cpu,
    ram_gb,
    room,
    status
  } = req.body;

  const result = await pool.query(
    `
    INSERT INTO computers
    (asset_code,brand_model,cpu,ram_gb,room,status)

    VALUES($1,$2,$3,$4,$5,$6)

    RETURNING *
    `,
    [
      asset_code,
      brand_model,
      cpu,
      ram_gb,
      room,
      status
    ]
  );

  res.status(201).json(result.rows[0]);

});

app.put("/api/computers/:id", async (req, res) => {

  const {
    asset_code,
    brand_model,
    cpu,
    ram_gb,
    room,
    status
  } = req.body;

  const result = await pool.query(
`
UPDATE computers

SET
asset_code=$1,
brand_model=$2,
cpu=$3,
ram_gb=$4,
room=$5,
status=$6

WHERE id=$7

RETURNING *
`,
[
asset_code,
brand_model,
cpu,
ram_gb,
room,
status,
req.params.id
]
);

res.json(result.rows[0]);

});

app.delete("/api/computers/:id", async (req, res) => {

  await pool.query(
    "DELETE FROM computers WHERE id=$1",
    [req.params.id]
  );

  res.json({
    message:"Deleted successfully"
  });

});

startServer();