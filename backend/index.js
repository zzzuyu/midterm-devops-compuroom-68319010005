const express = require("express");
const cors = require("cors");
const pool = require("./db");
const computerRoutes = require("./routes/computers");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/computers", computerRoutes);

// /health
// createTable()
// startServer()