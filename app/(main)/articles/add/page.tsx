import ArticleEditForm from '@/app/(main)/articles/_components/ArticleEditForm';
import dbConnect from '@/lib/db';
import Tag from '@/models/Tag';

export default async function ArticleAddPage() {
  await dbConnect();
  const tags = await Tag.find();

  const safeTags = tags.map((tag) => ({
    id: tag.id.toString(), // 假设 id 是个特殊对象
    tagName: tag.tagname,
  }));
  return <ArticleEditForm tags={safeTags} />;
}
