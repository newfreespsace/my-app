'use client';

import { Button } from '@/components/ui/button';
import { Field, FieldGroup, FieldLabel } from '@/components/ui/field';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { createArticle } from '@/actions/articleActions';
import { Card, CardContent, CardFooter } from '@/components/ui/card';

import TagDropdownMenu from '../_components/TagDropdownMenu';

import { ArticleData } from '@/app/(main)/articles/add/AddArticleAndPreview';
import { Dispatch, SetStateAction } from 'react';

const ArticleEditForm = ({
  tags,
  article,
  setArticle,
}: {
  tags: { id: string; tagName: string }[];
  article: ArticleData;
  setArticle: Dispatch<SetStateAction<ArticleData>>;
}) => {
  // 通用的处理函数
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;

    // 使用函数式更新，确保逻辑正确
    setArticle((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <Card className="">
      <CardContent>
        <form id="form-rhf-demo" action={createArticle}>
          <FieldGroup>
            <Field>
              <FieldLabel htmlFor="title">标题</FieldLabel>
              <Input
                id="title"
                name="title"
                placeholder="标题"
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
                placeholder="正文"
                className="h-40"
                required
                value={article.content}
                onChange={handleChange}
              />
            </Field>
            <Field className="">
              <FieldLabel htmlFor="tagname">标签</FieldLabel>
              <TagDropdownMenu tags={tags} />
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
