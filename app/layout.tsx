import { ThemeProvider } from 'next-themes';
import './globals.css';

import { Toaster } from 'sonner';

import { Metadata } from 'next';

export const metadata: Metadata = {
  title: '我的酷炫网站', // 如果子页面没写 title，就会显示这个
  description: '这是网站的全局描述',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          {children}
        </ThemeProvider>
        <Toaster richColors position="top-center" />
      </body>
    </html>
  );
}
