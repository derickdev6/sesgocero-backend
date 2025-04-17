const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Routes
const clustersRoutes = require("./routes/clusters.routes.js");
const articlesRoutes = require("./routes/articles.routes.js");
app.use("/api/clusters", clustersRoutes);
app.use("/api/articles", articlesRoutes);

module.exports = app;
