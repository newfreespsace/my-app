'use client';

import { useState } from 'react';
import { uploadFileAction } from '@/actions/problemActions';

export default function UploadPage() {
  const [imgUrl, setImgUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(formData: FormData) {
    setLoading(true);
    const result = await uploadFileAction(formData);
    setLoading(false);

    if (result.success && result.url) {
      setImgUrl(result.url);
    }
  }

  return (
    <div className='p-10 max-w-md mx-auto'>
      <h1 className='text-xl font-bold mb-4'>Supabase 上传 Demo</h1>
      <form action={handleSubmit} className='space-y-4'>
        <input type='file' name='file' className='border p-2 w-full' accept='image/*' />
        <button disabled={loading} className='bg-green-600 text-white px-4 py-2 rounded'>
          {loading ? '上传中...' : '开始上传'}
        </button>
      </form>

      {imgUrl && (
        <div className='mt-6'>
          <p className='text-sm mb-2 text-gray-500'>预览：</p>
          <img src={imgUrl} alt='uploaded' className='rounded-lg border shadow-sm' />
        </div>
      )}
    </div>
  );
}
