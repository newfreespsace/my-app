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
import { COLOR_MAP, TEXT_COLOR_MAP } from '@/constants/colors';
import { cn } from '@/lib/utils';
import { TagColor } from '@/models/Tag';

export default function TagDropdownMenu({ tags }: { tags: { _id: string; tagName: string; tagColor: TagColor }[] }) {
  // 1. 状态改为数组
  const [chosenTags, setChosenTags] = useState<{ _id: string; tagName: string; tagColor: TagColor }[]>([]);

  const toggleTag = (tag: { _id: string; tagName: string; tagColor: TagColor }) => {
    setChosenTags(
      (prev) =>
        prev.find((t) => t._id === tag._id)
          ? prev.filter((t) => t._id !== tag._id) // 已存在则移除
          : [...prev, tag] // 不存在则添加
    );
  };

  const removeTag = (id: string) => {
    setChosenTags((prev) => prev.filter((t) => t._id !== id));
  };

  // 1. 先从选中的标签中提取出所有的 ID
  const chosenIds = new Set(chosenTags.map((t) => t._id));
  // 2. 过滤掉那些 ID 已经在 set 中的标签
  const availableTags = tags.filter((tag) => !chosenIds.has(tag._id));

  return (
    <div className="relative w-full space-y-2">
      {/* 2. 隐藏域处理：为每个选中的 ID 创建一个 input，name 相同 */}
      {/* 这样在 Server Action 中使用 formData.getAll('tagids') 即可获取数组 */}
      {chosenTags.map((tag) => (
        <input key={tag._id} type="hidden" name="tagids" value={tag._id} />
      ))}
      <div className="flex flex-wrap gap-2">
        {chosenTags.map((tag) => (
          <span
            key={tag._id}
            className={cn(
              // 基础布局：水平垂直居中，过渡动画
              'inline-flex items-center justify-center px-3 py-1 text-sm font-medium',
              'rounded-xl transition-all duration-200 hover:scale-105 hover:shadow-sm cursor-default',
              // 颜色应用
              COLOR_MAP[tag.tagColor] || 'bg-gray-100 text-gray-800',
              'text-white shadow-sm'
            )}
          >
            {tag.tagName}
            <X size={12} onClick={() => removeTag(tag._id)} />
          </span>
        ))}
      </div>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" className="w-full justify-start gap-2 h-auto min-h-10 flex-wrap">
            <span className="text-muted-foreground">选择标签 (可多选)</span>
          </Button>
        </DropdownMenuTrigger>

        <DropdownMenuContent className="w-56" align="start">
          <DropdownMenuGroup>
            {availableTags.map((tag) => (
              <DropdownMenuItem
                key={tag._id}
                onClick={(e) => {
                  e.preventDefault(); // 关键：防止点击后菜单自动关闭
                  toggleTag(tag);
                }}
                className={cn('flex justify-between items-center', TEXT_COLOR_MAP[tag.tagColor])}
              >
                {tag.tagName}
              </DropdownMenuItem>
            ))}
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
