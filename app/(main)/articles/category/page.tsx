import Category from '@/models/Category';

import { Field, FieldGroup, FieldLabel } from '@/components/ui/field';
import { InputGroup, InputGroupButton, InputGroupInput } from '@/components/ui/input-group';

export function InputGroupBlockEnd() {
  const submitCategory = async (formData: FormData) => {
    'use server';
    const newCategory = formData.get('category');
    console.log(newCategory);
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

export default async function CategoryPage() {
  const categorys = await Category.find();

  return (
    <div>
      <InputGroupBlockEnd />

      <h1 className="text-3xl">所有分类</h1>
      {categorys.map((category) => (
        <p key={category.name}>{category.name}</p>
      ))}
    </div>
  );
}

// test .....
