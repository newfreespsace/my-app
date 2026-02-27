'use server';

import dbConnect from '@/lib/db';
import Todo from '@/models/Todo';
import TodoLog from '@/models/TodoLog';
import { revalidatePath } from 'next/cache';

export async function getTodosForToday() {
  await dbConnect();

  const now = new Date();
  const todayStart = new Date(now.setHours(0, 0, 0, 0));
  const todayEnd = new Date(now.setHours(23, 59, 59, 999));
  const dayOfMonth = todayStart.getDate(); // 1-31
  const dayOfWeek = todayStart.getDay() || 7; // 1-7 (周一到周日)

  return await Todo.find({
    $and: [
      { startDate: { $lte: todayEnd } }, // 任务必须已经开始
      {
        $or: [
          { endDate: { $exists: false } }, // 没有结束日期
          { endDate: null },
          { endDate: { $gte: todayStart } }, // 或者还没结束
        ],
      },
      {
        $or: [
          // 1. 单次任务：开始日期就是今天
          { 'recurrence.type': 'none', startDate: { $gte: todayStart, $lte: todayEnd } },

          // 2. 按天循环：总是显示 (或者可以加 interval 逻辑)
          { 'recurrence.type': 'daily' },

          // 3. 按周循环：判断今天周几是否在 value 数组中
          { 'recurrence.type': 'weekly', 'recurrence.value': dayOfWeek },

          // 4. 按月循环：判断今天几号是否在 value 数组中
          { 'recurrence.type': 'monthly', 'recurrence.value': dayOfMonth },
        ],
      },
    ],
  }).lean();
}

export async function getTodosWithStatus() {
  await dbConnect();

  const now = new Date();
  const todayStart = new Date(now.setHours(0, 0, 0, 0));

  const todos = await getTodosForToday();
  const logs = await TodoLog.find({
    date: todayStart,
    todoId: { $in: todos.map((t) => t._id) },
  }).lean();

  // 3. 将日志状态合并到 Todo 对象中
  const logSet = new Set(logs.map((l) => l.todoId.toString()));

  return todos.map((todo) => ({
    ...todo,
    completed: logSet.has(todo._id.toString()),
  }));
}

export async function toggleTodoLog(todoId: string, isCompleted: boolean) {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  try {
    if (isCompleted) {
      // 标记完成：创建日志
      await TodoLog.findOneAndUpdate({ todoId, date: today }, { todoId, date: today }, { upsert: true });
    } else {
      // 取消完成：删除日志
      await TodoLog.deleteOne({ todoId, date: today });
    }
    revalidatePath('/'); // 刷新页面数据
  } catch (error) {
    console.error('操作失败', error);
  }
}
