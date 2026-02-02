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
