import React from "react";

import { db } from "@/lib/db";
import ProfileDisplayPage from "./components/profile-display";

interface Props {
  params: {
    profileId: string;
  };
}

const page = async ({ params }: Props) => {
  const { profileId } = params;

  if (profileId === null) {
    return <div>Profile not found</div>;
  }

  const user = await db.user.findUnique({
    where: {
      id: profileId,
    },
    select: {
      id: true,
      imageUrl: true,
      position: true,
      organization: true,
      bio: true,
      city: true,
      country: true,
      location: true,
      linkedinProfile: true,
      twitterProfile: true,
      facebookProfile: true,
      expertise: true,
      industries: true,
      languages: true,
      toolkit: true,
      experiences: true,
      joinedAt: true,
      username: true,
      duration: true,
      price: true,
    },
  });

  return (
    <div className="pt-[80px]">
      <ProfileDisplayPage user={JSON.stringify(user)} profileId={profileId} />
    </div>
  );
};

export default page;
