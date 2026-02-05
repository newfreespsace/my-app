'use server';

import dbConnect from '@/lib/db'; // 导入你之前的连接逻辑
import Problem from '@/models/Problem';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { writeFile } from 'fs/promises';
import { join, resolve } from 'path';
import { supabase } from '@/lib/supabase';

export const deleteProblem = async (id: number) => {
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

export async function uploadFileAction(formData: FormData) {
  const file = formData.get('file') as File;
  if (!file) throw new Error('没有文件');

  // 生成唯一的文件路径（避免重名覆盖）
  const fileExt = file.name.split('.').pop();
  const fileName = `${Math.random()}.${fileExt}`;
  const filePath = `demo/${fileName}`;

  // 将 File 转为 ArrayBuffer 供 Supabase 使用
  const arrayBuffer = await file.arrayBuffer();

  const { data, error } = await supabase.storage.from('my-app').upload(filePath, arrayBuffer, {
    contentType: file.type,
    upsert: false,
  });

  if (error) {
    console.error('上传失败:', error);
    return { success: false };
  }

  // 获取文件的公开访问链接
  const {
    data: { publicUrl },
  } = supabase.storage.from('uploads').getPublicUrl(filePath);

  return { success: true, url: publicUrl };
}

export async function ProblemTestDataList(problemId: number) {
  // list 方法接收两个参数：
  // 1. 路径（文件夹名）
  // 2. 配置项（可选，如排序、限制数量、偏移量等）
  const { data, error } = await supabase.storage
    .from('my-app') // 你的 Bucket 名字
    .list(`testdata/${problemId}`, {
      limit: 100, // 获取前 100 个文件
      offset: 0, // 跳过前 0 个
      sortBy: { column: 'name', order: 'asc' }, // 按名称升序排列
    });

  await new Promise((resolve) => setTimeout(resolve, 4000));

  if (error) {
    console.error('获取列表失败:', error);
    return { success: false, files: [] };
  }

  // data 是一个数组，包含文件的元数据：name, id, created_at, metadata 等
  return { success: true, files: data };
}

export async function uploadProblemTestData(formData: FormData, problemId: number) {
  const file = formData.get('file') as File;
  if (!file) throw new Error('没有文件');

  // 生成唯一的文件路径（避免重名覆盖）
  // const fileExt = file.name.split('.').pop();
  // const fileName = `${Math.random()}.${fileExt}`;
  const filePath = `testdata/${problemId}/${file.name}`;

  // 将 File 转为 ArrayBuffer 供 Supabase 使用
  const arrayBuffer = await file.arrayBuffer();

  const { data, error } = await supabase.storage.from('my-app').upload(filePath, arrayBuffer, {
    contentType: file.type,
    upsert: false,
  });

  if (error) {
    console.error('上传失败:', error);
    return { success: false };
  }

  revalidatePath(`/problems/${problemId}/testdata`);

  // 获取文件的公开访问链接
  const {
    data: { publicUrl },
  } = supabase.storage.from('uploads').getPublicUrl(filePath);

  return { success: true, url: publicUrl };
}
