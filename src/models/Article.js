const mongoose = require("mongoose");

const ArticleSchema = new mongoose.Schema(
  {
    url: { type: String, required: true, unique: true },
    cleaned: { type: Boolean, default: false },
    content: { type: String, required: true },
    date: { type: Date, required: true },
    political_stance: {
      type: String,
      enum: [
        "left",
        "center-left",
        "center",
        "center-right",
        "right",
        "unknown",
      ],
      default: "unknown",
    },
    source: { type: String, required: true },
    subtitle: { type: String },
    title: { type: String, required: true },
    cluster_id: { type: mongoose.Schema.Types.ObjectId, ref: "Cluster" },
  },
  {
    timestamps: { createdAt: "created_at", updatedAt: "updated_at" },
  }
);

module.exports = mongoose.model("Article", ArticleSchema);
