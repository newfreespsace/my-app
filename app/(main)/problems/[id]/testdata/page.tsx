// app/page.tsx
import { Suspense } from 'react';
import TestDataList from './_components/TestDataList';
import UploadTestData from './_components/UploadTestData';

export default function Page() {
  const problemId = 1022;

  return (
    <div className='flex gap-10 p-10 max-w-240 mx-auto'>
      <div className='flex-1'>
        <h2 className='text-2xl font-bold mb-4'>测试数据11</h2>
        <Suspense fallback={<div className='animate-pulse bg-gray-100 h-40 rounded' />}>
          <TestDataList problemId={problemId} />
        </Suspense>
      </div>

      {/* 🚀 这里在 Suspense 之外，秒开！ */}
      <UploadTestData problemId={problemId} />
    </div>
  );
}
