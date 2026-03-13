import { NextRequest } from 'next/server';
import Message from '@/models/Message';
import dbConnect from '@/lib/db';

export async function GET(request: NextRequest) {
  await dbConnect();
  const messages = await Message.find()
    .sort({ createdAt: -1 }) // 按创建时间倒序排列 (最新的在前)
    .limit(10); // 只取前 10 条
  return Response.json(messages);
}
