'use server';

import dbConnect from '@/lib/db'; // 导入你之前的连接逻辑
import Problem from '@/models/Problem';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { writeFile } from 'fs/promises';
import { join } from 'path';

export const deleteProblem = async (id: string) => {
  let isSuccess = false;
  try {
    await dbConnect();
    await Problem.findByIdAndDelete(id);
    await new Promise((resolve) => setTimeout(resolve, 4000));
    isSuccess = true;
  } catch (error) {
    console.error('删除失败:', error);
  }
  if (isSuccess) {
    revalidatePath('/problems');
    redirect('/problems'); // ✅ 放在外面执行
  }
};

function check(a: number) {
  for (let i = 2; i * i <= a; i++) {
    if (a % i == 0) return false;
  }
  return true;
}

export async function calculateOnServer(a: number) {
  const startTime = performance.now(); // 开始计时

  let num;
  while (true) {
    if (check(a) && check(a + 2)) {
      num = a;
      break;
    }
    a++;
  }

  const endTime = performance.now(); // 结束计时
  const duration = (endTime - startTime).toFixed(2); // 保留两位小数，单位是毫秒

  return {
    num,
    duration: parseFloat(duration),
  };
}

export async function submitCode(language: string, code: string) {
  console.log(language);
  console.log(code);
  await new Promise((resolve) => setTimeout(resolve, 4000));
}

export async function uploadFile(formData: FormData) {
  const file = formData.get('file') as File;

  if (!file || file.size === 0) {
    throw new Error('请选择一个有效文件');
  }

  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);

  // 设定保存路径，这里保存在项目根目录的 /public 文件夹下
  const path = join(process.cwd(), 'public', file.name);

  await writeFile(path, buffer);
  console.log(`文件已成功保存至: ${path}`);

  return { success: true, fileName: file.name };
}
