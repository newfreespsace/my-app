import Category from '@/models/Category';

import { Field, FieldGroup, FieldLabel } from '@/components/ui/field';
import { InputGroup, InputGroupButton, InputGroupInput } from '@/components/ui/input-group';
import dbConnect from '@/lib/db';
import { revalidatePath } from 'next/cache';
import Link from 'next/link';

function InputGroupBlockEnd() {
  const submitCategory = async (formData: FormData) => {
    'use server';
    const newCategory = formData.get('categoryName') as string;
    if (newCategory) {
      await Category.create({ categoryName: newCategory });
      revalidatePath('/articles/category');
    }
  };

  return (
    <form action={submitCategory}>
      <FieldGroup className="max-w-sm">
        <Field>
          <FieldLabel htmlFor="category">新增分类</FieldLabel>
          <InputGroup>
            <InputGroupInput id="categoryName" name="categoryName" />
            <InputGroupButton type="submit">提交</InputGroupButton>
          </InputGroup>
        </Field>
      </FieldGroup>
    </form>
  );
}

export default async function AllCategoryPage() {
  await dbConnect();
  const categorys = await Category.find();

  return (
    <div>
      <InputGroupBlockEnd />
      <h1 className="text-3xl">所有分类</h1>
      {categorys.map((category) => (
        <Link key={category.categoryName} href={`/articles/category/${category._id}`} className="block">
          {category.categoryName}
        </Link>
      ))}
    </div>
  );
}
