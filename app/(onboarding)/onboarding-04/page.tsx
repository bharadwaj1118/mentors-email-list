import React from 'react';
import { currentUser } from '@clerk/nextjs';

import { getUserByclerkId } from '@/lib/actions/user.action';
import Onboarding04 from './_components/profile-form';

const Onboarding04Page = async () => {
  const clerkUser = await currentUser();
  if (!clerkUser) return <div>Not logged in</div>;
  
  const user = await getUserByclerkId(clerkUser?.id);
  return (
    <div>
      <Onboarding04 user={JSON.stringify(user)} />
    </div>
  );
};

export default Onboarding04Page;
