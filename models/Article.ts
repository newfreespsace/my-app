// models/Article.ts
import mongoose, { Model, InferSchemaType } from 'mongoose';
import { ITag } from './Tag';

// 如果你之前定义了 ITag 接口，这里可以引用它的类型
// 定义 Article 的数据接口
// export interface IArticle extends Document {
//   id: string;
//   title: string;
//   content: string;
//   tags: (mongoose.Types.ObjectId | ITag)[]; // 存储的是 ID 数组
//   createdAt: Date;
//   updatedAt: Date;
// }

const ArticleSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    content: String, // 只有“文章”节点有内容，“目录”节点可以为空
    // 定义 tags 为一个数组，内部存储的是指向 Tag 模型的 ObjectId
    tags: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Tag', // 必须与你定义 Tag 模型时传入的名字一致：mongoose.model('Tag', ...)
      },
    ],
  },
  { timestamps: true }
);

export type IArticle = InferSchemaType<typeof ArticleSchema> & { _id: mongoose.Types.ObjectId };

const Article: Model<IArticle> = mongoose.models.Article || mongoose.model<IArticle>('Article', ArticleSchema);
export default Article;
