"use client";
import { Share2Icon } from "lucide-react";
import { Button } from "@/components/ui/button";

import { useModal } from "@/hooks/use-modal-store";

const ShareOwnProfile = () => {
  const { onOpen } = useModal();

  const handleClick = () => {
    onOpen("socialShare", {
      socialShare: {
        url: "https://mentorscx.vercel.app/",
      },
    });
  };
  return (
    <div>
      <Button variant="secondary" onClick={handleClick}>
        Share your profile
        <Share2Icon className="w-4 h-4 ml-2" />
      </Button>
    </div>
  );
};

// Ensure you export the component
export default ShareOwnProfile;
