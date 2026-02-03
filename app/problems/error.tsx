// app/problems/error.tsx
'use client';

export default function ProblemsError({ error, reset }: { error: Error; reset: () => void }) {
  return (
    <div className='p-10 text-center border-2 border-dashed border-red-200 rounded-xl'>
      <h2 className='text-2xl font-bold text-red-600'>题库模块加载失败</h2>
      <p className='text-gray-500 mt-2'>{error.message || '可能是数据库连接超时了'}</p>
      <button onClick={() => reset()} className='mt-6 px-4 py-2 bg-blue-500 text-white rounded-md'>
        尝试恢复
      </button>
    </div>
  );
}
