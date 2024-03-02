"use client";
import React from "react";
import { PlusIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useModal } from "@/hooks/use-modal-store";

const AddItemAction = () => {
  const { onOpen } = useModal();
  const hadleClick = () => {
    onOpen("addIndustry");
  };

  return (
    <div>
      <Button size="sm" variant="outline" onClick={hadleClick}>
        <PlusIcon className="w-4 h-4 mr-1" /> Add
      </Button>
    </div>
  );
};

export default AddItemAction;
