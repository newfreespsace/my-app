'use client';

import { useState } from 'react';
import { Separator } from '@/components/ui/separator';
import { Button, buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import CodeEditor from '@/app/(main)/problems/_components/CodeEditor';
import CodeOptons from '@/app/(main)/problems/_components/CodeOptions';
import { toast } from 'sonner'; // 假设你使用了 toast 提示
import { submitCode } from '@/actions/problemActions';
import MarkdownViewer from '@/app/(main)/_components/MarkdownViewer';
import { DeleteProblemConfirmButton } from '@/app/(main)/problems/_components/DeleteConfirmButton';
import { Battery } from 'lucide-react';
import Link from 'next/link';
import { Iproblem } from '@/models/Problem';

interface Props {
  problem: Iproblem;
}

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

const RightPart = ({ id }: { id: number }) => (
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
      <Link href={`/problems/${id}/testdata`} className={cn(buttonVariants({ variant: 'ghost' }), 'justify-start rouned-none')}>
        <Battery />
        测试数据
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

export default function ProblemClientContainer({ problem }: Props) {
  const [isEditorMode, setIsEditorMode] = useState(false);

  const [language, setLanguage] = useState('cpp');
  const [code, setCode] = useState('// 请开始你的表演...');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async () => {
    if (!code || code.length < 10) {
      return toast.error('代码太短了，再写点吧！');
    }

    setIsSubmitting(true);
    try {
      // 这里调用你的 Server Action 或 API
      setIsSubmitting(true);
      console.log('提交数据:', { language, code });
      toast.success('提交成功，正在评测...');

      // 模拟请求
      await submitCode(language, code);
    } catch (error) {
      toast.error(`提交失败, ${error}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className='w-full'>
      {/* Header 保持在容器内部，这样按钮才能访问到状态 */}
      <header className='flex gap-2 max-w-300 m-auto justify-between pt-4 px-4'>
        <div className='flex flex-col gap-4 mt-4 mb-4'>
          <p className='text-4xl font-bold'>{`#${problem.problemId}. ${problem.title}`}</p>
          <div className='flex gap-2'>
            <Button
              onClick={() => setIsEditorMode(!isEditorMode)}
              className={cn(buttonVariants({ variant: 'default' }), 'bg-(--color-chart-2) hover:bg-(--color-chart-3) text-white')}
            >
              {isEditorMode ? '返回题目' : '提交代码'}
            </Button>
          </div>
        </div>
        <StatsView />
      </header>

      <Separator />

      <div className='flex gap-4 mt-3 max-w-300 m-auto items-start'>
        {isEditorMode ? (
          <>
            <div className='flex-2'>
              {/* 根据状态渲染不同的服务端内容 */}
              {/* {codeEditor} */}
              <CodeEditor language={language} code={code} setCode={(val) => setCode(val || '')} />
            </div>
            <div className='flex-1 flex flex-col gap-2'>
              <CodeOptons language={language} setLanguage={setLanguage} />
              <Button size='lg' onClick={handleSubmit} disabled={isSubmitting}>
                立即评测
              </Button>
            </div>
          </>
        ) : (
          <>
            <div className='flex-2'>
              <main className='mt-3 max-w-300 m-auto px-4'>
                {/* <DescriptionView content={problem.content} /> */}
                {problem.content.description && (
                  <>
                    <h1 className='text-2xl font-bold'>题目描述</h1>
                    <MarkdownViewer content={problem.content.description} />
                  </>
                )}
                {problem.content.input_format && (
                  <>
                    <h1 className='text-2xl font-bold'>输入格式</h1>
                    <MarkdownViewer content={problem.content.input_format} />
                  </>
                )}
                {problem.content.output_format && (
                  <>
                    <h1 className='text-2xl font-bold'>输出格式</h1>
                    <MarkdownViewer content={problem.content.output_format} />
                  </>
                )}
                {problem.samples.length > 0 && (
                  <div className='border-2'>
                    <h2 className='text-2xl font-bold'>样例</h2>
                    {problem.samples.map((sample, index) => (
                      <div key={sample.input} className='flex gap-4'>
                        <div>
                          <h1 className='text-xl font-bold'>样例输入 {problem.samples.length > 1 && index + 1}</h1>
                          <MarkdownViewer content={sample.input} />
                        </div>
                        <div>
                          <h1 className='text-xl font-bold'>样例输出 {problem.samples.length > 1 && index + 1}</h1>
                          <MarkdownViewer content={sample.output} />
                        </div>
                        <Separator />
                      </div>
                    ))}
                  </div>
                )}

                {problem.content.hint && (
                  <>
                    <h1 className='text-2xl font-bold'>数据范围和提示</h1>
                    <MarkdownViewer content={problem.content.hint} />
                  </>
                )}
              </main>
            </div>
            <div className='flex-1'>
              <RightPart id={problem.problemId} />
            </div>
          </>
        )}
      </div>
    </div>
  );
}
