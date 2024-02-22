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

  if (profileId == null) {
    return <div>Profile not found</div>;
  }

  const user = await db.user.findUnique({
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
      <ProfileDisplayPage user={JSON.stringify(user)} />
    </div>
  );
};

export default page;
