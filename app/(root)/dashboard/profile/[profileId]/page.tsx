import React from "react";

import { db } from "@/lib/db";
import { ProfileDisplayPage } from "@/components/shared/profile/profile-display";
import { addProfileViewCount } from "@/lib/actions/helper.action";
import ProfileMeta from "@/components/shared/metadata/ProfileMeta";

import type { Metadata } from "next";
export const metadata: Metadata = {
  title: "Profile | Mentors CX",
  description:
    "Update and personalize your Mentors CX profile. Ensure your information is up-to-date.",
};

interface Props {
  params: {
    profileId: string;
  };
}

const page = async ({ params }: Props) => {
  const { profileId } = params;

  await addProfileViewCount({ profileId });

  const user = await db.user.findUnique({
    where: {
      id: profileId,
    },
    include: {
      expertise: true,
      experiences: true,
      toolkit: true,
      industries: true,
      languages: true,
    },
  });

  if (!user) {
    return <div>Profile not found</div>;
  }

  return (
    <div className="pt-[80px]">
      <ProfileMeta
        title="title"
        description="description"
        image={user.imageUrl}
        url={`${process.env.NEXT_PUBLIC_WEBSITE_URL}dashboard/profile/${user.id}`}
      />
      <ProfileDisplayPage user={user} profileId={profileId} />
    </div>
  );
};

export default page;
