import mongoose from "mongoose";

const ArticleSchema = new mongoose.Schema(
  {
    content: { type: String, required: true },
  },
  { timestamps: true },
);

// 关键点：如果模型已存在则使用已有的，不存在再创建
export default mongoose.models.Article ||
  mongoose.model("Article", ArticleSchema);
