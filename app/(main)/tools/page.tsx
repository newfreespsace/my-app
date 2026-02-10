import dbConnect from '@/lib/db';
import Article from '@/models/Article';

import A from './A';

const tools = async () => {
  await dbConnect();
  const bulkData = [];
  const rawFormData = {
    title: 'aaa',
    content: 'bbbb',
  };

  for (let i = 1; i <= 1000; i++) {
    bulkData.push(rawFormData);
    // await Article.create(rawFormData);
  }
  await Article.insertMany(bulkData);
  console.log('ok');
  return (
    <div className='max-w-300 mx-auto'>
      <A index={'1'} />
    </div>
  );
};

export default tools;
