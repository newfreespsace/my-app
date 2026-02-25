'use server'; // 整个文件声明为服务端

import { Redis } from '@upstash/redis';

export async function runBatchWrite() {
  const redis = new Redis({
    url: 'https://literate-hare-46910.upstash.io',
    token: 'Abc-AAIncDJkMDQxNDQ4YTMzMzI0NWExYWMyYjUzNDNjYzU1NmJhNnAyNDY5MTA',
  });

  await redis.flushdb();

  await redis.lpush(
    'judge_queue',
    JSON.stringify({
      submissionId: 'xxxx',
      problemId: 'aaaaaa',
      timestamp: Date.now(),
    })
  );

  return { success: true };
}
