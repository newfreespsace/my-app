import Problem from '@/models/Problem';
import { Battery, Edit } from 'lucide-react';
import Link from 'next/link';
import mongoose from 'mongoose';
import dbConnect from '@/lib/db';

import { Button, buttonVariants } from '@/components/ui/button';
import { ProblemDeleteButton } from '@/components/DeleteButton';
import MarkdownViewer from '@/components/MarkdownViewer';
import { cn } from '@/lib/utils';

import ProblemClientContainer from './ProblemClientContainer';
import CodeEditor from '@/components/CodeEditor';

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
      <Link
        href='#'
        className={cn(
          buttonVariants({ variant: 'default' }),
          'bg-(--color-chart-2) hover:bg-(--color-chart-3) text-white',
          'justify-start gap-2 rounded-none',
        )}
      >
        <Battery />
        提交
      </Link>
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
    <div className='p-4'>右边2</div>
    <div className='p-4 flex gap-2'>
      <Button>
        <Edit />
        编辑
      </Button>
      <ProblemDeleteButton id={id} />
    </div>
  </div>
);

const DescriptionView = ({ content }: { content: string }) => <MarkdownViewer content={content} />;

// 3. 提交界面视图
const SubmitView = () => (
  <div className='bg-slate-50 p-6 border rounded-lg'>
    <div className='flex justify-between items-center mb-4'>
      <h2 className='text-xl font-bold'>代码编辑器</h2>
      {/* 这里可以加一个语言切换器 */}
      <select className='border p-1 rounded text-sm'>
        <option>JavaScript</option>
        <option>C++</option>
        <option>Python</option>
      </select>
    </div>

    {/* 使用 Monaco 编辑器代替原本的 textarea */}
    <CodeEditor />

    <div className='mt-4 flex justify-end gap-2'>
      <Button variant='outline'>保存草稿</Button>
      <Button size='lg'>立即评测</Button>
    </div>
  </div>
);

const Page = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;
  if (!mongoose.isValidObjectId(id)) {
    throw new Error('错误的 ID，请检查您的输入！');
  }
  await dbConnect();
  const problem = await Problem.findById(id);

  if (!problem) {
    throw new Error('该题目已不存在或已被删除');
  }

  return (
    <ProblemClientContainer
      problemTitle={problem.title}
      statsView={<StatsView />}
      descriptionView={<DescriptionView content={problem.content} />}
      rightPart={<RightPart id={problem.id} />}
      submitView={<SubmitView />}
    />
  );
};

export default Page;
