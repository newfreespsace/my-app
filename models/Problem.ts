import mongoose from 'mongoose';
import Counter from './Counter';

const ProblemSchema = new mongoose.Schema(
  {
    problemId: { type: Number, unique: true },
    title: { type: String, required: true },
    content: { type: String, required: true },
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
export default mongoose.models.Problem || mongoose.model('Problem', ProblemSchema);
