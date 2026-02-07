'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Field, FieldGroup, FieldLabel } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { useState } from 'react';
import { ColorPicker } from './_components/ColorPicker';
import { createArticleTag } from '@/actions/articleActions';

export default function AddTag() {
  const [color, setColor] = useState('red');
  const createArticleTagWithColor = createArticleTag.bind(null, color);
  return (
    <Card className='w-full sm:max-w-md mx-auto mt-4'>
      <CardContent>
        <form id='form-rhf-demo' action={createArticleTagWithColor}>
          <FieldGroup>
            <Field>
              <FieldLabel htmlFor='tagname'>标签名称</FieldLabel>
              <Input
                id='tagname'
                name='tagname'
                placeholder='标签名'
                required
              />
            </Field>
            <Field>
              <FieldLabel htmlFor='tagcolor'>标签颜色</FieldLabel>
              <ColorPicker value={color} onChange={setColor} />
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
}
