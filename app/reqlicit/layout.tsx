"use client";

import { Toaster } from '@/components/ui/sonner';
import Navigation from '@/components/navigation';


export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
        <>
          <Navigation />
          <main className="container mx-auto px-4 py-6">
            {children}
          </main>
          <Toaster />
        </>
  );
}