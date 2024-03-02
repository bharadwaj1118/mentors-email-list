"use client";

import React from "react";
import { MoreVerticalIcon, PencilIcon, TrashIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { useModal } from "@/hooks/use-modal-store";
import { industry } from "@prisma/client";

interface Industry {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
}

interface ProfileItemActionProps {
  data: Industry;
}

const ProfileItemAction = ({ data }: ProfileItemActionProps) => {
  const { onOpen } = useModal();
  return (
    <div>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" size="icon">
            <MoreVerticalIcon className="w-4 h-4 " />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="flex items-center flex-col">
          <DropdownMenuItem
            className="flex gap-1 items-center cursor-pointer"
            onClick={() => {
              onOpen("editIndustry", {
                industry: data,
              });
            }}
          >
            <div className="flex gap-1 text-primary items-center cursor-pointer">
              <PencilIcon className="w-4 h-4 mr-1" />
              Edit
            </div>
          </DropdownMenuItem>
          <DropdownMenuSeparator className="h-[1px]" />
          <DropdownMenuItem
            className="flex gap-1 items-center cursor-pointer"
            onClick={() => {
              onOpen("deleteIndustry", {
                industry: data,
              });
            }}
          >
            <div className="flex gap-1 text-red-600 items-center cursor-pointer">
              <TrashIcon className="w-4 h-4 mr-1" />
              Delete
            </div>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export function EditProfileButton() {
  const { onOpen } = useModal();
  return (
    <Button
      variant="outline"
      className="flex items-center"
      onClick={() => {
        onOpen("editProfile");
      }}
    >
      <PencilIcon className="w-4 h-4 mr-1" />
      Edit
    </Button>
  );
}

export default ProfileItemAction;
