import { auth, signOut } from '@/auth';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import Link from 'next/link';

export default async function UserAvatarDropdown({ name }: { name: string }) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant='ghost' size='icon' className='rounded-full'>
          <Avatar>
            <AvatarImage src='/124599.jpeg' alt='shadcn' />
            <AvatarFallback>{name[0].toUpperCase()}</AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className='w-32'>
        <DropdownMenuGroup>
          <DropdownMenuItem asChild>
            <Link href='/admin'>DashBoard</Link>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem className='p-0'>
            <form
              action={async () => {
                'use server';
                await signOut({ redirectTo: '/' }); // 指定退出后跳转的页面
              }}
              className='w-full'
            >
              <button className='w-full px-2 py-1.5 text-left text-sm text-destructive'>Log out</button>
            </form>
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
