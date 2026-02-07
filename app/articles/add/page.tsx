import { Button } from '@/components/ui/button';
import { Field, FieldGroup, FieldLabel } from '@/components/ui/field';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { createArticle } from '@/actions/articleActions';
import { Card, CardContent, CardFooter } from '@/components/ui/card';

import TagDropdownMenu from '../_components/TagDropdownMenu';
import Tag from '@/models/Tag';
import dbConnect from '@/lib/db';

const Page = async () => {
  await dbConnect();
  const tags = await Tag.find();

  const safeTags = tags.map((tag) => ({
    id: tag.id.toString(), // 假设 id 是个特殊对象
    tagname: tag.tagname,
  }));

  return (
    <Card className='w-full sm:max-w-md mx-auto mt-4'>
      <CardContent>
        <form id='form-rhf-demo' action={createArticle}>
          <FieldGroup>
            <Field>
              <FieldLabel htmlFor='title'>标题</FieldLabel>
              <Input id='title' name='title' placeholder='标题' required />
            </Field>
            <Field>
              <FieldLabel htmlFor='content'>正文</FieldLabel>
              <Textarea id='content' name='content' placeholder='正文' className='h-40' required />
            </Field>
            <Field>
              <FieldLabel htmlFor='tagname'>标签</FieldLabel>
              <TagDropdownMenu tags={safeTags} />
            </Field>
          </FieldGroup>
        </form>
      </CardContent>
      <CardFooter>
        <Field orientation='horizontal'>
          <Button type='button' variant='outline'>
            Reset
          </Button>
          <Button type='submit' form='form-rhf-demo'>
            Submit
          </Button>
        </Field>
      </CardFooter>
    </Card>
  );
};

export default Page;
