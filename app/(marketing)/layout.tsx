import Link from 'next/link';

import { marketingConfig } from '@/config/marketing';
import { cn } from '@/lib/utils';
import { buttonVariants } from '@/components/ui/button';
import { MainNav } from '@/components/main-nav';
import { SiteFooter } from '@/components/site-footer';
import Footer from '@/components/footer';

interface MarketingLayoutProps {
  children: React.ReactNode;
}

export default async function MarketingLayout({
  children,
}: MarketingLayoutProps) {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="container z-40 bg-background">
        <div className="flex h-20 items-center justify-between py-6">
          <MainNav items={marketingConfig.mainNav} />
          <nav>
            <Link
              href="/profile"
              className={cn(
                buttonVariants({
                  variant: 'secondary',
                  size: 'lg',
                }),
                'px-4 rounded-full py-3 border-2 border-primary text-primary'
              )}
            >
              Login
            </Link>
            <Link
              href="/profile"
              className={cn(
                buttonVariants({ size: 'lg' }),
                'px-4 mx-3 rounded-full py-3'
              )}
            >
              Browse members
            </Link>
          </nav>
        </div>
      </header>
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
}
