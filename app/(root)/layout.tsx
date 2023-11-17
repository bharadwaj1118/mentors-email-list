import type { Metadata } from 'next';

import { docsConfig } from '@/config/docs';
import { MainNav } from '@/components/main-nav';
import { Icons } from '@/components/icons';
import Link from 'next/link';
import { siteConfig } from '@/config/site';
import {
  ClerkProvider,
  SignOutButton,
  SignedIn,
  SignedOut,
} from '@clerk/nextjs';
import { Button } from '@/components/ui/button';
import LeftSideBar from '@/components/leftside-bar';
import { ThemeProvider } from '@/components/theme-provider';
import { ModeToggle } from '@/components/mode-toggle';

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
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-40 w-full border-b bg-background">
        <div className="container flex h-16 items-center space-x-4 sm:justify-between sm:space-x-0">
          <MainNav items={docsConfig.mainNav}></MainNav>
          <div className="flex flex-1 items-center space-x-4 sm:justify-end">
            <nav className="flex space-x-4">
              <ModeToggle />
              <SignOutButton>
                <Button>Logout</Button>
              </SignOutButton>
            </nav>
          </div>
        </div>
      </header>
      <div className="flex justify-center w-full pt-6">
        <main>{children}</main>
      </div>
    </div>
  );
}
