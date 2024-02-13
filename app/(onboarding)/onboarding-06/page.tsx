import React from "react";
import { currentUser } from "@clerk/nextjs";

import { getUserByclerkId } from "@/lib/actions/user.action";
import Onboarding06 from "./_components/profile-form";

const Onboarding06Page = async () => {
  const clerkUser = await currentUser();
  if (!clerkUser) return <div>Not logged in</div>;

  const user = await getUserByclerkId(clerkUser?.id);
  return (
    <div>
      <Onboarding06 user={JSON.stringify(user)} />
    </div>
  );
};

export default Onboarding06Page;
