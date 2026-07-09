const express = require("express");
const router = express.Router();
const pool = require("../db");

// GET ทั้งหมด
router.get("/", async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT * FROM computers ORDER BY id"
    );
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET ตาม id
router.get("/:id", async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT * FROM computers WHERE id=$1",
      [req.params.id]
    );

    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST
router.post("/", async (req, res) => {
  try {
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
      (asset_code, brand_model, cpu, ram_gb, room, status)
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
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// PUT
router.put("/:id", async (req, res) => {
  try {
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
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// DELETE
router.delete("/:id", async (req, res) => {
  try {
    await pool.query(
      "DELETE FROM computers WHERE id=$1",
      [req.params.id]
    );

    res.json({
      message: "Deleted successfully"
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;