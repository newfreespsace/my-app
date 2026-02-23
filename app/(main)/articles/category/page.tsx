import Category from '@/models/Category';

import { Field, FieldGroup, FieldLabel } from '@/components/ui/field';
import { InputGroup, InputGroupButton, InputGroupInput } from '@/components/ui/input-group';
import dbConnect from '@/lib/db';
import { revalidatePath } from 'next/cache';
import Link from 'next/link';
import delay from '@/lib/delay';

export function InputGroupBlockEnd() {
  const submitCategory = async (formData: FormData) => {
    'use server';
    const newCategory = formData.get('category') as string;
    if (newCategory) {
      await Category.create({ name: newCategory });
      revalidatePath('/articles/category');
    }
  };

  return (
    <form action={submitCategory}>
      <FieldGroup className="max-w-sm">
        <Field>
          <FieldLabel htmlFor="category">新增分类</FieldLabel>
          <InputGroup>
            <InputGroupInput id="category" name="category" />
            <InputGroupButton type="submit">提交</InputGroupButton>
          </InputGroup>
        </Field>
      </FieldGroup>
    </form>
  );
}

export default async function AllCategoryPage() {
  await delay(3000);
  await dbConnect();
  const categorys = await Category.find();

  return (
    <div>
      <InputGroupBlockEnd />

      <h1 className="text-3xl">所有分类</h1>
      {categorys.map((category) => (
        <Link key={category.name} href={`/articles/category/${category.categorySlug}`} className="block">
          {category.name}
        </Link>
      ))}
    </div>
  );
}
