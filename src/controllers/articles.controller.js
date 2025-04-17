const Article = require("../models/Article");

// Obtener todos los artículos
const getAllArticles = async (req, res) => {
  try {
    const articles = await Article.find();
    console.log("🟢GET\t|\t/api/articles\t", req.ip);
    res.status(200).json(articles);
  } catch (error) {
    console.error("🔴GET\t|\t/api/articles\t", error);
    res.status(500).json({ message: error.message });
  }
};

// Obtener un artículo por su ID
// Ejemplo de con id 67fe9563f958075ba5d2087f: /api/articles/67fe9563f958075ba5d2087f
const getArticleById = async (req, res) => {
  try {
    const article = await Article.findById(req.params.id);
    console.log("🟢GET\t|\t/api/articles/:id\t", req.ip);
    res.status(200).json(article);
  } catch (error) {
    console.error("🔴GET\t|\t/api/articles/:id\t", error);
    res.status(500).json({ message: error.message });
  }
};

// Buscar articulos por cluster_id
// Ejemplo de con cluster_id 67fe9563f958075ba5d2087f: /api/articles/search?q=67fe9563f958075ba5d2087f
const searchArticleWithCluster = async (req, res) => {
  try {
    const query = req.query.q;

    if (!query) {
      return res.status(400).json({ message: "Missing search query" });
    }

    // Buscar articulos por su cluster_id
    const articles = await Article.find({
      cluster_id: query,
    });

    console.log("🟢GET\t|\t/api/articles/search\t", req.ip);
    res.status(200).json(articles);
  } catch (error) {
    console.error("🔴GET\t|\t/api/articles/search\t", error);
    res.status(500).json({ message: error.message });
  }
};
module.exports = {
  getAllArticles,
  getArticleById,
  searchArticleWithCluster,
};
