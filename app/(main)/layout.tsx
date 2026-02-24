import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar';
import { SiteHeader } from './_components/site-header';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className={''}>
      <SidebarProvider
        style={
          {
            '--sidebar-width': 'calc(var(--spacing) * 72)',
            '--header-height': 'calc(var(--spacing) * 12)',
          } as React.CSSProperties
        }
      >
        <SidebarInset>
          <SiteHeader />
          <div className="p-4">{children}</div>
        </SidebarInset>
      </SidebarProvider>
    </div>
  );
}
