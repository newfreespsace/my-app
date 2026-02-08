import { buttonVariants } from '@/components/ui/button';
import { Book, Compass, Home, Library } from 'lucide-react';
import Link from 'next/link';

import { ModeToggle } from './ModeToggle';
import UserAvatar from '@/app/(main)/_components/UserAvatar';
import { auth } from '@/auth';

export async function SiteHeader() {
  const session = await auth();
  return (
    <header className='sticky top-0 z-50 flex h-(--header-height) shrink-0 items-center gap-2 border-b transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-(--header-height) bg-background'>
      <div className='flex w-full items-center gap-1 px-4 lg:gap-2 lg:px-6'>
        <div className='flex w-full max-w-300 mx-auto justify-between'>
          <div>
            <Link href='/' className={buttonVariants({ variant: 'ghost' })}>
              <Home />
              主页
            </Link>
            <Link href='/problems' className={buttonVariants({ variant: 'ghost' })}>
              <Library />
              题库
            </Link>
            <Link href='/contest' className={buttonVariants({ variant: 'ghost' })}>
              <Compass />
              比赛
            </Link>
            <Link href='/tools' className={buttonVariants({ variant: 'ghost' })}>
              <Compass />
              工具集
            </Link>
            <Link href='/articles' className={buttonVariants({ variant: 'ghost' })}>
              <Compass />
              文章
            </Link>
          </div>
          <div className='flex gap-4'>
            <ModeToggle />
            {session ? (
              <UserAvatar name={session.user ? (session.user.name as string) : ''} />
            ) : (
              <>
                <Link href='/signin' className={buttonVariants({ variant: 'ghost' })}>
                  Sign in
                </Link>
                <Link href='/signup' className={buttonVariants({ variant: 'ghost' })}>
                  Sign up
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
