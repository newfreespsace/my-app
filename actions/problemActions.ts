'use server';

import dbConnect from '@/lib/db'; // 导入你之前的连接逻辑
import Problem from '@/models/Problem';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

export const deleteProblem = async (id: string) => {
  let isSuccess = false;
  try {
    await dbConnect();
    await Problem.findByIdAndDelete(id);
    await new Promise((resolve) => setTimeout(resolve, 2000));
    isSuccess = true;
  } catch (error) {
    console.error('删除失败:', error);
  }
  if (isSuccess) {
    revalidatePath('/problems');
    redirect('/problems'); // ✅ 放在外面执行
  }
};

export async function calculateOnServer() {
  const startTime = performance.now(); // 开始计时

  let sum = 0;
  for (let i = 0; i < 100000000; i++) {
    sum += Math.floor(Math.random() * 11);
  }

  const endTime = performance.now(); // 结束计时
  const duration = (endTime - startTime).toFixed(2); // 保留两位小数，单位是毫秒

  return {
    sum,
    duration: parseFloat(duration),
  };
}
