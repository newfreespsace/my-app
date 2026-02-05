'use client';

import { useState } from 'react';
import { Separator } from '@/components/ui/separator';
import { Button, buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import CodeEditor from '@/app/problems/_compontents/CodeEditor';
import CodeOptons from '@/app/problems/_compontents/CodeOptions';
import { toast } from 'sonner'; // 假设你使用了 toast 提示
import { submitCode } from '@/actions/problemActions';

interface Props {
  problemId: number;
  problemTitle: string;
  descriptionView: React.ReactNode;
  rightPart: React.ReactNode;
  statsView: React.ReactNode; // 提取出来的通过数/提交数统计部分
}

export default function ProblemClientContainer({ problemId, problemTitle, descriptionView, rightPart, statsView }: Props) {
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
      toast.error('提交失败');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className='w-full'>
      {/* Header 保持在容器内部，这样按钮才能访问到状态 */}
      <header className='flex gap-2 max-w-300 m-auto justify-between pt-4 px-4'>
        <div className='flex flex-col gap-4 mt-4 mb-4'>
          <p className='text-4xl font-bold'>{`#${problemId}. ${problemTitle}`}</p>
          <div className='flex gap-2'>
            <Button
              onClick={() => setIsEditorMode(!isEditorMode)}
              className={cn(buttonVariants({ variant: 'default' }), 'bg-(--color-chart-2) hover:bg-(--color-chart-3) text-white')}
            >
              {isEditorMode ? '返回题目' : '提交代码'}
            </Button>
          </div>
        </div>
        {statsView}
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
              <main className='mt-3 max-w-300 m-auto px-4'>{descriptionView}</main>
            </div>
            <div className='flex-1'>{rightPart}</div>
          </>
        )}
      </div>
    </div>
  );
}
