import mongoose, { Document, Model } from 'mongoose';

export const TAG_COLORS = ['red', 'blue', 'green', 'yellow', 'purple', 'gray'] as const;
export type TagColor = (typeof TAG_COLORS)[number];
// 1. 定义数据接口
export interface ITag extends Document {
  id: string;
  tagName: string;
  tagColor: TagColor;
  createdAt: Date;
  updatedAt: Date;
}

const TagSchema = new mongoose.Schema(
  {
    tagName: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      maxLength: 20,
    },
    tagColor: {
      type: String,
      enum: TAG_COLORS,
      default: 'blue',
    },
  },
  { timestamps: true }
);

const Tag: Model<ITag> = mongoose.models.Tag || mongoose.model<ITag>('Tag', TagSchema);

export default Tag;
