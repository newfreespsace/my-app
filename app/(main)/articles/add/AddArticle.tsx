'use client';
import { useState } from 'react';
import AddArticleAndPreview, { ArticleData } from '../_components/AddArticleAndPreview';

export default function AddArticle({ tags }) {
  const [article, setArticle] = useState<ArticleData>({ title: '', content: '' });
  return <AddArticleAndPreview tags={tags} article={article} setArticle={setArticle} />;
}
