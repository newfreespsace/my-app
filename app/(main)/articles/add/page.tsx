import dbConnect from '@/lib/db';
import Tag from '@/models/Tag';

import AddArticleAndPreview from '@/app/(main)/articles/add/AddArticleAndPreview';
import { serialize } from '@/lib/utils';

export default async function ArticleAddPage() {
  await dbConnect();
  const tags = await Tag.find();
  return <AddArticleAndPreview tags={serialize(tags)} />;
}
