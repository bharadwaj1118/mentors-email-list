"use client";
import { Button } from "@/components/ui/button";

import { useModal } from "@/hooks/use-modal-store";
import { PencilIcon } from "lucide-react";

export function EditProfileAction() {
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
