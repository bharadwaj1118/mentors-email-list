import { getUserByProfileId } from '@/lib/actions/user.action';
import { auth } from '@clerk/nextjs';
import React from 'react';
import ProfileBody from '../_components/profile-page';

interface Props {
  params: {
    profileId: string;
  };
}

const page = async ({ params }: Props) => {
  const { profileId } = params;

  const user = await getUserByProfileId(profileId);

  if (profileId == null) {
    return <div>Profile not found</div>;
  }

  return (
    <div>
      <ProfileBody user={JSON.stringify(user)} />
    </div>
  );
};

export default page;
