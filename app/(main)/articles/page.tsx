import Article from '@/models/Article';
import dbConnect from '@/lib/db';
import { buttonVariants } from '@/components/ui/button';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import ArticleTitleListTable from './_components/ArticleTitleListTable';
import PaginationForArticles from '@/components/PaginationWithTotalPage';

export default async function ArticlesPage({ searchParams }: { searchParams: Promise<{ page?: string }> }) {
  await dbConnect();

  // 1. 解析参数
  const params = await searchParams;
  const page = Number(params.page) || 1; // 当前页码，默认为 1
  const limit = 10; // 每页显示条数
  const skip = (page - 1) * limit; // 跳过的条数

  // 2. 并行执行：获取分页数据和总数
  const [articles, total] = await Promise.all([
    Article.find().skip(skip).limit(limit).lean(),
    Article.countDocuments(),
  ]);

  const totalPages = Math.ceil(total / limit);

  const safaArticles = articles.map((article) => ({
    id: article._id.toString(),
    title: article.title,
    createTime: article.createdAt,
  }));

  return (
    <div className="w-[calc(100vw-50px)] max-w-300 mx-auto gap-2 flex flex-col">
      <div className="flex gap-2 justify-end">
        <Link href="/articles/category" className={cn(buttonVariants({ variant: 'default' }))}>
          新增章节
        </Link>
        <Link href="/articles/add" className={cn(buttonVariants({ variant: 'default' }))}>
          新增文章
        </Link>
        <Link href="/articles/addtag" className={cn(buttonVariants({ variant: 'default' }))}>
          新增标签
        </Link>
        <Link href="/articles/taglist" className={cn(buttonVariants({ variant: 'default' }))}>
          已有标签
        </Link>
      </div>
      <div>
        <ArticleTitleListTable articles={safaArticles} />
      </div>
      <PaginationForArticles totalPages={totalPages} />
    </div>
  );
}
