import mongoose, { InferSchemaType, Model } from 'mongoose';

const CategorySchema = new mongoose.Schema(
  {
    categoryName: { type: String, required: true, unique: true },
    chapters: [
      {
        chapterName: String,
        sections: [
          {
            sectionName: String,
            articleIds: [
              {
                articleId: {
                  type: mongoose.Types.ObjectId,
                  ref: 'Article',
                },
              },
            ],
          },
        ],
      },
    ],
  },
  { timestamps: true }
);

export type ICategory = InferSchemaType<typeof CategorySchema> & { _id: mongoose.Types.ObjectId };
const Category: Model<ICategory> = mongoose.models.Category || mongoose.model('Category', CategorySchema);

export default Category;
