import { supabase } from '@/lib/supabase';

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
