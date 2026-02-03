'use client';

import { useEffect, useState } from 'react';

export default function SSEClock() {
  const [time, setTime] = useState<string>('正在连接服务器...');

  useEffect(() => {
    // 1. 开启 SSE 连接
    const eventSource = new EventSource('/api/sse-time');

    // 2. 监听消息
    eventSource.onmessage = (event) => {
      setTime(event.data);
    };

    // 3. 错误处理
    eventSource.onerror = () => {
      console.error('SSE 连接中断');
      eventSource.close();
    };

    // 4. 组件销毁时关闭连接
    return () => {
      eventSource.close();
    };
  }, []);

  const [localTime, setLocalTime] = useState<string>('');

  useEffect(() => {
    // 1. 定义更新时间的函数
    const updateTime = () => {
      const now = new Date();
      // 格式化为：10:30:29
      setLocalTime(now.toLocaleTimeString('zh-CN', { hour12: false }));
    };

    // 2. 立即执行一次，避免 1 秒的空白
    updateTime();

    // 3. 设置定时器，每秒更新一次
    const timer = setInterval(updateTime, 1000);

    // 4. 清除定时器，防止内存泄漏
    return () => clearInterval(timer);
  }, []);

  // 如果 time 还没初始化，可以返回一个占位符或 skeleton
  if (!localTime) return <div className='p-4 border-2 border-dashed border-gray-200 rounded-lg'>加载中...</div>;

  return (
    <div className='flex  flex-col gap-4'>
      <div className='p-4 border-2 border-blue-500 rounded-lg bg-blue-50'>
        <h3 className='text-sm font-semibold text-blue-800'>SSE 实时服务器时间</h3>
        <p className='text-3xl font-mono font-bold mt-2'>{time}</p>
      </div>
      <div className='p-4 border-2 border-blue-500 rounded-lg bg-blue-50'>
        <h3 className='text-sm font-semibold text-blue-800'>本地系统时间</h3>
        <p className='text-3xl font-mono font-bold mt-2'>{localTime}</p>
      </div>
    </div>
  );
}
