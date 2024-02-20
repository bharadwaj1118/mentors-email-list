import { FancyBox } from "@/components/ui/fancy-box";
import React from "react";

const AdminPage = () => {
  return (
    <div className="w-screen h-screen">
      <div className="w-full h-full flex items-center justify-center flex-col">
        <div className="flex items-center justify-center">
          <div className="font-bold mr-6 ">Technologies:</div>
          <FancyBox />
        </div>
        <div className="flex items-center justify-center">
          <div className="font-bold mr-6 ">Technologies:</div>
          <FancyBox />
        </div>
      </div>
    </div>
  );
};

export default AdminPage;
