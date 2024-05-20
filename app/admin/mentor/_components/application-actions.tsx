"use client";

import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { useTransition } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

import { updateMentorApplicationStatus } from "@/lib/actions/admin.action";

export function AcceptApplicationDropdownItem({ id }: { id: number }) {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const handleAcceptApplication = () =>
    startTransition(async () => {
      try {
        await updateMentorApplicationStatus({
          id,
          applicationStatus: "ACCEPTED",
        });
        toast.success("Application accepted");
        router.refresh();
      } catch (error) {
        console.error(error);
        toast.error("Error accepting application");
      }
    });

  return (
    <DropdownMenuItem disabled={isPending} onClick={handleAcceptApplication}>
      Approve
    </DropdownMenuItem>
  );
}

export function RejectApplicationDropDownItem({ id }: { id: number }) {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const handleRejectApplication = () =>
    startTransition(async () => {
      try {
        await updateMentorApplicationStatus({
          id,
          applicationStatus: "DECLINED",
        });
        toast.success("Application declined");
        router.refresh();
      } catch (error) {
        console.error(error);
        toast.error("Error declining application");
      }
    });
  return (
    <DropdownMenuItem disabled={isPending} onClick={handleRejectApplication}>
      Decline
    </DropdownMenuItem>
  );
}
