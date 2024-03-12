import React from "react";
import { EditBioAction } from "./edit-profile-action";

interface ProfileBioPageProps {
  canEdit: boolean;
  id: string;
  bio: string;
  dataType: string;
}
const ProfileBioPage = ({
  canEdit,
  id,
  bio,
  dataType,
}: ProfileBioPageProps) => {
  return (
    <div id="bio">
      <div className="max-w-5xl mt-12 bg-white mx-auto w-full p-3 shadow rounded">
        <div className="max-w-3xl mx-auto space-y-3 py-6">
          <div className="flex justify-between items-center">
            <h3 className="h3 ml-3">Bio</h3>
            {canEdit && <EditBioAction id={id} bio={bio} dataType={dataType} />}
          </div>
          <hr className="my-3 h-[1px]" />
          <p className="large">{bio}</p>
        </div>
      </div>
    </div>
  );
};

export default ProfileBioPage;
