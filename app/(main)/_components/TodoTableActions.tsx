import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { MoreHorizontalIcon } from 'lucide-react';
import { Checkbox } from '@/components/ui/checkbox'; // 引入 Checkbox
import { toggleTodoLog } from '@/actions/todoActions'; // 引入你写的 Action
import { ITodo } from '@/models/Todo';

// 为了保持 ToDo 页面是服务端渲染，我们将 TableActions 抽离
export function TableActions({
  todos,
}: {
  todos: (ITodo & {
    completed: boolean;
  })[];
}) {
  if (todos.length === 0) {
    return <div className="py-6 text-center text-sm text-muted-foreground">今天暂时没有任务哦</div>;
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-12">状态</TableHead>
          <TableHead>名称</TableHead>
          <TableHead className="text-right">操作</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {todos.map((todo) => (
          <TableRow key={todo._id}>
            <TableCell>
              <Checkbox
                checked={todo.completed}
                onCheckedChange={async (checked) => {
                  // 调用 Server Action
                  await toggleTodoLog(todo._id, checked as boolean);
                }}
              />
            </TableCell>
            <TableCell
              className={`font-medium transition-colors ${todo.completed ? 'text-muted-foreground line-through' : ''}`}
            >
              {todo.title}
            </TableCell>
            <TableCell className="text-right">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="size-8">
                    <MoreHorizontalIcon />
                    <span className="sr-only">Open menu</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem>Edit</DropdownMenuItem>
                  <DropdownMenuItem>Duplicate</DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem variant="destructive">Delete</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
