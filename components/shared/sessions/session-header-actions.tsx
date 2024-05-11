"use client";
import React from "react";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { toast } from "sonner";

import { Role, SessionStatus } from "@prisma/client";
import { cn } from "@/lib/utils";
import { updateSession } from "@/lib/actions/session.action";
import { useModal } from "@/hooks/use-modal-store";

type Props = {
  sessionId: string;
  role: Role;
  status: SessionStatus;
  buttonBaseClasses: string;
  buttonThemeClasses: string;
};

export const SessionHeaderActions = ({
  sessionId,
  role,
  status,
  buttonBaseClasses,
  buttonThemeClasses,
}: Props) => {
  const router = useRouter();
  const { onOpen } = useModal();

  const showReschedule: Boolean =
    status === SessionStatus.ACCEPTED || status === SessionStatus.AWAITING_HOST;
  const showCancel: Boolean = status === SessionStatus.ACCEPTED;
  const showReject: Boolean =
    role === Role.MENTOR && status === SessionStatus.AWAITING_HOST;
  const showAccept: Boolean =
    role === Role.MENTOR && status === SessionStatus.AWAITING_HOST;

  const handleReschedule = async () => {
    console.log("Reschedule");
  };

  // 2. Define a submit handler.
  const handleAccept = async () => {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.

    try {
      await updateSession({
        id: sessionId,
        status: "ACCEPTED",
      });

      toast.success(" Accepted the session");
      router.refresh();
    } catch (error) {
      console.log(error);
      toast.error("Unexpected Error...");
    }
  };

  const handleDecline = async () => {
    onOpen("declineSession", {
      session: {
        id: sessionId,
        status: SessionStatus.REJECTED,
      },
    });
  };

  const handleCancel = async () => {
    onOpen("cancelSession", {
      session: {
        id: sessionId,
        status: SessionStatus.CANCELLED,
      },
    });
  };

  return (
    <div className="pt-4 flex items-center justify-center gap-4 flex-col md:flex-row">
      {showReject && (
        <Button
          className={cn(buttonBaseClasses, buttonThemeClasses)}
          variant="outline"
          onClick={handleDecline}
        >
          Decline
        </Button>
      )}
      {showCancel && (
        <Button
          className={cn(buttonBaseClasses, buttonThemeClasses)}
          variant="outline"
          onClick={handleCancel}
        >
          Cancel
        </Button>
      )}
      {showReschedule && (
        <Button
          className={cn(buttonBaseClasses, buttonThemeClasses)}
          variant="outline"
          onClick={handleReschedule}
        >
          Reschedule
        </Button>
      )}

      {showAccept && (
        <Button
          className={cn(buttonBaseClasses, buttonThemeClasses)}
          variant="outline"
          onClick={handleAccept}
        >
          Accept
        </Button>
      )}
    </div>
  );
};
