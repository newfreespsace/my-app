'use client';

import { Button } from '@/components/ui/button';
import { Redis } from '@upstash/redis';
const redis = new Redis({
  url: 'https://literate-hare-46910.upstash.io',
  token: 'Abc-AAIncDJkMDQxNDQ4YTMzMzI0NWExYWMyYjUzNDNjYzU1NmJhNnAyNDY5MTA',
});

const tools = () => {
  const handClick = async () => {
    console.log('开始批量写入...');

    for (let i = 0; i < 1000; i++) {
      const a = Math.random();
      const b = Math.random();
      console.log(a, b, i);
      // 等待上一次写入完成后再进行下一次
      await redis.set(a.toString().repeat(1000), b.toString().repeat(1000));

      // 可以在控制台看进度
      if (i % 100 === 0) console.log(`已完成 ${i} 次`);
    }

    console.log('1000 次写入全部完成！');
    alert('搞定！');
  };

  return <Button onClick={handClick}>点击就送</Button>;
};

export default tools;
