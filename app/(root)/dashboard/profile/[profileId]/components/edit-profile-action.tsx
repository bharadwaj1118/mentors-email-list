"use client";
import { Button } from "@/components/ui/button";
import { useEditProfileStore } from "@/hooks/use-edit-profile-store";

import { useModal } from "@/hooks/use-modal-store";
import { ImportIcon, PencilIcon, XIcon } from "lucide-react";

interface EditBioActionProps {
  dataType: string;
  bio: string;
  id: string;
}

export function EditProfileAction() {
  const { isActive, toggleActive } = useEditProfileStore();
  const { onOpen } = useModal();

  const handleChange = () => {
    // onOpen("editProfile");
    toggleActive();
  };
  return (
    <Button variant="outline" onClick={handleChange}>
      {isActive ? (
        <div className="flex items-center ">
          <XIcon className="mr-1 w-4 h-4" /> Cancel
        </div>
      ) : (
        <div className="flex items-center ">
          <PencilIcon className="mr-1 w-4 h-4" /> Edit
        </div>
      )}
    </Button>
  );
}

export function EditBioAction({ bio, id }: EditBioActionProps) {
  const { onOpen } = useModal();
  const { isActive } = useEditProfileStore();

  const handleClick = () => {
    onOpen("editBio", {
      user: {
        bio,
        id,
      },
    });
  };

  if (!isActive) {
    return null;
  }
  return (
    <Button
      variant="outline"
      className="flex items-center"
      onClick={handleClick}
    >
      <PencilIcon className="w-4 h-4 mr-1" />
      Edit
    </Button>
  );
}
