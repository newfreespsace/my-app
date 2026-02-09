'use client';

import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useState } from 'react';
import { X } from 'lucide-react'; // 引入 Check 增强视觉反馈

export default function TagDropdownMenu({ tags }: { tags: { id: string; tagcolor: string; tagname: string }[] }) {
  // 1. 状态改为数组
  const [chosenTags, setChosenTags] = useState<{ id: string; tagname: string }[]>([]);

  const toggleTag = (tag: { id: string; tagname: string }) => {
    setChosenTags(
      (prev) =>
        prev.find((t) => t.id === tag.id)
          ? prev.filter((t) => t.id !== tag.id) // 已存在则移除
          : [...prev, tag], // 不存在则添加
    );
  };

  const removeTag = (id: string) => {
    setChosenTags((prev) => prev.filter((t) => t.id !== id));
  };

  // 1. 先从选中的标签中提取出所有的 ID
  const chosenIds = new Set(chosenTags.map((t) => t.id));
  // 2. 过滤掉那些 ID 已经在 set 中的标签
  const availableTags = tags.filter((tag) => !chosenIds.has(tag.id));

  return (
    <div className='relative w-full space-y-2'>
      {/* 2. 隐藏域处理：为每个选中的 ID 创建一个 input，name 相同 */}
      {/* 这样在 Server Action 中使用 formData.getAll('tagids') 即可获取数组 */}
      {chosenTags.map((tag) => (
        <input key={tag.id} type='hidden' name='tagids' value={tag.id} />
      ))}

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant='outline' className='w-full justify-start gap-2 h-auto min-h-10 flex-wrap'>
            {chosenTags.length === 0 ? (
              <span className='text-muted-foreground'>选择标签 (可多选)</span>
            ) : (
              // 3. 在触发器内直接展示已选中的标签（可选，如果不展示则保留单行文本）
              chosenTags.map((tag) => (
                <span key={tag.id} className='bg-secondary px-2 py-0.5 rounded-md text-xs flex items-center gap-1'>
                  {tag.tagname}
                  <X
                    size={12}
                    className='cursor-pointer hover:text-destructive text-red-500'
                    onClick={(e) => {
                      e.stopPropagation(); // 防止触发下拉菜单
                      removeTag(tag.id);
                    }}
                  />
                </span>
              ))
            )}
          </Button>
        </DropdownMenuTrigger>

        <DropdownMenuContent className='w-56' align='start'>
          <DropdownMenuGroup>
            {availableTags.map((tag) => (
              <DropdownMenuItem
                key={tag.id}
                onClick={(e) => {
                  e.preventDefault(); // 关键：防止点击后菜单自动关闭
                  toggleTag(tag);
                }}
                className='flex justify-between items-center'
              >
                {tag.tagname}
              </DropdownMenuItem>
            ))}
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
