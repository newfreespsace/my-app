// app/page.tsx
'use client';

import { useState } from 'react';
import { uploadFile } from '@/actions/problemActions';

export default function UploadPage() {
  const [status, setStatus] = useState<string>('');

  async function handleAction(formData: FormData) {
    setStatus('上传中...');
    try {
      const result = await uploadFile(formData);
      if (result.success) {
        setStatus(`✅ 上传成功: ${result.fileName}`);
      }
    } catch (error) {
      setStatus('❌ 上传失败');
    }
  }

  return (
    <main className='p-10'>
      <h1 className='text-2xl font-bold mb-4'>Next.js 文件上传 Demo</h1>

      <form action={handleAction} className='space-y-4'>
        <input type='file' name='file' className='block w-full text-sm border border-gray-300 rounded-lg cursor-pointer p-2' />
        <button type='submit' className='bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition'>
          立即上传
        </button>
      </form>

      {status && <p className='mt-4 text-sm text-gray-600'>{status}</p>}
    </main>
  );
}
