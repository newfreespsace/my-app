import Tag from '@/models/Tag';
import { COLOR_MAP } from '@/constants/colors';
import { cn } from '@/lib/utils';
import dbConnect from '@/lib/db';

const TagList = async () => {
  await dbConnect();
  const tags = await Tag.find({});

  console.log(tags);

  return (
    <div className='w-full mx-auto flex gap-2 ml-3 mt-3'>
      {tags.map((tag) => (
        <p key={tag.id} className={cn('inline-block text-center text-white pl-3 pr-3 rounded-sm', COLOR_MAP[tag.tagcolor])}>
          {tag.tagname}
        </p>
      ))}
    </div>
  );
};

export default TagList;
