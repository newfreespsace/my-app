import Problem from '@/models/Problem';
import dbConnect from '@/lib/db';
import { buttonVariants } from '@/components/ui/button';
import Link from 'next/link';
import ProblemListTable from '@/app/(main)/problems/_components/ProblemListTable';
import PaginationForArticles from '@/components/PaginationForArticles';
import { auth } from '@/auth';
import User from '@/models/User';

// 1. 定义单个 Problem 的结构
interface Problem {
  _id: string | number;
  content: string;
  // 如果还有其他字段，可以在这里继续添加，例如：
  // title?: string;
}

// 2. 定义组件 Props 的接口

export default async function Page({ searchParams }: { searchParams: Promise<{ page?: string }> }) {
  await dbConnect();
  const rawProblems = await Problem.find().sort('problemId');
  // 关键步骤：转换
  const problems = JSON.parse(JSON.stringify(rawProblems));

  return (
    <div className="max-w-300 flex flex-col m-auto w-[calc(100vw-50px)] gap-4">
      <div className="ml-auto mt-4 gap-1">
        <Link href="/problems/add" className={buttonVariants({})}>
          新增题目
        </Link>
      </div>
      <div className="mt-4">
        <ProblemListTable problems={safaProblems} totalPages={totalPages} />
      </div>
      <PaginationForArticles totalPages={totalPages} />
    </div>
  );
}
