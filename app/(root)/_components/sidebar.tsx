"use client";

import Link from "next/link";
import Image from "next/image";
import { SidebarRoutes } from "./sidebar-routes";
import { useState, useEffect } from "react";

export const Sidebar = () => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <div className="h-full border-r flex flex-col overflow-y-auto bg-white shadow-sm ">
      <div className="flex flex-col w-full">
        <SidebarRoutes />
      </div>
    </div>
  );
};
