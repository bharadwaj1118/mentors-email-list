import React from 'react';
import prismadb from '@/lib/prismadb';
import { getUserById, getUserByProfileId } from '@/lib/actions/user.action';
import { stringify } from 'querystring';
import ProfileBody from './_components/profile';

interface ProfileIdPageProps {
  params: {
    profileId: string;
  };
}

const ProfileIdPage = async ({ params }: ProfileIdPageProps) => {
  if (params.profileId == null) {
    return 'error';
  }
  const profile = await getUserByProfileId(params.profileId);
  console.log(profile);
  const {
    name,
    picture,
    languages,
    expertise,
    toolkit,
    industries,
    joinedAt,
    bio,
    oraganization,
    position,
    shortBio,
    portfolioWebsite,
    city,
    role,
    duration,
    price,
  } = profile;

  return (
    <div>
      <h1>Profile ID: {price}</h1>
      <ProfileBody
        name={name}
        picture={picture}
        languages={languages}
        expertise={expertise}
        toolkit={toolkit}
        industries={industries}
        joinedAt={joinedAt}
        bio={bio}
        organization={oraganization}
        position={position}
        shortBio={shortBio}
        portfolioWebsite={portfolioWebsite}
        city={city}
        role={role}
        duration={duration}
        price={price}
      />
    </div>
  );
};

export default ProfileIdPage;
