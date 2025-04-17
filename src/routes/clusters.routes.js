const express = require("express");
const router = express.Router();
const {
  getAllClusters,
  getLatestClusters,
  getClusterById,
  searchClusterWithArticle,
} = require("../controllers/clusters.controller");

// GET /api/clusters
router.get("/", getAllClusters);

// GET /api/clusters/latest
router.get("/latest", getLatestClusters);

// GET /api/clusters/search
router.get("/search", searchClusterWithArticle);

// GET /api/clusters/:id
router.get("/:id", getClusterById);

module.exports = router;
