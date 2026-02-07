// models/Article.ts
import mongoose from 'mongoose';

const ArticleSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    content: String, // 只有“文章”节点有内容，“目录”节点可以为空
  },
  { timestamps: true },
);

export default mongoose.models.Article || mongoose.model('Article', ArticleSchema);
