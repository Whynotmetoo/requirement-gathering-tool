import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { ThemeProvider } from '@/components/theme-provider';
import { GlobalStateProvider } from '@/lib/userContext'

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Requirements Gathering Tool',
  description: 'Human-centric requirements gathering and analysis platform',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <GlobalStateProvider>
            {children}
          </GlobalStateProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}