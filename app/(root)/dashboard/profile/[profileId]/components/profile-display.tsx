import React from "react";
import Image from "next/image";
import {
  ArrowUpIcon,
  BuildingIcon,
  Globe,
  Languages,
  LucideFacebook,
  MapPin,
  MessageCircleIcon,
  PencilIcon,
  PhoneIcon,
  StarIcon,
  UserPlus as UserRoundPlus,
  ShareIcon,
  ExternalLink,
} from "lucide-react";
import { FaTiktok } from "react-icons/fa";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import ProfileReviewPage from "./profile-review";
import ProfileBioPage from "./profile-bio";

import ListLeadingImageThreeLines from "./profile-skills-list";
import Footer from "@/components/footer";
import ProfileTestmonialPage from "./profile-testmonials";
import ProfileExperience from "./profile-experience";
import { LinkedInLogoIcon, TwitterLogoIcon } from "@radix-ui/react-icons";
import ProfileSkillList from "./profile-skill-list";
import { getSelfId } from "@/lib/actions/user.action";
import {
  EditProfileAction,
  EditProfileDetailsAction,
  EditSocialsAction,
} from "./edit-profile-action";
import Profile from "@/database/profile.model";
import Link from "next/link";
import { formatMonthYear } from "@/lib/format";
import {
  CopyToClipboardButton,
  RequestCallButton,
} from "./profile-item-action";
import dynamic from "next/dynamic";
import { Share } from "next/font/google";
import ShareButton from "./profile-share";

const LinkedInShareComponent = dynamic(() => import("./profile-share"), {
  ssr: false,
});

interface ProfileDisplayPageProps {
  user: string;
  profileId: string;
}

function calculateHourlyCost(duration: number, price: number): number {
  // Calculate the cost per hour by scaling the price to a full hour
  const hourlyCost = (price / duration) * 60;

  // Return the hourly cost rounded to the nearest whole number if needed
  return Math.round(hourlyCost);
}

