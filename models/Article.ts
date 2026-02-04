// models/Article.ts
import mongoose from 'mongoose';

const ArticleSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    content: String, // 只有“文章”节点有内容，“目录”节点可以为空
    parentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Article',
      default: null, // 根目录的父节点为 null
    },
    isFolder: { type: Boolean, default: false }, // 区分是目录还是具体文章
    order: { type: Number, default: 0 }, // 用于同级排序
  },
  { timestamps: true },
);

export default mongoose.models.Article || mongoose.model('Article', ArticleSchema);
