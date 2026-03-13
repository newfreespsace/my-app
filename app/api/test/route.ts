import { NextRequest } from 'next/server';
import Message from '@/models/Message';
import dbConnect from '@/lib/db';

export async function GET(request: NextRequest) {
  let time = new Date().toLocaleString('zh-CN', {
    timeZone: 'Asia/Shanghai',
  });
  await dbConnect();
  await Message.create({
    message: time,
  });
  time = new Date().toLocaleString('zh-CN', {
    timeZone: 'Asia/Shanghai',
  });
  return Response.json({
    message: 'get message from server at ' + time,
  });
}
