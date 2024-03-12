import { Navbar } from "./_components/navbar";
import { Sidebar } from "./_components/sidebar";

import React from "react";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="h-full">
      <div className="h-[80px] inset-0 w-full z-50 fixed">
        <Navbar />
      </div>
      <div className="hidden md:flex h-full w-24 flex-col fixed inset-y-0 z-50 mt-[80px]">
        <Sidebar />
      </div>
      <div className="h-full  mx-auto pt-[80px] md:ml-24 p-3">{children}</div>
    </div>
  );
};

export default DashboardLayout;
