import ArticleEditForm from '@/app/(main)/articles/_components/ArticleEditForm';
import { CardDemo } from '@/app/(main)/articles/_components/CardDemo';
import { TagColor } from '@/models/Tag';
import { Dispatch, SetStateAction } from 'react';

export interface ArticleData {
  title: string;
  content: string;
}

export default function AddArticleAndPreview({
  tags,
  article,
  setArticle,
}: {
  tags: { _id: string; tagName: string; tagColor: TagColor }[];
  article: ArticleData;
  setArticle: Dispatch<SetStateAction<ArticleData>>;
}) {
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
