import { AppSidebar } from '@/app/(admin)/admin/_components/app-sidebar';
import { ChartAreaInteractive } from '@/app/(admin)/admin/_components/chart-area-interactive';
import { SectionCards } from '@/app/(admin)/admin/_components/section-cards';
import { SiteHeader } from '@/app/(admin)/admin/_components/site-header';
import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar';
import { auth } from '@/auth';
import { redirect } from 'next/navigation';

export default async function Page() {
  const session = await auth();
  if (!session) redirect('/signin');
  return (
    <SidebarProvider
      style={
        {
          '--sidebar-width': 'calc(var(--spacing) * 72)',
          '--header-height': 'calc(var(--spacing) * 12)',
        } as React.CSSProperties
      }
    >
      <AppSidebar variant='inset' />
      <SidebarInset>
        <SiteHeader />
        <div className='flex flex-1 flex-col'>
          <div className='@container/main flex flex-1 flex-col gap-2'>
            <div className='flex flex-col gap-4 py-4 md:gap-6 md:py-6'>
              <SectionCards />
              <div className='px-4 lg:px-6'>
                <ChartAreaInteractive />
              </div>
            </div>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
