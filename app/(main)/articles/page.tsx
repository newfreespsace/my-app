import Article from '@/models/Article';
import dbConnect from '@/lib/db';
import { buttonVariants } from '@/components/ui/button';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import ArticleListTable from './_components/ArticleTitleListTable';

export default async function ArticlesPage() {
  await dbConnect();
  const articles = await Article.find();

  const safaArticles = articles.map((article) => ({
    id: article.id,
    title: article.title,
  }));

  return (
    <div className=' max-w-300 mx-auto'>
      <div className='flex gap-2 mt-2'>
        <Link href='/articles/add' className={cn(buttonVariants({ variant: 'default' }))}>
          新增文章
        </Link>
        <Link href='/articles/addtag' className={cn(buttonVariants({ variant: 'default' }))}>
          新增标签
        </Link>
        <Link href='/articles/taglist' className={cn(buttonVariants({ variant: 'default' }))}>
          已有标签
        </Link>
      </div>
      <div>
        <ArticleListTable articles={safaArticles} />
      </div>
    </div>
  );
}
