import { ProfileForm } from '@/components/user-onboard-form';
import React, { use } from 'react';
import { redirectToSignIn } from '@clerk/nextjs';
import { auth } from '@clerk/nextjs';
import { currentUser } from '@clerk/nextjs';

import prismadb from '@/lib/prismadb';

interface ProfileIdPageProps {
  params: {
    profileId: string;
  };
}

const profilePage = async ({ params }: ProfileIdPageProps) => {
  // const { userId, getToken } = auth();

  // if (!userId) {
  //   return redirectToSignIn();
  // }
  // const profile = await prismadb.profile.findUnique({
  //   where: {
  //     id: params.profileId,
  //     userId,
  //   },
  // });
  return (
    <div className="container mx-auto">
      <ProfileForm />
    </div>
  );
};

export default profilePage;
