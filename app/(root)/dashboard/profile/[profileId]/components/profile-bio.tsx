import React from "react";
import { EditBioAction } from "./edit-profile-action";
import { Separator } from "@/components/ui/separator";

interface ProfileBioPageProps {
  canEdit: boolean;
  id: string;
  bio: string | null;
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
      <div className="max-w-4xl mt-6 bg-background mx-auto w-full p-3 shadow rounded-lg border">
        <div className="max-w-4xl mx-auto space-y-3 py-3">
          <div className="flex justify-between items-center">
            <h3 className="h3 ml-3 md:ml-6">Bio</h3>
            {canEdit && <EditBioAction id={id} bio={bio} dataType={dataType} />}
          </div>
          <Separator className="m-3 h-[1px] text-slate-500" />
          <p className="text-base text-slate-800 pl-3 md:pl-6">{bio}</p>
        </div>
      </div>
    </div>
  );
};

export default ProfileBioPage;
