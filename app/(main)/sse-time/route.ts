// app/api/sse-time/route.ts
import { NextRequest } from 'next/server';
import os from 'os';

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  const encoder = new TextEncoder();
  const cpus = os.cpus();

  const info = {
    model: cpus[0].model, // CPU 型号
    count: cpus.length, // 核心数（逻辑处理器）
    speed: cpus[0].speed, // 频率 (MHz)
    platform: os.platform(), // 操作系统平台
    loadavg: os.loadavg(), // 系统负载（最近 1, 5, 15 分钟）
  };

  const stream = new ReadableStream({
    start(controller) {
      // 1. 立即发送第一条初始化信息
      const initMsg = encoder.encode(`data: ${JSON.stringify({ type: 'init', ...info })}\n\n`);
      controller.enqueue(initMsg);

      // 2. 设置定时器发送实时数据
      const timer = setInterval(() => {
        const data = {
          type: 'update',
          time: new Date().toLocaleTimeString(),
          load: os.loadavg()[0], // 顺便把实时负载也带上
        };
        const msg = encoder.encode(`data: ${JSON.stringify(data)}\n\n`);
        controller.enqueue(msg);
      }, 1000);

      request.signal.addEventListener('abort', () => {
        clearInterval(timer);
        controller.close();
      });
    },
  });

  return new Response(stream, {
    headers: {
      'Content-Type': 'text/event-stream',
      'Cache-Control': 'no-cache',
      Connection: 'keep-alive',
    },
  });
}
