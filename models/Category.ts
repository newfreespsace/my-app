import mongoose, { InferSchemaType, Model } from 'mongoose';

const CategorySchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    chapters: [
      {
        title: String,
        sections: [
          {
            title: String,
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
