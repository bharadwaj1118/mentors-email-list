import React from 'react';

interface ProfileIdPageProps {
  params: {
    profileId: string;
  };
}

const ProfileIdPage = ({ params }: ProfileIdPageProps) => {
  const profileId = params.profileId;
  return (
    <div>
      <h1>Profile ID: {profileId}</h1>
    </div>
  );
};

export default ProfileIdPage;
