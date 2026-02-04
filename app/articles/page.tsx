import Article from '@/models/Article';
import dbConnect from '@/lib/db';
import { Button, buttonVariants } from '@/components/ui/button';
import Link from 'next/link';
import { cn } from '@/lib/utils';

export default async function ArticlesPage() {
  await dbConnect();
  const articles = await Article.find();

  return (
    <div className='flex gap-2 max-w-300 mx-auto'>
      <div>
        <Link href='/articles/add' className={cn(buttonVariants({ variant: 'default' }), 'w-full gap-2')}>
          新增
        </Link>
        {articles.map((article) => (
          <p key={article.id}>
            <Link href={`/articles/${article.id}`}>{article.title}</Link>
          </p>
        ))}
      </div>
    </div>
  );
}
