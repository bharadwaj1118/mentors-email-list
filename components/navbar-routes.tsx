"use client";

import Link from "next/link";
import { LogOut } from "lucide-react";
import { UserButton, useAuth } from "@clerk/nextjs";
import { usePathname } from "next/navigation";
import Image from "next/image";

import { Button } from "@/components/ui/button";

export const NavbarRoutes = () => {
  const { userId } = useAuth();
  const pathname = usePathname();

  const isMentorPage = pathname?.includes("/mentor");

  return (
    <>
      <div className="h-16 flex items-center">
        <Link
          href="/"
          className="p-6 flex space-x-1 items-center justify-center"
        >
          <span className="text-2xl">Mentors</span>
          <Image src="/mentors-cx.svg" alt="Mentors" width={45} height={45} />
        </Link>
      </div>
      <div className="flex gap-x-2 ml-auto">
        {isMentorPage ? (
          <Link href="/dashboard/profiles">
            <Button size="sm" variant="ghost">
              <LogOut className="h-4 w-4 mr-2" />
              Exit
            </Button>
          </Link>
        ) : (
          <Link href="/mentor/schedule">
            <Button size="sm" variant="ghost">
              Mentor mode
            </Button>
          </Link>
        )}
        <UserButton afterSignOutUrl="/" />
      </div>
    </>
  );
};
