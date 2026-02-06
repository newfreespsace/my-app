'use client';

import { useTransition } from 'react';
import { Button } from '@/components/ui/button';
import { Loader2, Trash2 } from 'lucide-react';
// 假设你有一个删除题目的 Server Action
// import { deleteProblem } from "@/app/actions";
import { deleteProblem } from '@/actions/problemActions';

export function ProblemDeleteButton({ id }: { id: number }) {
  const [isPending, startTransition] = useTransition();

  const onDelete = () => {
    if (!confirm('确认删除？')) return;

    startTransition(async () => {
      try {
        await deleteProblem(id);
      } catch (error) {
        console.error('删除出错:', error);
      }
    });
  };

  return (
    <Button variant='destructive' disabled={isPending} onClick={onDelete}>
      {/* animate-spin 是 Tailwind CSS 内置的一个动画类名，它的效果是让元素以自身中心为轴心，无限次地、平滑地进行 360 度旋转 */}
      {isPending ? <Loader2 className='mr-2 h-4 w-4 animate-spin' /> : <Trash2 />}
      {isPending ? '删除中...' : '删除'}
    </Button>
  );
}
