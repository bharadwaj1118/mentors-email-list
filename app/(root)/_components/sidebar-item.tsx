"use client";

import Link from "next/link";
import { LucideIcon } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";

import { cn } from "@/lib/utils";
import { SheetClose } from "@/components/ui/sheet";

interface SidebarItemProps {
  icon: LucideIcon;
  label: string;
  href: string;
  color: string;
}

export const SidebarItem = ({
  icon: Icon,
  label,
  href,
  color,
}: SidebarItemProps) => {
  const pathname = usePathname();
  const router = useRouter();

  const isActive =
    (pathname === "/" && href === "/") ||
    pathname === href ||
    pathname?.startsWith(`${href}/`);

  const onClick = () => {
    router.push(href);
  };

  return (
    <Link
      key={href}
      href={href}
      className={cn(
        "text-sm group flex p-3 w-full justify-start font-medium cursor-pointer hover:text-white hover:bg-white/10 rounded-lg transition",
        isActive ? "text-white bg-white/10" : "text-zinc-400"
      )}
    >
      <div className="flex items-center flex-1">
        <Icon className={cn("h-5 w-5 mr-3", color)} />
        {label}
      </div>
    </Link>
  );
};
