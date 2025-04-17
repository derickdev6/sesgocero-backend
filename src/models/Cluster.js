const mongoose = require("mongoose");

const ArticleEntrySchema = new mongoose.Schema(
  {
    url: { type: String, required: true },
    political_stance: { type: String, default: "unknown" },
  },
  { _id: false }
);

const ArticleListSchema = new mongoose.Schema(
  {
    count: { type: Number, default: 0 },
    list: { type: [ArticleEntrySchema], default: [] },
  },
  { _id: false }
);

const ClusterSchema = new mongoose.Schema({
  name: { type: String, required: true },
  articles: { type: ArticleListSchema, default: () => ({}) },
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Cluster", ClusterSchema);
