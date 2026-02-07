'use server';

import dbConnect from '@/lib/db';
import Article from '@/models/Article';
import Tag from '@/models/Tag';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

export const createArticleTag = async (tagcolor: string, formData: FormData) => {
  const tagname = formData.get('tagname') as string;

  if (!tagname || tagname.trim() === '') throw new Error('标签名称不能为空');

  await dbConnect();
  await Tag.create({ tagname, tagcolor });

  redirect(`/articles/taglist`);
};

export async function createArticle(formData: FormData) {
  'use server';

  await dbConnect();
  const rawFormData = {
    title: formData.get('title'),
    content: formData.get('content'),
  };

  await Article.create(rawFormData);
  revalidatePath('/articles');
  redirect(`/articles`); // 跳回列表页
}
