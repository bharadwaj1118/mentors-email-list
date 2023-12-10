import React from 'react';
import Onboarding01 from './_components/profile-form';
import { auth } from '@clerk/nextjs';
import { getUserById } from '@/lib/actions/user.action';

const Onboarding01Page = async () => {
  const { userId } = auth();
  if (!userId) return null;

  const mongoUser = await getUserById(userId);
  return (
    <div>
      <Onboarding01 clerkId={userId} user={JSON.stringify(mongoUser)} />
    </div>
  );
};

export default Onboarding01Page;
