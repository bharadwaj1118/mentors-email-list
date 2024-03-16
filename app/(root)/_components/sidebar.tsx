"use client";

import Link from "next/link";
import Image from "next/image";
import { SidebarRoutes } from "./sidebar-routes";
import { useState, useEffect } from "react";
import { Sheet } from "lucide-react";
import { SheetClose } from "@/components/ui/sheet";

export const Sidebar = () => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <div className="space-y-4 py-4 flex flex-col h-full bg-blue-950 text-white">
      <div className="flex flex-col w-full">
        <SidebarRoutes />
      </div>
    </div>
  );
};
