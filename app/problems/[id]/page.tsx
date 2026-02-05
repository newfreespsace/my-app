import Problem from '@/models/Problem';
import { Battery } from 'lucide-react';
import Link from 'next/link';
import dbConnect from '@/lib/db';

import { buttonVariants } from '@/components/ui/button';
import MarkdownViewer from '@/components/MarkdownViewer';
import { cn } from '@/lib/utils';

import ProblemClientContainer from './ProblemClientContainer';
import { DeleteProblemConfirmButton } from '@/components/DeleteConfirmButton';
import CodeEditor from '@/app/problems/_compontents/CodeEditor';
import CodeOptons from '@/app/problems/_compontents/CodeOptions';

// 1. 静态统计部分
const StatsView = () => (
  <div className='flex gap-6'>
    <div className='flex flex-col items-center justify-center'>
      <p className='text-4xl'>123</p>
      <p>通过</p>
    </div>
    <div className='flex flex-col items-center justify-center'>
      <p className='text-4xl'>2323</p>
      <p>提交</p>
    </div>
  </div>
);

const RightPart = ({ id }: { id: string }) => (
  <div className='flex-col gap-4 flex'>
    <div className='p-4 flex flex-col max-w-65'>
      <Link href='#' className={cn(buttonVariants({ variant: 'ghost' }), 'justify-start rounded-none')}>
        <Battery />
        提交记录
      </Link>
      <Link href='#' className={cn(buttonVariants({ variant: 'ghost' }), 'justify-start rounded-none')}>
        <Battery />
        统计
      </Link>
      <Link href='#' className={cn(buttonVariants({ variant: 'ghost' }), 'justify-start rounded-none')}>
        <Battery />
        讨论
      </Link>
      <Link href='#' className={cn(buttonVariants({ variant: 'ghost' }), 'justify-start rouned-none')}>
        <Battery />
        文件
      </Link>
    </div>
    <div className='p-4 flex flex-col max-w-65'>
      <Link href='#' className={cn(buttonVariants({ variant: 'ghost' }), 'justify-start rounded-none')}>
        <Battery />
        编辑
      </Link>
      <DeleteProblemConfirmButton id={id} />
    </div>
  </div>
);

const DescriptionView = ({ content }: { content: string }) => <MarkdownViewer content={content} />;

const Page = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;
  await dbConnect();
  const problem = await Problem.findOne({ problemId: id });

  if (!problem) {
    throw new Error('该题目已不存在或已被删除');
  }

  return (
    <ProblemClientContainer
      problemId={problem.problemId}
      problemTitle={problem.title}
      statsView={<StatsView />}
      descriptionView={<DescriptionView content={problem.content} />}
      rightPart={<RightPart id={problem.id} />}
    />
  );
};

export default Page;
