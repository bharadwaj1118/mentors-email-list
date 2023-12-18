'use client';

import {
  BarChart,
  Compass,
  Layout,
  List,
  Settings,
  User,
  CalendarClock,
} from 'lucide-react';
import { usePathname } from 'next/navigation';

import { SidebarItem } from './sidebar-item';

const guestRoutes = [
  {
    icon: Layout,
    label: 'Dashboard',
    href: '/',
  },
  {
    icon: Compass,
    label: 'Browse',
    href: '/search',
  },
];

const mentorRoutes = [
  {
    icon: CalendarClock,
    label: 'Schedule',
    href: '/mentor/schedule',
  },
  {
    icon: User,
    label: 'Profile',
    href: '/mentor/profile',
  },
  {
    icon: BarChart,
    label: 'Analytics',
    href: '/mentor/analytics',
  },
  {
    icon: Settings,
    label: 'Settings',
    href: '/mentor/settings',
  },
];

export const SidebarRoutes = () => {
  const pathname = usePathname();

  const isMentorPage = pathname?.includes('/mentor');

  const routes = isMentorPage ? mentorRoutes : guestRoutes;

  return (
    <div className="flex flex-col w-full mt-16">
      {routes.map((route) => (
        <SidebarItem
          key={route.href}
          icon={route.icon}
          label={route.label}
          href={route.href}
        />
      ))}
    </div>
  );
};
