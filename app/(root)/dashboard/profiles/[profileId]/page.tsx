import React from 'react';

interface ProfileIdPageProps {
  params: {
    profileId: string;
  };
}

const ProfileIdPage = async ({ params }: ProfileIdPageProps) => {
  if (params.profileId == null) {
    return 'error';
  }
  // const user = await db.user.findUnique({
  //   where: {
  //     id: params.profileId,
  //   },
  // })
  return (
    <div>
      {/* <ProfileBody user={JSON.stringify(user)}
      /> */}
      This is profile {params.profileId}
    </div>
  );
};

export default ProfileIdPage;
