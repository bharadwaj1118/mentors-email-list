import { ProfileForm } from '@/components/user-onboard-form';
import React, { use } from 'react';

import prismadb from '@/lib/prismadb';

interface ProfileIdPageProps {
  params: {
    profileId: string;
  };
}

const profilePage = async ({ params }: ProfileIdPageProps) => {
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
