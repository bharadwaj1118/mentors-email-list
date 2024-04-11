import React from "react";
import Image from "next/image";
import {
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
} from "lucide-react";
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

interface ProfileDisplayPageProps {
  user: string;
  profileId: string;
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
    joinedAt,
  } = JSON.parse(user);

  // Get the self account
  const selfAccount = await getSelfId();
  if (!selfAccount) {
    return null;
  }

  // Check if the person can edit the profile
  const canEdit = profileId === selfAccount.id;

  return (
    <div className="relative">
      {/* Profile Details */}
      <div className="absolute right-8 top-8">
        {canEdit && <EditProfileAction />}
      </div>
      <div className="flex space-y-3 flex-col items-center justify-center bg-white md:mt-6 rounded shadow">
        <div className="flex items-center ">
          <div className="relative mt-12">
            <Image
              src={imageUrl}
              alt="avatar"
              width={100}
              height={100}
              className="h-32 w-32 rounded-full object-cover overflow-hidden"
            />
          </div>
        </div>

        <div className="flex justify-center items-center flex-col">
          <h3 className="h3">{username}</h3>
          <div className="flex items-center justify-center space-x-2">
            <p className="large text-muted-foreground">
              {position} @ {organization}
            </p>
            {canEdit && (
              <EditProfileDetailsAction
                position={position}
                organization={organization}
                id={id}
              />
            )}
          </div>
        </div>

        <div className="flex flex-col items-center justify-center muted max-md:space-y-1 md:flex-row md:justify-between md:space-x-6">
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

        {/* Reviews and Price */}
        <div className="md:w-2/3 mx-auto border-1 md:border-2 border-gray-200 py-4 px-6 shadow-md">
          <div className="flex flex-col items-center justify-center space-y-1 md:flex-row md:justify-between">
            <div className="flex flex-col items-center muted">
              <p className="font-bold text-2xl text-green-600">Free</p>
              <p className="text-sm">Price per hour</p>
            </div>
            <div className="flex flex-col items-center muted">
              <div className="bg-green-100 text-green-600 px-2 py-1 rounded-full font-semibold text-sm">
                <p className="text-sm">30 min</p>
              </div>
              <div>Time blocks Available</div>
            </div>
            <div className="flex flex-col items-center muted">
              <div className="flex items-center justify-center">
                <StarIcon className="w-4 h-4 fill-yellow-500 text-yellow-500 mr-1" />
                <p className="text-xl font-bold text-black">4.99</p>
              </div>
              <div>331 reviews / 593 reviews</div>
            </div>
          </div>

          <hr className="h-[2px] my-3 " />
          <div className="flex flex-row items-center justify-center space-x-3 md:justify-start">
            <div className="border-[2px] border-gray-200 rounded-md">
              <p className="text-center bg-gray-200 px-2 py-1 font-semibold capitalize text-sm">
                MON
              </p>
              <p className="text-center px-2 py-1 font-bold">11</p>
            </div>
            <div className="space-y-2">
              <p className="small">Next Availability</p>
              <div className="flex flex-row items-center justify-center space-x-1">
                <Badge variant="secondary" className="bg-gray-200 rounded-full">
                  in 18 days
                </Badge>
                <p className="muted">Monday, 11March. 10 AM CDT</p>
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
            <div className="text-primary">
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
            <div>
              {canEdit && (
                <EditSocialsAction
                  id={id}
                  dataType="socials"
                  linkedinProfile={linkedinProfile}
                  twitterProfile={twitterProfile}
                  facebookProfile={facebookProfile}
                />
              )}
            </div>
          </div>
        </div>

        <Separator className="h-[2px] my-3" />

        {/* Profile Navigation */}
        <div className="flex items-center flex-col max-md:space-y-3 md:space-x-3 md:flex-row md:justify-start w-full md:w-2/3 p-3">
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
          <div className="flex-1 text-primary text-lg text-end md:ml-auto">
            <CopyToClipboardButton id={id} />
          </div>
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
