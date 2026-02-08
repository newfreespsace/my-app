'use client';
import { useEffect, useState } from 'react';

export default function ServerMonitor() {
  const [serverInfo, setServerInfo] = useState<any>(null);
  const [currentTime, setCurrentTime] = useState<string>('');

  useEffect(() => {
    const eventSource = new EventSource('/api/sse-time');

    eventSource.onmessage = (event) => {
      const payload = JSON.parse(event.data);

      if (payload.type === 'init') {
        setServerInfo(payload); // 存入 CPU 型号等静态信息
      } else {
        setCurrentTime(payload.time); // 更新跳动的时间
      }
    };

    return () => eventSource.close();
  }, []);

  return (
    <div className='p-4 bg-slate-900 text-white rounded-lg font-mono'>
      {serverInfo && (
        <div className='mb-4 text-blue-400 border-b border-slate-700 pb-2'>
          <p>CPU: {serverInfo.model}</p>
          <p>Cores: {serverInfo.count}</p>
          <p>Speed: {serverInfo.speed}</p>
          <p>Platform: {serverInfo.platform}</p>
          <p>Loadavg: {serverInfo.loadavg}</p>
        </div>
      )}
      <p className='text-2xl text-green-400'>Time: {currentTime}</p>
    </div>
  );
}
