"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useEditProfileStore } from "@/hooks/use-edit-profile-store";

import { useModal } from "@/hooks/use-modal-store";
import { ImportIcon, PencilIcon, XIcon } from "lucide-react";
import { UserProfile } from "@clerk/nextjs";

interface EditBioActionProps {
  dataType: string;
  bio: string;
  id: string;
}

interface EditSocialActionProps {
  dataType: string;
  id: string;
  linkedinProfile?: string;
  twitterProfile?: string;
  facebookProfile?: string;
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

export function EditBioAction({ dataType, id, bio }: EditBioActionProps) {
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

export function EditSocialsAction({
  dataType,
  id,
  linkedinProfile,
  twitterProfile,
  facebookProfile,
}: EditSocialActionProps) {
  const { onOpen } = useModal();
  const { isActive } = useEditProfileStore();

  const handleClick = () => {
    onOpen("editSocials", {
      user: {
        id,
        linkedinProfile,
        twitterProfile,
        facebookProfile,
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
      size="sm"
    >
      <PencilIcon className="w-4 h-4 mr-1" />
      Edit
    </Button>
  );
}

export function EditProfileImageAction() {
  const [open, setOpen] = useState(false);

  const handleClick = () => {
    setOpen(!open);
  };
  const { isActive } = useEditProfileStore();

  if (!isActive) {
    return null;
  }

  if (open) {
    return (
      <div>
        <UserProfile />
      </div>
    );
  }

  return (
    <Button
      variant="outline"
      className="flex items-center rounded-full p-1"
      onClick={handleClick}
      size="icon"
    >
      <PencilIcon className="w-4 h-4" />
    </Button>
  );
}
