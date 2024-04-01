import ChatLayout from "@/components/chats/ChatLayout";
import React from "react";

const ChatsPage = () => {
  return (
    <div className="min-h-screen flex flex-col ">
      <div className="flex-1">
        <ChatLayout />
        {/* content here */}
      </div>
    </div>
  );
};

export default ChatsPage;
