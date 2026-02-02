'use client';

import { useState } from 'react';
import { calculateOnServer } from '@/actions/problemActions';

// 定义一条记录的类型
interface CalcRecord {
  num: number;
  idx: number;
  duration: number;
  timestamp: string;
}

export default function Calculator() {
  const [history, setHistory] = useState<CalcRecord[]>([]);
  const [isPending, setIsPending] = useState(false);
  const [lastNum, setLastNum] = useState(100000000);

  const handleBtnClick = async () => {
    setIsPending(true);
    try {
      // 获取服务器返回的对象 { sum, duration }
      const tot = 1000;
      let k = 100000000000000;
      for (let i = 1; i <= tot; i++) {
        const result = await calculateOnServer(k);
        setLastNum(result.num);
        k = result.num + 2;

        const newRecord: CalcRecord = {
          idx: i,
          ...result,
          timestamp: new Date().toLocaleTimeString(), // 添加一个本地时间戳
        };

        setHistory((prev) => [newRecord, ...prev]);
      }
    } catch (error) {
      console.error('计算出错:', error);
    } finally {
      setIsPending(false);
    }
  };

  return (
    <div className='p-6 max-w-2xl'>
      <button
        onClick={handleBtnClick}
        disabled={isPending}
        className='bg-indigo-600 text-white px-6 py-2 rounded-md hover:bg-indigo-700 disabled:bg-gray-400 transition-colors'
      >
        {isPending ? '服务器正在拼命计算...' : '开始计算 (1000万次)'}
      </button>

      <div className='mt-8'>
        <h2 className='text-xl font-bold mb-4'>历史结果统计</h2>
        <div className='space-y-3'>
          {history.map((item, index) => (
            <div key={index} className='flex items-center justify-between p-4 bg-white border rounded-lg shadow-sm'>
              <div>
                <div className='text-sm text-gray-500'>计算编号: {item.idx}</div>
                <div className='text-sm text-gray-500'>计算时间: {item.timestamp}</div>
                <div className='text-lg font-mono font-bold text-gray-800'>结果: {item.num.toLocaleString()}</div>
              </div>
              <div className='text-right'>
                <span className='text-xs font-semibold px-2 py-1 bg-green-100 text-green-700 rounded-full'>耗时: {item.duration} ms</span>
                <p className='text-[10px] text-gray-400 mt-1'>服务器 CPU 执行时间</p>
              </div>
            </div>
          ))}

          {history.length === 0 && <p className='text-gray-400 italic'>暂无历史记录</p>}
        </div>
      </div>
    </div>
  );
}
