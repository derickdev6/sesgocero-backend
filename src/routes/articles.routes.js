const express = require("express");
const router = express.Router();
const {
  getAllArticles,
  getArticleById,
  searchArticleWithCluster,
} = require("../controllers/articles.controller");

// GET /api/articles
router.get("/", getAllArticles);

// GET /api/articles/search
router.get("/search", searchArticleWithCluster);

// GET /api/articles/:id
router.get("/:id", getArticleById);

module.exports = router;
