import dbConnect from '@/lib/db';
import Tag from '@/models/Tag';

import { serialize } from '@/lib/utils';
import AddArticle from './AddArticle';

export default async function ArticleAddPage() {
  await dbConnect();
  const tags = await Tag.find();
  return <AddArticle tags={serialize(tags)} />;
}
