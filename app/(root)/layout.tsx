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
import { DocsSidebarNav } from '@/components/sidebar-nav';
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
          <MainNav items={docsConfig.mainNav}>
            <DocsSidebarNav items={docsConfig.sidebarNav} />
          </MainNav>
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
      <div className="flex-1 md:grid md:grid-cols-[220px_1fr] md:gap-6 lg:grid-cols-[240px_1fr] lg:gap-10">
        <aside className="fixed top-14 z-30 hidden h-[calc(100vh-3.5rem)] w-full shrink-0 overflow-y-auto border-r py-6 pr-2 md:sticky md:block lg:py-10">
          <DocsSidebarNav items={docsConfig.sidebarNav} />
        </aside>
        <div className="flex justify-center w-full pt-6">
          <main>{children}</main>
        </div>
      </div>
    </div>
  );
}
