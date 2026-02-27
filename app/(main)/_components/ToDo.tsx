'use client';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import Link from 'next/link';
import { ITodo } from '@/models/Todo';

import { TableActions } from './TodoTableActions';

export function CardDemo({ todos }: { todos: ITodo[] }) {
  return (
    <Card className="w-full max-w-sm">
      <CardHeader>
        <CardTitle>ToDo List</CardTitle>
        <CardDescription>每日待办事项，按优先级从高到低。</CardDescription>
        <CardAction>
          <Button variant="link" asChild>
            <Link href="/add/todo">新增</Link>
          </Button>
        </CardAction>
      </CardHeader>
      <CardContent>
        <TableActions todos={todos} />
      </CardContent>
      <CardFooter className="flex-col gap-2">
        <Button variant="outline" className="w-full">
          结束一天，写个总结吧
        </Button>
      </CardFooter>
    </Card>
  );
}
