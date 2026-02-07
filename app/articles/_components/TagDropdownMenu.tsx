'use client';

import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { useState } from 'react';
import { X } from 'lucide-react';

export default function TagDropdownMenu({ tags }: { tags: { id: string; tagname: string }[] }) {
  const [tagName, setTagName] = useState('');
  return (
    <div className='relative w-full'>
      {/* 隐藏域：负责将数据传给服务器 */}
      <input type='hidden' name='tagname' value={tagName} />
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant='outline' className='w-full justify-between'>
            <span className='truncate'>{tagName === '' ? '选择标签' : tagName}</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className='w-40' align='start'>
          <DropdownMenuGroup>
            {tags.map((tag) => (
              <DropdownMenuItem key={tag.id} onClick={() => setTagName(tag.tagname)}>
                {tag.tagname}
              </DropdownMenuItem>
            ))}
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
      {/* 将 X 移出 Trigger 之外，使用绝对定位放在按钮右侧 */}
      {tagName !== '' && (
        <button
          type='button'
          onClick={() => setTagName('')}
          className='absolute right-2 top-1/2 -translate-y-1/2 z-10 p-1 hover:bg-secondary rounded-sm transition-colors'
        >
          <X size={14} className='opacity-50 hover:opacity-100' />
        </button>
      )}
    </div>
  );
}
