'use client';
import { useState } from 'react';
import AddArticleAndPreview, { ArticleData } from '../_components/AddArticleAndPreview';
import { TagColor } from '@/models/Tag';

export default function AddArticle({ tags }: { tags: { _id: string; tagName: string; tagColor: TagColor }[] }) {
  const [article, setArticle] = useState<ArticleData>({ title: '', content: '' });
  return <AddArticleAndPreview existTags={[]} tags={tags} article={article} setArticle={setArticle} />;
}
