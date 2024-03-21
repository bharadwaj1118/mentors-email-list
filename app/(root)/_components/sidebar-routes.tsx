"use client";

import Image from "next/image";
import Link from "next/link";
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
  Sheet,
  MessageSquarePlusIcon,
} from "lucide-react";
import { usePathname } from "next/navigation";

import { SidebarItem } from "./sidebar-item";
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { Montserrat } from "next/font/google";
import { SheetClose } from "@/components/ui/sheet";

const poppins = Montserrat({ weight: "600", subsets: ["latin"] });

const guestRoutes = [
  {
    icon: Layout,
    label: "Dashboard",
    href: "/dashboard/profiles",
    color: "text-blue-500",
  },
  {
    icon: Clock,
    label: "Sessions",
    href: "/dashboard/session",
    color: "text-green-500",
  },
  {
    icon: MessageSquarePlusIcon,
    label: "Messaging",
    href: "/dashboard/chats",
    color: "text-gray-500",
  },
];

const mentorRoutes = [
  {
    icon: CalendarClock,
    label: "Schedule",
    href: "/mentor/schedule",
    color: "text-blue-500",
  },
  {
    icon: Presentation,
    label: "Sessions",
    href: "/mentor/session",
    color: "text-green-500",
  },
  {
    icon: MessageSquarePlusIcon,
    label: "Messaging",
    href: "/dashboard/chats",
    color: "text-yellow-500",
  },
  {
    icon: Settings,
    label: "Settings",
    href: "/mentor/settings",
    color: "text-gray-500",
  },
];

export const SidebarRoutes = () => {
  const pathname = usePathname();

  const isMentorPage = pathname?.includes("/mentor");

  const routes = isMentorPage ? mentorRoutes : guestRoutes;

  return (
    <div className="">
      <div className="px-3 py-2 flex-1">
        <Link href="/" className="flex items-center pl-3 mb-14">
          <h1
            className={cn(
              "text-3xl font-semibold tracking-tight",
              poppins.className
            )}
          >
            Mentors
          </h1>
          <div className="relative h-16 w-16 ml-2">
            <Image fill alt="Logo" src="/mentors-cx.svg" className="invert" />
          </div>
        </Link>
      </div>
      <div className="space-y-1">
        {routes.map((route) => (
          <SidebarItem
            key={route.href}
            icon={route.icon}
            label={route.label}
            href={route.href}
            color={route.color}
          />
        ))}
      </div>
    </div>
  );
};
