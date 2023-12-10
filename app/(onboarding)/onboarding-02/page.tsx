import React from 'react';
import Onboarding01 from './_components/profile-form';
import { auth } from '@clerk/nextjs';
import mongoose from 'mongoose';
import { getUserById } from '@/lib/actions/user.action';
import { json } from 'stream/consumers';
import Onboarding02 from './_components/profile-form';

const Onboarding02Page = async () => {
  const { userId } = auth();
  if (!userId) return null;

  const mongoUser = await getUserById(userId);
  return (
    <div>
      <Onboarding02 clerkId={userId} user={JSON.stringify(mongoUser)} />
    </div>
  );
};

export default Onboarding02Page;
