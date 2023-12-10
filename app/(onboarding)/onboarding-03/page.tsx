import React from 'react';
import { auth } from '@clerk/nextjs';
import mongoose from 'mongoose';
import { getUserById } from '@/lib/actions/user.action';
import { json } from 'stream/consumers';
import Onboarding03 from './_components/profile-form';

const Onboarding03Page = async () => {
  const { userId } = auth();
  if (!userId) return null;

  const mongoUser = await getUserById(userId);
  return (
    <div>
      <Onboarding03 clerkId={userId} user={JSON.stringify(mongoUser)} />
    </div>
  );
};

export default Onboarding03Page;
