import { AppSidebar } from '@/app/(admin)/admin/_components/app-sidebar';
import { ChartAreaInteractive } from '@/app/(admin)/admin/_components/chart-area-interactive';
import { SectionCards } from '@/app/(admin)/admin/_components/section-cards';
import { SiteHeader } from '@/app/(admin)/admin/_components/site-header';
import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar';
import { auth } from '@/auth';
import { redirect } from 'next/navigation';

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
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
      <AppSidebar variant="inset" />
      <SidebarInset>
        <SiteHeader />
        {children}
      </SidebarInset>
    </SidebarProvider>
  );
}
