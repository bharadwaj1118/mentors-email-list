import React from 'react';
import { auth } from '@clerk/nextjs';
import { getUserById } from '@/lib/actions/user.action';
import Onboarding04 from './_components/profile-form';

const Onboarding04Page = async () => {
  const { userId } = auth();
  if (!userId) return null;

  const mongoUser = await getUserById(userId);
  return (
    <div>
      <Onboarding04 clerkId={userId} user={JSON.stringify(mongoUser)} />
    </div>
  );
};

export default Onboarding04Page;
