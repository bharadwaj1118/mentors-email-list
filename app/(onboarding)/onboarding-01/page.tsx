import React from 'react';
import Onboarding01 from './_components/profile-form';
import { currentUser } from '@clerk/nextjs';

import { getUserByclerkId } from '@/lib/actions/user.action';

const Onboarding01Page = async () => {

  const clerkUser = await currentUser();
  if (!clerkUser) return <div>Not logged in</div>;
  
  const user = await getUserByclerkId(clerkUser?.id);

  return (
    <div>
      <Onboarding01 user={JSON.stringify(user)} />
    </div>
  );
};

export default Onboarding01Page;
