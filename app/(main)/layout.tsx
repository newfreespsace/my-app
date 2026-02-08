// import { SiteHeader } from '@/components/site-header';
import { SiteHeader } from './_components/site-header';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <SiteHeader />
      <div className='mb-10'>{children}</div>
    </>
  );
}
