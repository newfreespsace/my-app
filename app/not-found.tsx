// app/not-found.tsx
import Link from 'next/link';

export default function NotFound() {
  return (
    <div className='flex h-[80vh] flex-col items-center justify-center gap-4'>
      <h2 className='text-2xl font-bold'>404 - 找不到页面</h2>
      <p>抱歉，您访问的页面不存在。</p>
      <Link href='/' className='text-blue-500 hover:underline'>
        返回首页
      </Link>
    </div>
  );
}
