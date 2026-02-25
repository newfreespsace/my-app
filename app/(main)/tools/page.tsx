'use client';

import { Button } from '@/components/ui/button';
import { useState } from 'react';
import { runBatchWrite } from './actions'; // 像引入普通函数一样引入

export default function Tools() {
  const [loading, setLoading] = useState(false);

  const handleClick = async () => {
    setLoading(true);
    try {
      await runBatchWrite();

      alert('写入成功！');
    } catch (e) {
      alert('失败了');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Button onClick={handleClick} disabled={loading}>
      {loading ? '处理中...' : '点击就送'}
    </Button>
  );
}
