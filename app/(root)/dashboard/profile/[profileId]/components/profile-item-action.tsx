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
import { Expertise, Tool } from "@prisma/client";
import { useEditProfileStore } from "@/hooks/use-edit-profile-store";

interface Industry {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
}

interface ProfileItemActionProps {
  data: Industry | Expertise | Tool;
  dataType: string;
}

export default function ProfileItemAction({
  data,
  dataType,
}: ProfileItemActionProps) {
  const { onOpen } = useModal();
  const { isActive, toggleActive } = useEditProfileStore();

  const handleEdit = () => {
    if (dataType === "industry") {
      onOpen("editIndustry", {
        industry: data,
      });
    } else if (dataType === "tool") {
      onOpen("editTool", {
        tool: data,
      });
    } else if (dataType === "expertise") {
      onOpen("editExpertise", {
        expertise: data,
      });
    } else if (dataType === "experience") {
      onOpen("editExperience", {
        experience: data,
      });
    }
  };

  const handleDelete = () => {
    if (dataType === "industry") {
      onOpen("deleteIndustry", {
        industry: data,
      });
    } else if (dataType === "tool") {
      onOpen("deleteTool", {
        tool: data,
      });
    } else if (dataType === "expertise") {
      onOpen("deleteExpertise", {
        expertise: data,
      });
    } else if (dataType === "experience") {
      onOpen("deleteExperience", {
        experience: data,
      });
    }
  };
  if (!isActive) {
    return null;
  }

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
            onClick={handleEdit}
          >
            <div className="flex gap-1 text-primary items-center cursor-pointer">
              <PencilIcon className="w-4 h-4 mr-1" />
              Edit
            </div>
          </DropdownMenuItem>
          <DropdownMenuSeparator className="h-[1px]" />
          <DropdownMenuItem
            className="flex gap-1 items-center cursor-pointer"
            onClick={handleDelete}
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
}
