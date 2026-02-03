// app/api/sse-time/route.ts
import { NextRequest } from 'next/server';

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  const encoder = new TextEncoder();

  const stream = new ReadableStream({
    start(controller) {
      // 每秒发送一次服务器时间
      const timer = setInterval(() => {
        const timeData = new Date().toLocaleTimeString();
        // SSE 的标准格式必须以 "data: " 开头，以 "\n\n" 结尾
        const msg = encoder.encode(`data: ${timeData}\n\n`);
        controller.enqueue(msg);
      }, 1000);

      // 当客户端关闭连接时，清除定时器
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
