import './globals.css';

import { Toaster } from 'sonner';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en' suppressHydrationWarning>
      <body>
        {children}
        <Toaster richColors position='bottom-right' />
      </body>
    </html>
  );
}
