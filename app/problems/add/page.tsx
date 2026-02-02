import { Button } from '@/components/ui/button';
import { Field, FieldGroup, FieldLabel } from '@/components/ui/field';

import { Textarea } from '@/components/ui/textarea';
import Problem from '@/models/Problem';
import dbConnect from '@/lib/db';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { Input } from '@/components/ui/input';

const Page = () => {
  async function createProblem(formData: FormData) {
    'use server';

    await dbConnect();
    console.log('aa');
    const rawFormData = {
      title: formData.get('title'),
      content: formData.get('content'),
    };

    const problem = await Problem.create(rawFormData);
    revalidatePath('/problems');
    redirect('/problems'); // 跳回列表页

    console.log(problem);
  }

  return (
    <form action={createProblem}>
      <FieldGroup>
        <Field>
          <FieldLabel htmlFor='title'>标题</FieldLabel>
          <Input id='title' name='title' placeholder='' className='resize-none' />
        </Field>
        <Field>
          <FieldLabel htmlFor='content'>正文</FieldLabel>
          <Textarea id='content' name='content' placeholder='' className='resize-none' />
        </Field>
        <Field orientation='horizontal'>
          <Button type='submit'>Submit</Button>
        </Field>
      </FieldGroup>
    </form>
  );
};

export default Page;
