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
  return Response.json({
    message: 'Recorded',
    totalLogs: requestLog.length,
  });
}
