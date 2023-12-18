import Link from 'next/link';
import { Logo } from './logo';
import { SidebarRoutes } from './sidebar-routes';

export const Sidebar = () => {
  return (
    <div className="h-full border-r flex flex-col overflow-y-auto bg-white shadow-sm ">
      <div className="h-16">
        <Link
          href="/"
          className="p-6 flex space-x-1 items-center justify-center"
        >
          <span className="text-2xl">Mentors</span> <Logo />
        </Link>
      </div>
      <div className="flex flex-col w-full">
        <SidebarRoutes />
      </div>
    </div>
  );
};
