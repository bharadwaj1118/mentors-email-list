"use client";

import axios from "axios";
import { useState } from "react";
import { useRouter } from "next/navigation";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { toast } from "sonner";

import { useModal } from "@/hooks/use-modal-store";
import { Button } from "@/components/ui/button";
import { deleteExperienceById } from "@/lib/actions/experience.action";

export const DeleteExperienceModal = () => {
  const { isOpen, onClose, type, data } = useModal();
  const router = useRouter();
  console.log("Delete comes here!");

  const isModalOpen = isOpen && type === "deleteExperience";
  const { experience } = data;

  const id = experience?.id;

  const [isLoading, setIsLoading] = useState(false);

  const onClick = async () => {
    try {
      setIsLoading(true);
      onClose();
      if (id) {
        await deleteExperienceById(id);
      }
      router.refresh();
      toast.success("Deleted successfully");
    } catch (error) {
      console.log(error);
      toast.error("Error. Please try again");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={isModalOpen} onOpenChange={onClose}>
      <DialogContent className="bg-white text-black p-0 overflow-hidden">
        <DialogHeader className="pt-8 px-6">
          <DialogTitle className="text-2xl text-center font-bold">
            Are you sure you want to do this?
          </DialogTitle>
          <DialogDescription className="text-center text-zinc-500 text-base">
            <span className="font-semibold">{experience?.name}</span> will be
            deleted.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className=" px-6 py-4 bg-destructive-foreground">
          <div className="flex items-center justify-between w-full">
            <Button disabled={isLoading} onClick={onClose} variant="ghost">
              Cancel
            </Button>
            <Button
              disabled={isLoading}
              onClick={onClick}
              variant="destructive"
            >
              Confirm
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
