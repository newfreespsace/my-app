'use client';

import ArticleEditForm from '@/app/(main)/articles/_components/ArticleEditForm';
import { CardDemo } from '@/app/(main)/articles/add/CardDemo';
import { useState } from 'react';

export interface ArticleData {
  title: string;
  content: string;
}

export default function AddArticleAndPreview({ tags }: { tags: { id: string; tagName: string }[] }) {
  const [article, setArticle] = useState<ArticleData>({ title: '', content: '' });
  return (
    <div className=" w-[calc(100vw-40px)] mx-auto mt-4 flex gap-4">
      <div className="flex-1">
        <ArticleEditForm tags={tags} article={article} setArticle={setArticle} />
      </div>
      <div className="flex-1">
        <CardDemo article={article} />
      </div>
    </div>
  );
}
