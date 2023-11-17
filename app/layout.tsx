import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

import { docsConfig } from '@/config/docs';
import { MainNav } from '@/components/main-nav';
import { Icons } from '@/components/icons';
import Link from 'next/link';
import { siteConfig } from '@/config/site';
import { ClerkProvider } from '@clerk/nextjs';
import { Button } from '@/components/ui/button';
import LeftSideBar from '@/components/leftside-bar';
import { ThemeProvider } from '@/components/theme-provider';
import { ModeToggle } from '@/components/mode-toggle';

const inter = Inter({ subsets: ['latin'] });

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
        <body className={inter.className}>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <main>{children}</main>
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
