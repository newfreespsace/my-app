import Problem from '@/models/Problem';
import dbConnect from '@/lib/db';
import { buttonVariants } from '@/components/ui/button';
import Link from 'next/link';
import ProblemListTable from '@/app/(main)/problems/_components/ProblemListTable';
import PaginationWithTotalPage from '@/components/PaginationWithTotalPage';
import { auth } from '@/auth';
import User from '@/models/User';

interface Problem {
  _id: string | number;
  content: string;
}

export default async function Page({ searchParams }: { searchParams: Promise<{ page?: string }> }) {
  await dbConnect();

  const params = await searchParams;
  const page = Number(params.page) || 1;
  const limit = 10;
  const skip = (page - 1) * limit;

  const [rawProblems, totalPages] = await Promise.all([
    Problem.find().skip(skip).limit(limit).sort('problemId').lean(),
    Problem.countDocuments(),
  ]);

  const problems = JSON.parse(JSON.stringify(rawProblems));

  return (
    <div className="max-w-300 flex flex-col m-auto w-[calc(100vw-50px)] gap-4">
      <div className="ml-auto mt-4 gap-1">
        <Link href="/problems/add" className={buttonVariants({})}>
          新增题目
        </Link>
      </div>
      <div className="mt-4">
        <ProblemListTable problems={problems} />
      </div>
      <PaginationWithTotalPage totalPages={totalPages} />
    </div>
  );
}
