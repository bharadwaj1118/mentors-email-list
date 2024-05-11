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
  buttonStyles: string;
};

export const SessionHeaderActions = ({
  sessionId,
  role,
  status,
  buttonStyles,
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
    onOpen("rescheduleSession", {
      session: {
        id: sessionId,
        status: SessionStatus.RESCHEDULED,
        declinedBy: role,
      },
    });
  };

  const handleAccept = async () => {
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
        declinedBy: role,
      },
    });
  };

  const handleCancel = async () => {
    onOpen("cancelSession", {
      session: {
        id: sessionId,
        status: SessionStatus.CANCELLED,
        declinedBy: role,
      },
    });
  };

  return (
    <div className="pt-4 flex items-center justify-center gap-4 flex-col md:flex-row">
      {showReject && (
        <Button
          className={buttonStyles}
          variant="outline"
          onClick={handleDecline}
        >
          Decline
        </Button>
      )}
      {showCancel && (
        <Button
          className={buttonStyles}
          variant="outline"
          onClick={handleCancel}
        >
          Cancel
        </Button>
      )}
      {showReschedule && (
        <Button
          className={buttonStyles}
          variant="outline"
          onClick={handleReschedule}
        >
          Reschedule
        </Button>
      )}

      {showAccept && (
        <Button
          className={buttonStyles}
          variant="outline"
          onClick={handleAccept}
        >
          Accept
        </Button>
      )}
    </div>
  );
};
