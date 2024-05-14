"use client";
import React from "react";
import { ChevronRight, PlusIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useModal } from "@/hooks/use-modal-store";
import { useRouter } from "next/navigation";

interface OnboardingChecklistActionsProps {
  dataType: string;
  route?: string;
}

export const OnboardingChecklistActions = ({
  dataType,
  route,
}: OnboardingChecklistActionsProps) => {
  const { onOpen } = useModal();
  const router = useRouter();
  const handleClick = async () => {
    if (route !== "profile") {
      await router.push(
        "/dashboard/profile/06159d08-ea5a-4268-8948-08f9a77ba15b"
      );
    }
    if (dataType === "industry") onOpen("addIndustry");
    else if (dataType === "expertise") onOpen("addExpertise");
    else if (dataType === "experience") onOpen("addExperience");
    else if (dataType === "tool") onOpen("addTool");
    else if (dataType === "bio") onOpen("editBio");
  };

  return (
    <div>
      <Button
        className="text-blue-200 bg-blue-950 hover:bg-blue-950/90"
        onClick={handleClick}
      >
        <ChevronRight className="w-5 h-5" />
      </Button>
    </div>
  );
};
