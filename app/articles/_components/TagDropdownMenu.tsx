'use client';

import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { useState } from 'react';
import { TagColor } from '@/models/Tag';
import { BadgeCheckIcon, Delete, LucideDelete } from 'lucide-react';

export default function TagDropdownMenu({ tags }: { tags: { id: string; tagname: string; tagcolor: TagColor }[] }) {
  const [tagName, setTagName] = useState('');
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant='outline' className='w-full justify-between'>
          {tagName === '' ? (
            '选择标签'
          ) : (
            <>
              {tagName}
              <Delete />
            </>
          )}
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
  );
}
