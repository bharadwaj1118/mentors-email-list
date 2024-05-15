import React from "react";

import { db } from "@/lib/db";
import { ProfileDisplayPage } from "@/components/shared/profile/profile-display";

interface Props {
  params: {
    profileId: string;
  };
}

const page = async ({ params }: Props) => {
  const { profileId } = params;

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
      <ProfileDisplayPage user={user} profileId={profileId} />
    </div>
  );
};

export default page;
