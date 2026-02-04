import Problem from '@/models/Problem';
import { Battery } from 'lucide-react';
import Link from 'next/link';
import dbConnect from '@/lib/db';

import { Button, buttonVariants } from '@/components/ui/button';
import MarkdownViewer from '@/components/MarkdownViewer';
import { cn } from '@/lib/utils';

import ProblemClientContainer from './ProblemClientContainer';
import { DeleteProblemConfirmButton } from '@/components/DeleteConfirmButton';

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

// 3. 提交界面视图
const SubmitView = () => (
  <div className='bg-slate-50 p-6 border rounded-lg'>
    <h2 className='text-xl mb-4 font-bold'>代码编辑器</h2>
    {/* 这里可以放置你的代码编辑器组件 */}
    <textarea className='w-full h-80 p-4 font-mono border' placeholder='// 请输入代码...' />
    <div className='mt-4 flex justify-end'>
      <Button size='lg'>立即评测</Button>
    </div>
  </div>
);

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
      submitView={<SubmitView />}
    />
  );
};

export default Page;
