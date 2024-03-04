import { Navbar } from "./_components/navbar";
import { Sidebar } from "./_components/sidebar";

import React from "react";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="h-full">
      <div className="h-[80px] inset-0 w-full z-50">
        <Navbar />
      </div>

      <div className="h-full max-w-7xl mx-auto">{children}</div>
    </div>
  );
};

export default DashboardLayout;
