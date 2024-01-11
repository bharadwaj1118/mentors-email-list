"use client";

import {
  BarChart,
  Compass,
  Layout,
  List,
  Settings,
  User,
  CalendarClock,
  Clock,
  Presentation,
} from "lucide-react";
import { usePathname } from "next/navigation";

import { SidebarItem } from "./sidebar-item";

const guestRoutes = [
  {
    icon: Layout,
    label: "Dashboard",
    href: "/dashboard/profiles",
  },
  {
    icon: Clock,
    label: "Schedule",
    href: "/dashboard/schedule",
  },
  {
    icon: User,
    label: "Profile",
    href: "/dashboard/profile",
  },
  {
    icon: Presentation,
    label: "Sessions",
    href: "/dashboard/session",
  },
  {
    icon: Settings,
    label: "Settings",
    href: "/dashboard/settings",
  },
];

const mentorRoutes = [
  {
    icon: CalendarClock,
    label: "Schedule",
    href: "/mentor/schedule",
  },
  {
    icon: User,
    label: "Profile",
    href: "/mentor/profile",
  },
  {
    icon: BarChart,
    label: "Analytics",
    href: "/mentor/analytics",
  },
  {
    icon: Presentation,
    label: "Sessions",
    href: "/mentor/session",
  },
  {
    icon: Settings,
    label: "Settings",
    href: "/mentor/settings",
  },
];

export const SidebarRoutes = () => {
  const pathname = usePathname();

  const isMentorPage = pathname?.includes("/mentor");

  const routes = isMentorPage ? mentorRoutes : guestRoutes;

  return (
    <div className="mt-16 flex w-full flex-col">
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
