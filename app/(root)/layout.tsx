import { Navbar } from "./_components/navbar";
import { Sidebar } from "./_components/sidebar";

import React from "react";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="h-full">
      <div className="h-[80px] inset-0 w-full z-50  md:pl-48 lg:pl-72">
        <Navbar />
      </div>
      <div className="hidden md:flex h-full w-48 lg:w-72 flex-col fixed inset-0 z-50">
        <Sidebar />
      </div>
      <div className="h-full mx-auto md:pl-48 lg:pl-72">{children}</div>
    </div>
  );
};

export default DashboardLayout;
