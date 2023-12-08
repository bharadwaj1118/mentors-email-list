import Footer from '@/components/footer';
import { DocsSidebarNav } from '@/components/sidebar-nav';
import { docsConfig } from '@/config/docs';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <main>
        <div className="flex-1 md:grid md:grid-cols-[220px_1fr] md:gap-6 lg:grid-cols-[240px_1fr] lg:gap-10">
          <aside className="mt-16 fixed top-16 z-30 hidden h-[calc(100vh-3.5rem)] w-full shrink-0 overflow-y-auto border-r py-6 pr-2 md:sticky md:block lg:py-10">
            <DocsSidebarNav items={docsConfig.sidebarNav} />
          </aside>
          <div className="mt-16">
            <main>{children}</main>
          </div>
        </div>
      </main>
    </>
  );
}
