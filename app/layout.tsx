import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { Providers } from './providers';

import { docsConfig } from '@/config/docs';
import { MainNav } from '@/components/main-nav';
import { Icons } from '@/components/icons';
import Link from 'next/link';
import { siteConfig } from '@/config/site';
import { ClerkProvider } from '@clerk/nextjs';
import { Button } from '@/components/ui/button';
import LeftSideBar from '@/components/leftside-bar';
import Header from '@/components/header';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body
          className={`${inter.variable} font-inter antialiased bg-[#F5F6F8] text-gray-900 tracking-tight`}
        >
          <Providers>
            <div className="flex flex-col min-h-screen overflow-hidden supports-[overflow:clip]:overflow-clip">
              {children}
            </div>
          </Providers>
        </body>
      </html>
    </ClerkProvider>
  );
}