const ProfileDisplayPage = async ({
  user,
  profileId,
}: ProfileDisplayPageProps) => {
  const {
    id,
    username,
    location,
    bio,
    city,
    country,
    imageUrl,
    position,
    organization,
    languages,
    industries,
    expertise,
    toolkit,
    experiences,
    linkedinProfile,
    twitterProfile,
    facebookProfile,
    tiktokProfile,
    joinedAt,
    price,
    duration,
    portfolioWebsite,
  } = JSON.parse(user);

  console.log(portfolioWebsite);

  // Get the self account
  const selfAccount = await getSelfId();
  if (!selfAccount) {
    return null;
  }

  // Check if the person can edit the profile
  const canEdit = profileId === selfAccount.id;

  const shareUrl = "https://www.example.com";
  const shareTitle = "Example Title";
  const shareSummary = "This is a summary of the content being shared.";
  const shareSource = "https://www.example.com";

  return (
    <div className="relative">
      {/* Profile Details */}

      <div className="absolute right-8 top-8">
        {canEdit && <EditProfileAction />}
      </div>
      <div className="flex space-y-3 flex-col items-center justify-center bg-background rounded shadow p-3">
        <div className="flex flex-col md:flex-row items-center justify-center gap-8">
          {/* Profile Image & Reviews */}
          <div className="flex items-center justify-center flex-col gap-4">
            {/* Profile Image */}
            <div className="relative mt-12">
              <Image
                src={imageUrl}
                alt="avatar"
                width={100}
                height={100}
                className="h-32 w-32 rounded-full object-cover overflow-hidden"
              />
            </div>

            {/* Reviews */}
            <div className="flex flex-col items-center p-4  border-2 rounded-lg shadow-sm border-gray-400">
              <div className="flex items-center justify-center">
                <StarIcon className="w-4 h-4 fill-yellow-500 text-yellow-500 mr-1" />
                <p className="text-xl font-bold text-black">4.99</p>
              </div>
              <Separator className="h-[1px] w-full my-2 border-gray-400" />
              <div>593 reviews</div>
            </div>

            {/* Share component */}
            {canEdit && (
              <div>
                <ShareButton
                  property={{
                    name: "Property Name",
                    type: "Property Type",
                  }}
                />
              </div>
            )}
          </div>

          {/* Profile Details */}
          <div className="flex flex-col justify-center items-center gap-4">
            {/* Name, Position and Organization */}

            <div className="flex justify-center items-center flex-col">
              <h3 className="h3 hidden md:block">
                {username} |{" "}
                <span className="large text-gray-800">
                  {position} @ {organization}
                </span>
              </h3>

              <h3 className="block h3 md:hidden">{username}</h3>
              <h4 className="block md:hidden large text-neutral-800">
                {position} @ {organization}
              </h4>
              {canEdit && (
                <EditProfileDetailsAction
                  position={position}
                  organization={organization}
                  id={id}
                />
              )}
            </div>

            {/* Location and Joined Date */}
            <div className="flex flex-col items-center justify-center muted max-md:space-y-4 md:flex-row md:justify-between md:space-x-6">
              {/* <p className="text-base flex items-center">
            <Globe className="h-4 w-4 text-blue-500 mr-1" />
            Athens, Greece
          </p> */}
              <p className="text-base flex items-center">
                <Languages className="h-4 w-4 text-blue-500 mr-1" />
                {languages.map((language: any) => language.name).join(", ")}
              </p>
              <p className="text-base flex items-center">
                <MapPin className="h-4 w-4 text-blue-500 mr-1" />
                {city}, {country}
              </p>
              <p className="text-base flex items-center">
                <BuildingIcon className="h-4 w-4 text-blue-500 mr-1" />
                Joined {formatMonthYear(joinedAt)}
              </p>
            </div>

            {/* Portfolio website & Profile*/}
            <div className="flex items-center justify-between flex-col md:flex-row gap-4">
              {portfolioWebsite && (
                <Button variant="link" className="text-sm md:text-base" asChild>
                  <Link
                    href={portfolioWebsite}
                    rel="noopener noreferrer"
                    target="_blank"
                  >
                    Personal Website <ExternalLink className="w-4 h-4 ml-2" />
                  </Link>
                </Button>
              )}
              <div className="flex-1 text-primary text-lg text-end md:ml-auto">
                <CopyToClipboardButton id={id} />
              </div>
            </div>

            {/* Reviews and Available Information */}
            <div className="w-fit mx-auto border-2 md:border-2 border-gray-400 p-4 px-6  md:px-12 rounded-lg md:rounded-full">
              <div className="flex flex-col items-center justify-center space-y-1 md:flex-row md:justify-between gap-4 md:gap-12">
                <div className="flex flex-col items-center muted">
                  {price === 0 ? (
                    <p className="font-bold text-2xl text-green-600">Free</p>
                  ) : (
                    <p className="font-bold text-2xl text-neutral-800">
                      {price}$
                    </p>
                  )}
                  <p className="text-sm">Price per hour</p>
                </div>
                <Separator className="h-[2px] md:hidden" />
                <div className="flex flex-col items-center muted">
                  <div className="bg-green-100 text-green-600 px-2 py-1 rounded-full font-semibold text-sm">
                    <p className="text-sm">{duration} min</p>
                  </div>
                  <div>Time blocks Available</div>
                </div>
                <Separator className="h-[2px] md:hidden" />
                <div className="flex flex-col items-center muted">
                  <div className="flex items-center justify-center">
                    <p className="text-xl font-bold text-black">May 26</p>
                  </div>
                  <div>Next Available day</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/*Social and Invites */}
        <div className="flex items-center max-md:justify-between flex-col md:flex-row  w-full space-x-3 mt-12 space-y-3 md:w-2/3 p-3">
          <div className="flex items-center justify-center w-full space-x-3 md:justify-start">
            <RequestCallButton id={id} />
            <Button className="rounded-full " variant="outline">
              <MessageCircleIcon className="w-5 h-5 mr-1" />
              Message me
            </Button>
            <Button className="max-md:hidden rounded-full" variant="outline">
              <UserRoundPlus className="w-5 h-5 mr-1" />
              Add to list
            </Button>
          </div>

          <div className="max-md:!mt-6 flex items-center justify-center">
            <div>
              {linkedinProfile && (
                <Button variant="link" size="icon" asChild>
                  <Link
                    href={linkedinProfile}
                    rel="noopener noreferrer"
                    target="_blank"
                  >
                    <LinkedInLogoIcon className="w-6 h-6 hover:scale-125 transition-colors  duration-300" />
                  </Link>
                </Button>
              )}
            </div>

            <div className="text-primary">
              {facebookProfile && (
                <Button variant="link" size="icon" asChild>
                  <Link
                    href={linkedinProfile}
                    rel="noopener noreferrer"
                    target="_blank"
                  >
                    <LucideFacebook className="w-6 h-6 hover:scale-125 transition-colors  duration-300" />
                  </Link>
                </Button>
              )}
            </div>
            <div className="text-gray-600">
              {twitterProfile && (
                <Button variant="link" size="icon" asChild>
                  <Link
                    href={linkedinProfile}
                    rel="noopener noreferrer"
                    target="_blank"
                  >
                    <TwitterLogoIcon className="w-6 h-6 hover:scale-125 transition-colors duration-300" />
                  </Link>
                </Button>
              )}
            </div>
            <div className="text-primary">
              {tiktokProfile && (
                <Button variant="link" size="icon" asChild>
                  <Link
                    href={tiktokProfile}
                    rel="noopener noreferrer"
                    target="_blank"
                  >
                    <FaTiktok className="w-6 h-6 hover:scale-125 transition-colors duration-300" />
                  </Link>
                </Button>
              )}
            </div>
            <div>
              {canEdit && (
                <EditSocialsAction
                  id={id}
                  dataType="socials"
                  linkedinProfile={linkedinProfile}
                  twitterProfile={twitterProfile}
                  facebookProfile={facebookProfile}
                  tiktokProfile={tiktokProfile}
                />
              )}
            </div>
          </div>
        </div>

        <Separator className="h-[2px] my-3" />

        {/* Profile Navigation */}
        <div className="flex items-center flex-col max-md:space-y-3 md:space-x-3 md:flex-row md:justify-start w-full md:w-2/3 p-3 flex-wrap">
          <Button variant="link">
            <Link href="#bio" className="text-lg">
              Bio
            </Link>
          </Button>
          <Button variant="link">
            <Link href="#experience" className="text-lg">
              Experience
            </Link>
          </Button>
          <Button variant="link">
            <Link href="#expertise" className="text-lg">
              Expertise
            </Link>
          </Button>
          <Button variant="link">
            <Link href="#industry" className="text-lg">
              Industry
            </Link>
          </Button>
          <Button variant="link">
            <Link href="#toolkit" className="text-lg">
              Toolkit
            </Link>
          </Button>
          <Button variant="link">
            <Link href="#reviews" className="text-lg">
              Reviews
            </Link>
          </Button>
        </div>
      </div>

      {/* <ProfileReviewPage /> */}

      <div id="bio"></div>
      <ProfileBioPage canEdit={canEdit} bio={bio} dataType="bio" id={id} />

      <div id="experience"></div>
      <ProfileSkillList
        data={experiences}
        canEdit={canEdit}
        dataType="experience"
        name="Experience"
      />

      <div id="expertise"></div>
      <ProfileSkillList
        data={expertise}
        canEdit={canEdit}
        dataType="expertise"
        name="Expertise"
      />

      <div id="industry"></div>
      <ProfileSkillList
        data={industries}
        canEdit={canEdit}
        dataType="industry"
        name="Industry"
      />

      <div id="toolkit"></div>
      <ProfileSkillList
        data={toolkit}
        canEdit={canEdit}
        dataType="tool"
        name="Toolkit"
      />

      {/* <ProfileExperience /> */}

      {/* <div id="reviews"></div> */}
      {/* <ProfileTestmonialPage title="Reviews (5)" /> */}

      <div className="mt-12">
        <Footer />
      </div>
    </div>
  );
};

export default ProfileDisplayPage;
