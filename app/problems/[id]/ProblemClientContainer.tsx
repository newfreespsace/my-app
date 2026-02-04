'use client';

import { useState } from 'react';
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';

interface Props {
  problemTitle: string;
  descriptionView: React.ReactNode;
  submitView: React.ReactNode;
  rightPart: React.ReactNode;
  statsView: React.ReactNode; // 提取出来的通过数/提交数统计部分
}

export default function ProblemClientContainer({
  problemTitle,
  descriptionView,
  rightPart,
  submitView,
  statsView,
}: Props) {
  const [isEditorMode, setIsEditorMode] = useState(false);

  return (
    <div className='w-full'>
      {/* Header 保持在容器内部，这样按钮才能访问到状态 */}
      <header className='flex gap-2 max-w-300 m-auto justify-between pt-4 px-4'>
        <div className='flex flex-col gap-4 mt-4 mb-4'>
          <p className='text-4xl font-bold'>{`#137. ${problemTitle}`}</p>
          <div className='flex gap-2'>
            <Button onClick={() => setIsEditorMode(!isEditorMode)}>{isEditorMode ? '返回描述' : '提交代码'}</Button>
          </div>
        </div>
        {statsView}
      </header>

      <Separator />

      <div className='flex gap-4 mt-3 max-w-300 m-auto items-start'>
        <div className='flex-2'>
          <main className='mt-3 max-w-300 m-auto px-4'>
            {/* 根据状态渲染不同的服务端内容 */}
            {isEditorMode ? submitView : descriptionView}
          </main>
        </div>
        <div className='flex-1'>{rightPart}</div>
      </div>
    </div>
  );
}
