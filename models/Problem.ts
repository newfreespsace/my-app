import { Model } from 'mongoose';

import mongoose from 'mongoose';
import Counter from './Counter';

export interface ISample {
  input: string;
  output: string;
}

export interface Iproblem {
  _id?: string; // 加上这个，渲染列表时 key 就有保障了
  problemId: number;
  title: string;
  content: {
    description?: string;
    input_format?: string;
    output_format?: string;
    hint?: string;
  };
  config: {
    timeLimit: number;
    memoryLimit: number;
  };
  isPublic: boolean;
  samples: ISample[];
}

const ProblemSchema = new mongoose.Schema<Iproblem>(
  {
    problemId: { type: Number, unique: true, index: true },
    title: { type: String, required: true },
    content: {
      description: String,
      input_format: String,
      output_format: String,
      hint: String,
    },
    samples: [
      {
        input: String,
        output: String,
      },
    ],
    config: {
      timeLimit: { type: Number, default: 2000 }, // 毫秒
      memoryLimit: { type: Number, default: 256 }, // MB
    },
    isPublic: { type: Boolean, default: false },
  },
  { timestamps: true },
);

ProblemSchema.pre('save', async function () {
  if (!this.problemId) {
    // 自动增长逻辑...
    const counter = await Counter.findOneAndUpdate(
      {
        id: 'problem_id',
      },
      {
        // 把当前记录里的 seq 字段的值，在原有基础上加上 1。
        $inc: { seq: 1 },
      },
      { new: true, upsert: true }, // 如果不存在就创建一个
    );
    this.problemId = counter.seq;
  } else {
    // 💡 同步逻辑：防止手动指定的 ID 与未来自动生成的 ID 冲突
    await Counter.findOneAndUpdate({ id: 'problem_id' }, { $max: { seq: this.problemId } }, { upsert: true });
  }
});

// 关键点：如果模型已存在则使用已有的，不存在再创建
const Problem: Model<Iproblem> = mongoose.models.Problem || mongoose.model('Problem', ProblemSchema);
export default Problem;
