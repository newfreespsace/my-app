import dbConnect from '@/lib/db';
import Tag from '@/models/Tag';

import { serialize } from '@/lib/utils';
import EditArticle from './EditArticle';
import Article from '@/models/Article';

export default async function ArticleEditPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  await dbConnect();
  const article = await Article.findById(id).populate('tags');
  const tags = await Tag.find();
  if (!article) throw Error('Some Thing Wrong! Please Try Again!');

  return (
    <EditArticle
      existTags={serialize(article.tags)}
      tags={serialize(tags)}
      existArticle={{ id: article.id, title: article.title, content: article.content }}
    />
  );
}
