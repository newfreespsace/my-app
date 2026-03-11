'use client';

import { Button } from '@/components/ui/button';
import { Field, FieldGroup, FieldLabel } from '@/components/ui/field';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { createArticle, updateArticle } from '@/actions/articleActions';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import TagDropdownMenu from '../_components/TagDropdownMenu';
import { ArticleData } from '@/app/(main)/articles/_components/AddArticleAndPreview';
import { Dispatch, SetStateAction, useRef } from 'react';
import { TagColor } from '@/models/Tag';

import { supabase } from '@/lib/supabase';

export async function uploadFileAction(formData: FormData) {
  const file = formData.get('file') as File;
  if (!file) throw new Error('没有文件');

  const fileExt = file.name.split('.').pop();
  const fileName = `${Math.random()}.${fileExt}`;
  const filePath = `demo/${fileName}`;

  const arrayBuffer = await file.arrayBuffer();

  const { error } = await supabase.storage.from('my-app').upload(filePath, arrayBuffer, {
    contentType: file.type,
    upsert: false,
  });

  if (error) {
    console.error('上传失败:', error);
    return { success: false };
  }

  const {
    data: { publicUrl },
  } = supabase.storage.from('uploads').getPublicUrl(filePath);

  return { success: true, url: publicUrl };
}

const ArticleEditForm = ({
  existTags,
  tags,
  article,
  setArticle,
}: {
  tags: { _id: string; tagName: string; tagColor: TagColor }[];
  existTags: { _id: string; tagName: string; tagColor: TagColor }[];
  article: ArticleData;
  setArticle: Dispatch<SetStateAction<ArticleData>>;
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;

    setArticle((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // 2. 处理图片上传逻辑
  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      // 生成唯一的文件路径（避免重名覆盖）
      const fileExt = file.name.split('.').pop();
      const fileName = `${Math.random()}.${fileExt}`;
      const filePath = `demo/${fileName}`;

      // 将 File 转为 ArrayBuffer 供 Supabase 使用
      const arrayBuffer = await file.arrayBuffer();

      const { error } = await supabase.storage.from('my-app').upload(filePath, arrayBuffer, {
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
      } = supabase.storage.from('my-app').getPublicUrl(filePath);

      // 模拟返回的 URL
      const fakeUploadedUrl = `\n![图片描述](${publicUrl})\n`;

      // 3. 将 URL 更新到 content 中
      setArticle((prev) => ({
        ...prev,
        content: prev.content + fakeUploadedUrl,
      }));

      // 清空 input 以便下次选择同一张图也能触发
      if (fileInputRef.current) fileInputRef.current.value = '';

      alert('图片上传成功并已插入正文');
    } catch (error) {
      console.error('上传失败:', error);
    }
  };
  const isEditMode = !!article.id;
  const formAction = isEditMode ? updateArticle : createArticle;

  return (
    <Card className="">
      <CardContent>
        <form id="form-rhf-demo" action={formAction}>
          <FieldGroup>
            {isEditMode && article.id && <input type="hidden" name="id" value={article.id} />}
            <Field>
              <FieldLabel htmlFor="title">标题</FieldLabel>
              <Input
                id="title"
                name="title"
                placeholder="在此处输入标题"
                required
                value={article.title}
                onChange={handleChange}
              />
            </Field>
            <Field>
              <FieldLabel htmlFor="content">正文</FieldLabel>
              <Textarea
                id="content"
                name="content"
                placeholder="在此处输入正文"
                className="h-40"
                required
                value={article.content || ''}
                onChange={handleChange}
              />
            </Field>
            {/* 4. 修改后的上传部分 */}
            <Field>
              <FieldLabel>插入图片</FieldLabel>
              <input type="file" accept="image/*" className="hidden" ref={fileInputRef} onChange={handleImageUpload} />
              <Button type="button" variant="secondary" onClick={() => fileInputRef.current?.click()}>
                选择并上传图片
              </Button>
            </Field>
            <Field className="">
              <FieldLabel htmlFor="tagname">标签</FieldLabel>
              <TagDropdownMenu existTags={existTags} tags={tags} />
            </Field>
          </FieldGroup>
        </form>
      </CardContent>
      <CardFooter>
        <Field orientation="horizontal">
          <Button type="button" variant="outline">
            Reset
          </Button>

          <Button type="submit" form="form-rhf-demo">
            Submit
          </Button>
        </Field>
      </CardFooter>
    </Card>
  );
};

export default ArticleEditForm;
