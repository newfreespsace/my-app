// components/DeleteConfirmButton.tsx
'use client';

import { useTransition } from 'react'; // 1. 引入 useTransition

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { deleteProblem } from '@/actions/problemActions'; // 引用上面的 Action
import { Button } from '../../../components/ui/button';
import { Battery, Loader2 } from 'lucide-react'; // 引入加载图标

export function DeleteProblemConfirmButton({ id }: { id: number }) {
  // 2. 使用 startTransition 跟踪异步任务状态
  const [isPending, startTransition] = useTransition();

  const handleDelete = () => {
    startTransition(async () => {
      try {
        await deleteProblem(id);
      } catch (error) {
        console.error('删除失败:', error);
        // 这里可以添加 toast 提示用户失败了
      }
    });
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant='destructive' className='justify-start rounded-none w-full gap-2 cursor-pointer' disabled={isPending}>
          {isPending ? <Loader2 className='animate-spin' /> : <Battery />} 删除题目
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>确定要删除吗？</AlertDialogTitle>
          <AlertDialogDescription>此操作无法撤销。该题目及其所有提交记录将被永久删除。</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>取消</AlertDialogCancel>
          <AlertDialogAction
            onClick={(e) => {
              // e.preventDefault(); // 防止对话框点击后立即关闭，由业务逻辑决定跳转
              handleDelete();
            }}
            className='bg-destructive'
          >
            确认删除
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
