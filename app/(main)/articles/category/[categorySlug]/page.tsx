import Category from '@/models/Category';

import { Field, FieldGroup, FieldLabel } from '@/components/ui/field';
import { InputGroup, InputGroupButton, InputGroupInput } from '@/components/ui/input-group';
import dbConnect from '@/lib/db';
import { revalidatePath } from 'next/cache';
import Link from 'next/link';

export function InputGroupBlockEnd({ categorySlug }: { categorySlug: string }) {
  const submitChapters = async (formData: FormData) => {
    'use server';
    const newChapter = formData.get('chapters') as string;
    if (newChapter) {
      await dbConnect(); // 确保数据库已连接

      // 重点：使用 findByIdAndUpdate 直接在数据库层面进行 $push 操作
      await Category.findOneAndUpdate(
        { categorySlug },
        {
          $push: { chapters: { title: newChapter } },
        }
      );

      revalidatePath(`/articles/chapters/${categorySlug}`);
    }
  };

  return (
    <form action={submitChapters}>
      <FieldGroup className="max-w-sm">
        <Field>
          <FieldLabel htmlFor="chapters">新增章节</FieldLabel>
          <InputGroup>
            <InputGroupInput id="chapters" name="chapters" />
            <InputGroupButton type="submit">提交</InputGroupButton>
          </InputGroup>
        </Field>
      </FieldGroup>
    </form>
  );
}

const CategoryPage = async ({ params }: { params: Promise<{ categorySlug: string }> }) => {
  const { categorySlug } = await params;
  await dbConnect();
  const category = await Category.findOne({ categorySlug });
  if (!category) throw Error('无此分类');

  return (
    <div>
      <InputGroupBlockEnd categorySlug={categorySlug} />

      <h1 className="text-3xl">{category.name}</h1>
      <h1 className="text-xl">所有章节</h1>
      {category.chapters.map((chapters) => (
        <Link key={chapters.title} href={`#`} className="block">
          {chapters.title}
        </Link>
      ))}
    </div>
  );
};

export default CategoryPage;
