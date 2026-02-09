import Tag from '@/models/Tag';
import ArticleTagList from '../_components/ArticleTagList';
const Page = async () => {
  const tags = await Tag.find();
  return <ArticleTagList tags={tags} />;
};

export default Page;
