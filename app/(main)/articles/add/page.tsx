import dbConnect from '@/lib/db';
import Tag from '@/models/Tag';

import AddArticleAndPreview from '@/app/(main)/articles/add/AddArticleAndPreview';
import { serialize } from '@/lib/utils';

export default async function ArticleAddPage() {
  await dbConnect();
  const tags = await Tag.find().lean();
  // console.log(tags);

  // const safeTags = tags.map((tag) => ({
  //   id: tag.id.toString(), // 假设 id 是个特殊对象
  //   tagName: tag.tagname,
  // }));

  return <AddArticleAndPreview tags={serialize(tags)} />;
}
