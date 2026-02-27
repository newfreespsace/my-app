import mongoose from 'mongoose';

const TodoLogSchema = new mongoose.Schema(
  {
    todoId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Todo',
      required: true,
    },
    date: {
      type: Date,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

TodoLogSchema.index({ todoId: 1, date: 1 }, { unique: true });

const TodoLog = mongoose.models.TodoLog || mongoose.model('TodoLog', TodoLogSchema);
export default TodoLog;
