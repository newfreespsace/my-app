'use client';
import { useState } from 'react';
import AddArticleAndPreview, { ArticleData } from '../../_components/AddArticleAndPreview';

export default function EditArticle({ tags, existArticle }) {
  const [article, setArticle] = useState<ArticleData>(existArticle);
  return <AddArticleAndPreview tags={tags} article={article} setArticle={setArticle} />;
}
