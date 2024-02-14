import React from "react";
import ProfileBody from "../_components/profile-page";
import { db } from "@/lib/db";

interface Props {
  params: {
    profileId: string;
  };
}

const page = async ({ params }: Props) => {
  const { profileId } = params;

  if (profileId == null) {
    return <div>Profile not found</div>;
  }

  const users = await db.user.findUnique({
    where: {
      id: profileId,
    },
    include: {
      expertise: true,
      industries: true,
      languages: true,
      toolkit: true,
    },
  });

  return (
    <div>
      <ProfileBody user={JSON.stringify(users)} />
    </div>
  );
};

export default page;
