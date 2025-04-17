const Cluster = require("../models/Cluster");

// Obtener todos los clusters ordenados por cantidad de artículos
const getAllClusters = async (req, res) => {
  try {
    const clusters = await Cluster.find().sort({ "articles.count": -1 });
    console.log("🟢GET\t|\t/api/clusters\t\t", req.ip);
    res.status(200).json(clusters);
  } catch (error) {
    console.error("🔴GET\t|\t/api/clusters\t", error);
    res.status(500).json({ message: error.message });
  }
};

// Obtener los 10 clusters más recientemente actualizados
// Deben tener por lo menos 4 artículos
const getLatestClusters = async (req, res) => {
  try {
    const clusters = await Cluster.find({
      "articles.count": { $gte: 4 },
    })
      .sort({ updated_at: -1 })
      .limit(10);
    console.log("🟢GET\t|\t/api/clusters/latest\t", req.ip);
    res.status(200).json(clusters);
  } catch (error) {
    console.error("🔴GET\t|\t/api/clusters/latest\t", error);
    res.status(500).json({ message: error.message });
  }
};

// Obtener un cluster por su ID
const getClusterById = async (req, res) => {
  try {
    const cluster = await Cluster.findById(req.params.id);
    console.log("🟢GET\t|\t/api/clusters/:id\t", req.ip);
    res.status(200).json(cluster);
  } catch (error) {
    console.error("🔴GET\t|\t/api/clusters/:id\t", error);
    res.status(500).json({ message: error.message });
  }
};

const Article = require("../models/Article");

// Buscar un artículo por título o URL, y retornar su cluster si lo tiene
// Ejemplo de uso: /api/articles/search?q=example
const searchClusterWithArticle = async (req, res) => {
  try {
    const query = req.query.q;

    if (!query) {
      return res.status(400).json({ message: "Missing search query" });
    }

    // Buscar coincidencias por título o URL (case-insensitive)
    const article = await Article.findOne({
      $or: [
        { title: { $regex: query, $options: "i" } },
        { url: { $regex: query, $options: "i" } },
      ],
    });

    if (!article) {
      return res.status(404).json({ message: "Article not found" });
    }

    let cluster = null;

    if (article.cluster_id) {
      cluster = await Cluster.findById(article.cluster_id);
    }

    console.log("🟢GET\t|\t/api/articles/search?q=...\t", req.ip);
    res.status(200).json({ article, cluster });
  } catch (error) {
    console.error("🔴GET\t|\t/api/articles/search\t", error);
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getAllClusters,
  getLatestClusters,
  getClusterById,
  searchClusterWithArticle,
};
