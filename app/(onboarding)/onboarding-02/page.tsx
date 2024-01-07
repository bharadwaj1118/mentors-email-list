import React from 'react';
import { currentUser } from '@clerk/nextjs';

import { getUserByclerkId } from '@/lib/actions/user.action';
import Onboarding02 from './_components/profile-form';

const Onboarding02Page = async () => {
  const clerkUser = await currentUser();
  if (!clerkUser) return <div>Not logged in</div>;
  
  const user = await getUserByclerkId(clerkUser?.id);

  return (
    <div>
      <Onboarding02 user={JSON.stringify(user)} />
    </div>
  );
};

export default Onboarding02Page;
