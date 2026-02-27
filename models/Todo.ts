import mongoose, { InferSchemaType, Model } from 'mongoose';

const TodoSchema = new mongoose.Schema({
  title: { type: String, required: true },
  startDate: { type: Date, required: true },
  endDate: { type: Date },

  // 循环逻辑存储
  recurrence: {
    type: {
      type: String,
      enum: ['none', 'daily', 'weekly', 'monthly'],
      default: 'none',
    },
    // 将字符串转换为数字数组存储，方便后续查询
    value: [Number],
  },
});

export type ITodo = InferSchemaType<typeof TodoSchema> & { _id: string; completed: boolean };
const Todo: Model<ITodo> = mongoose.models.Todo || mongoose.model<ITodo>('Todo', TodoSchema);

export default Todo;
