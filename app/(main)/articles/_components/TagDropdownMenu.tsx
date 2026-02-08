'use client';

import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { useState } from 'react';
import { X } from 'lucide-react';

export default function TagDropdownMenu({ tags }: { tags: { id: string; tagname: string }[] }) {
  const [chosenTag, setChosenTag] = useState({ tagid: '', tagname: '' });
  return (
    <div className='relative w-full'>
      {/* 隐藏域：负责将数据传给服务器 */}
      <input type='hidden' name='tagid' value={chosenTag.tagid} />
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant='outline' className='w-full justify-between'>
            <span className='truncate'>{chosenTag.tagname === '' ? '选择标签' : chosenTag.tagname}</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className='w-40' align='start'>
          <DropdownMenuGroup>
            {tags.map((tag) => (
              <DropdownMenuItem key={tag.id} onClick={() => setChosenTag({ tagid: tag.id, tagname: tag.tagname })}>
                {tag.tagname}
              </DropdownMenuItem>
            ))}
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
      {/* 将 X 移出 Trigger 之外，使用绝对定位放在按钮右侧 */}
      {chosenTag.tagname !== '' && (
        <button
          type='button'
          onClick={() => setChosenTag({ tagid: '', tagname: '' })}
          className='absolute right-2 top-1/2 -translate-y-1/2 z-10 p-1 hover:bg-secondary rounded-sm transition-colors'
        >
          <X size={14} className='opacity-50 hover:opacity-100' />
        </button>
      )}
    </div>
  );
}
