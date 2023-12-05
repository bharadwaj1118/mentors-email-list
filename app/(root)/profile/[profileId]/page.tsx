import { ProfileForm } from '@/components/user-onboard-form';
import React, { use } from 'react';
import { redirectToSignIn } from '@clerk/nextjs';
// import { auth } from '@clerk/nextjs';
import { currentUser } from '@clerk/nextjs';

import prismadb from '@/lib/prismadb';
import { profileFormSchema } from '@/lib/formSchema';
import { z } from 'zod';

interface ProfileIdPageProps {
  params: {
    profileId: string;
  };
}

const profilePage = async ({ params }: ProfileIdPageProps) => {
  // const { userId } = auth();

  // if (!userId) {
  //   return redirectToSignIn();
  // }
  const profile = await prismadb.profile.findUnique({
    where: {
      id: params.profileId,
      // userId,
    },
  });
  return (
    <div className="container mx-auto">
      <ProfileForm initialData={profile} />
    </div>
  );
};

export default profilePage;
