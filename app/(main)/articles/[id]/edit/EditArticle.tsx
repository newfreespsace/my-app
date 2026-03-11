'use client';
import { useState } from 'react';
import AddArticleAndPreview, { ArticleData } from '../../_components/AddArticleAndPreview';
import { TagColor } from '@/models/Tag';

export default function EditArticle({
  existTags,
  tags,
  existArticle,
}: {
  tags: { _id: string; tagName: string; tagColor: TagColor }[];
  existTags: { _id: string; tagName: string; tagColor: TagColor }[];
  existArticle: { id: string; title: string; content: string | null | undefined };
}) {
  const [article, setArticle] = useState<ArticleData>(existArticle);
  return <AddArticleAndPreview existTags={existTags} tags={tags} article={article} setArticle={setArticle} />;
}
