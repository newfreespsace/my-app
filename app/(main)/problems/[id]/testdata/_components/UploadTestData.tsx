'use client';

import { useState } from 'react';
import { uploadProblemTestData } from '@/actions/problemActions';

export default function UploadTestData({ problemId }: { problemId: number }) {
  const [loading, setLoading] = useState(false);

  async function handleSubmit(formData: FormData) {
    setLoading(true);
    await uploadProblemTestData(formData, problemId);
    setLoading(false);
  }

  return (
    <div className='p-10 max-w-md mx-auto'>
      <h1 className='text-xl font-bold mb-4'>Supabase 上传 Demo</h1>
      <form action={handleSubmit} className='space-y-4'>
        <input type='file' name='file' className='border p-2 w-full' accept='*/*' />
        <button disabled={loading} className='bg-green-600 text-white px-4 py-2 rounded'>
          {loading ? '上传中...' : '开始上传'}
        </button>
      </form>
    </div>
  );
}
