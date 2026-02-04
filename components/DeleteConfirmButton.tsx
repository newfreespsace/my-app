// components/DeleteConfirmButton.tsx
'use client';

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
import { Button } from './ui/button';
import { Battery } from 'lucide-react';

export function DeleteProblemConfirmButton({ id }: { id: string }) {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant='destructive' className='justify-start rounded-none w-full gap-2'>
          <Battery /> 删除题目
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>确定要删除吗？</AlertDialogTitle>
          <AlertDialogDescription>此操作无法撤销。该题目及其所有提交记录将被永久删除。</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>取消</AlertDialogCancel>
          <AlertDialogAction onClick={() => deleteProblem(id)} className='bg-destructive'>
            确认删除
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
