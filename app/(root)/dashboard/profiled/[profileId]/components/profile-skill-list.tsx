import React from "react";

import Image from "next/image";

import AddItemAction from "./add-item-action";
import ProfileSkillItem from "./profile-skill-item";
interface ProfileSkillListProps {
  canEdit: boolean;
  industries: string;
}
const ProfileSkillList = ({ canEdit, industries }: ProfileSkillListProps) => {
  const industriesList = JSON.parse(industries);
  return (
    <div className="max-w-5xl mx-auto w-full p-3 bg-white mt-6">
      <div>
        <div className="flex justify-between items-center">
          <h3 className="h3 ml-3">Industry</h3>
          {canEdit && <AddItemAction />}
        </div>
        <hr className="my-3 h-[1px]" />

        {industriesList.length === 0 && (
          <div className="flex justify-center items-center flex-col gap-4">
            <Image
              src="/assets/waiting.svg"
              alt="avatar"
              width={100}
              height={100}
            />
            <p> Will be added soon!</p>
          </div>
        )}

        {industriesList.map((industry: any) => (
          <ProfileSkillItem
            imageUrl={industry.imageUrl}
            name={industry.name}
            description={industry.description}
            key={industry.id}
            id={industry.id}
            canEdit={canEdit}
          />
        ))}
      </div>
    </div>
  );
};

export default ProfileSkillList;
