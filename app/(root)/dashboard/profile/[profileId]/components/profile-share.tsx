"use client";
import {
  LinkedinShareButton,
  TwitterShareButton,
  WhatsappShareButton,
  EmailShareButton,
  TwitterIcon,
  WhatsappIcon,
  EmailIcon,
  LinkedinIcon,
} from "react-share";

//TODO: Add type for property
interface ShareButtonProps {
  property: any;
}
const ShareButton = ({ property }: ShareButtonProps) => {
  const shareUrl = `https://mentorscx.vercel.app/`;

  return (
    <>
      <h3 className="text-center py-4">Share Your Profile</h3>
      <div className="flex gap-3 justify-center pb-5">
        <LinkedinShareButton
          url={shareUrl}
          title={property.name}
          summary={property.description}
        >
          <LinkedinIcon size={40} round={true} />
        </LinkedinShareButton>

        <TwitterShareButton
          url={shareUrl}
          title={property.name}
          hashtags={[`${property.type}ForCall`, `Mentorship`]}
        >
          <TwitterIcon size={40} round={true} />
        </TwitterShareButton>
        <WhatsappShareButton
          url={shareUrl}
          title={property.name}
          separator=":: "
        >
          <WhatsappIcon size={40} round={true} />
        </WhatsappShareButton>
        <EmailShareButton
          url={shareUrl}
          subject={property.name}
          body={`Check out this property: ${shareUrl}`}
        >
          <EmailIcon size={40} round={true} />
        </EmailShareButton>
      </div>
    </>
  );
};
export default ShareButton;
