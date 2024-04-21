"use client";
import React from "react";
import { LinkedinShareButton, LinkedinIcon } from "react-share";

type LinkedInShareButtonProps = {
  url: string;
  title: string;
  summary: string;
  source: string;
};

const LinkedInShareComponent: React.FC<LinkedInShareButtonProps> = ({
  url,
  title,
  summary,
  source,
}) => {
  return (
    <div>
      <LinkedinShareButton
        url={url}
        title={title}
        summary={summary}
        source={source}
      >
        <LinkedinIcon size={40} round />
      </LinkedinShareButton>
    </div>
  );
};

export default LinkedInShareComponent;
