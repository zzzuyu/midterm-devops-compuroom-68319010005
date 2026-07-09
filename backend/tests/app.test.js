const request = require("supertest");
const express = require("express");

const app = express();

app.use(express.json());

app.get("/health", (req, res) => {
  res.json({
    status: "OK",
    version: "1.0.0"
  });
});

app.get("/api/computers", (req, res) => {
  res.json([]);
});

app.post("/api/computers", (req, res) => {
  res.status(201).json(req.body);
});

test("GET /health should return OK", async () => {
  const res = await request(app).get("/health");

  expect(res.statusCode).toBe(200);
  expect(res.body.status).toBe("OK");
});

test("GET /api/computers should return array", async () => {
  const res = await request(app).get("/api/computers");

  expect(res.statusCode).toBe(200);
  expect(Array.isArray(res.body)).toBe(true);
});

test("POST /api/computers should create item", async () => {
  const newComputer = {
    asset_code: "PC001",
    brand_model: "Dell OptiPlex",
    cpu: "Intel i5",
    ram_gb: 16,
    room: "LAB401",
    status: "พร้อมใช้งาน"
  };

  const res = await request(app)
    .post("/api/computers")
    .send(newComputer);

  expect(res.statusCode).toBe(201);
  expect(res.body.asset_code).toBe("PC001");
});