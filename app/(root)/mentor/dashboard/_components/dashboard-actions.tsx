"use client";

import { useState, useEffect } from "react";

import { Button } from "@/components/ui/button";

import { LinkedinShareButton } from "react-share";
interface LinkedInShareButtonProps {
  property: any;
}

export const LinkedInShareButton = () => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  const shareUrl = `https://mentorscx.vercel.app/`;

  return (
    <>
      <LinkedinShareButton
        url={shareUrl}
        title="TODO: title"
        summary="TODO: summary"
      >
        <Button variant="outline" size="sm">
          Share on Linkedin
        </Button>
      </LinkedinShareButton>
    </>
  );
};
