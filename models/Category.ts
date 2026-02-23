import mongoose, { InferSchemaType, Model } from 'mongoose';
import slugify from 'slugify';
import pinyin from 'pinyin';

const CategorySchema = new mongoose.Schema(
  {
    name: { type: String, required: true, unique: true },
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
    categorySlug: { type: String, unique: true, lowercase: true },
  },
  { timestamps: true }
);

CategorySchema.pre('save', async function () {
  // 仅在 name 修改过或 slug 为空时执行
  if (!this.isModified('name') && this.categorySlug) {
    return;
  }
  const cleanName = this.name.trim().replace(/\s+/g, '-');
  const pinyinArray = pinyin(cleanName, {
    style: pinyin.STYLE_NORMAL, // 普通风格，不带声调
    heteronym: false, // 关闭多音字
  });

  const pinyinStr = pinyinArray.map((item) => item[0]).join('-');
  let baseSlug = slugify(pinyinStr, { lower: true, strict: true });

  if (!baseSlug) {
    // 方案 A: 使用 ID 后六位，确保唯一性且不为空
    baseSlug = this._id.toString().slice(-6);
  }

  // 核心：处理唯一性冲突
  // 如果数据库里已经有了相同的 slug，就在后面加数字后缀
  let slug = baseSlug;
  let counter = 1;
  // 注意：在中间件内部获取模型的方法
  const CategoryModel = this.constructor as mongoose.Model<ICategory>;

  while (await CategoryModel.findOne({ categorySlug: slug, _id: { $ne: this._id } })) {
    slug = `${baseSlug}-${counter}`;
    counter++;
  }

  this.categorySlug = slug;
});

export type ICategory = InferSchemaType<typeof CategorySchema> & { _id: mongoose.Types.ObjectId };
const Category: Model<ICategory> = mongoose.models.Category || mongoose.model('Category', CategorySchema);

export default Category;
