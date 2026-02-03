import Problem from '@/models/Problem';
import { Battery, Edit } from 'lucide-react';
import Link from 'next/link';
import mongoose from 'mongoose';
import dbConnect from '@/lib/db';

import { Button, buttonVariants } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { ProblemDeleteButton } from '@/components/DeleteButton';
import MarkdownViewer from '@/components/MarkdownViewer';
import { cn } from '@/lib/utils';

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
    <>
      <div className=''>
        <header className=' flex gap-2  max-w-300 m-auto justify-between pt-4'>
          <div className='flex flex-col gap-4 mt-4 mb-4'>
            <p className='text-4xl bold'>{`#137. ${problem.title}`}</p>
            <div className='flex gap-2'>
              <Button>占位</Button>
              <Button>占位</Button>
              <Button>占位</Button>
            </div>
          </div>
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
        </header>
        <Separator />

        <div className='flex gap-4 mt-3 max-w-300 m-auto items-start'>
          <div className='flex-2'>
            <MarkdownViewer content={problem.content} />
          </div>
          <div className='flex-1 flex-col gap-4 flex'>
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
        </div>
      </div>
    </>
  );
};

export default Page;
