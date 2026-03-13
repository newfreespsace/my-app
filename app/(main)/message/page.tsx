'use client';

import useSWR from 'swr';
import { IMessage } from '@/models/Message';
const fetcher = async (url: string) => {
  const data = await fetch(url);
  const jsonData = await data.json();
  console.log(jsonData);
  return jsonData;
};

export default function Page() {
  // refreshInterval： 10000 表示每 10s 自动重新获取
  const { data, error, isLoading } = useSWR('/api/message', fetcher, {
    refreshInterval: 1,
  });
  if (error) return <div>加载失败</div>;
  if (isLoading) return <div>加载中...</div>;
  return (
    <div>
      {data.map((message: IMessage) => (
        <p key={message.message}>{message.message}</p>
      ))}
    </div>
  );
}
