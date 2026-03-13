import { NextRequest } from 'next/server';

export function GET(request: NextRequest) {
  console.log(request);
  return Response.json({
    message: 'get message from cro-job',
  });
}
