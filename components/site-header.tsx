import { buttonVariants } from '@/components/ui/button';
import Link from 'next/link';

export function SiteHeader() {
  return (
    <header className='sticky top-0 z-50 flex h-(--header-height) shrink-0 items-center gap-2 border-b transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-(--header-height) bg-background'>
      <div className='flex w-full items-center gap-1 px-4 lg:gap-2 lg:px-6'>
        <div className='flex gap-2 max-w-300 m-auto '>
          <Link href='/' className={buttonVariants({ variant: 'secondary' })}>
            主页
          </Link>
          <Link href='/problems' className={buttonVariants({ variant: 'secondary' })}>
            题库
          </Link>
          <Link href='/new' className={buttonVariants({ variant: 'secondary' })}>
            新增
          </Link>
        </div>
      </div>
    </header>
  );
}
