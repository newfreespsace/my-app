// app/api/stats/route.js
import { NextRequest } from 'next/server';
// 依然是这个会导致泄漏的全局变量
const requestLog = [];

export async function GET(request: NextRequest) {
  const currentData = {
    time: new Date().toISOString(),
    url: request.url,
  };

  requestLog.push(currentData);

  // 在控制台打印，方便你观察
  console.log('--- 内存中的日志条数:', requestLog.length);

  return Response.json({
    message: 'Recorded',
    totalLogs: requestLog.length,
  });
}
