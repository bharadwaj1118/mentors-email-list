"use client";
import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useRouter } from "next/navigation";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { formatDateToWeekDDMonth, formatDateToHHMMToHHMM } from "@/lib/format";
import SessionAction from "@/app/(root)/_components/shared/session-action";
import { ChevronRight } from "lucide-react";
import { utcToZonedTime, zonedTimeToUtc } from "date-fns-tz";

import { toast } from "sonner";
import { updateSession } from "@/lib/actions/session.action";
import { Role, Session, SessionStatus } from "@prisma/client";
import { date } from "zod";

type CurrentPage = "MENTOR_DASHBOARD" | "MENTOR_SESSION" | "MENTEE_SESSIONS";

type SessionCardProps = {
  session: Session;
  currUser: {
    id: string;
    role: Role | null;
    timeZone: string | null;
  };
  otherUser: {
    username: string;
    imageUrl: string;
  };
  currPage?: CurrentPage;
};

const SessionCard = ({ session, currUser, otherUser }: SessionCardProps) => {
  const router = useRouter();

  console.log(session);

  // Permissions based on the current Page, role and the session status
  const showViewButton = true;
  const showAcceptButton =
    currUser.role === "MENTOR" && session.status === "AWAITING_HOST";
  const showDeclineButton = session.status === "AWAITING_HOST";
  const showCancelButton = session.status === "ACCEPTED";
  const showActionButton =
    showAcceptButton || showDeclineButton || showCancelButton;

  // Transformations for the display
  const startInTimeZone = utcToZonedTime(
    new Date(session.start),
    currUser?.timeZone || "UTC"
  );
  const endInTimeZone = utcToZonedTime(
    new Date(session.end),
    currUser?.timeZone || "UTC"
  );

  // 2. Define a submit handler.
  const handleAcceptSession = async () => {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    try {
      await updateSession({
        id: session.id,
        status: "ACCEPTED",
        mentorId: currUser.id,
      });

      toast.success(" Accepted the session");
      router.refresh();
    } catch (error) {
      console.log(error);
      toast.error("Unexpected Error...");
    }
  };

  const handleDeclineSession = async () => {
    try {
      await updateSession({
        id: session.id,
        status: SessionStatus.REJECTED,
        mentorId: currUser.id,
      });
      toast.success("Declined the session");
      router.refresh();
    } catch (error) {
      console.log(error);
      toast.error("Unexpected Error...");
    }
  };

  const handleCancelSession = async () => {
    try {
      await updateSession({
        id: session.id,
        status: SessionStatus.CANCELLED,
        mentorId: currUser.id,
      });
      toast.success("Cancelled the session");
      router.refresh();
    } catch (error) {
      console.log(error);
      toast.error("Unexpected Error...");
    }
  };

  return (
    <div className="mt-3 w-full rounded-md border-1 p-3 shadow-sm bg-gray-100/50">
      <div className="flex space-x-3">
        <div className="p-3">
          <Avatar>
            <AvatarImage src={otherUser.imageUrl} />
            <AvatarFallback>User</AvatarFallback>
          </Avatar>
        </div>
        <div className="w-full space-y-3">
          <div className="flex items-center justify-between">
            <div>
              <p className="large max-md:line-clamp-4">{session.objective}</p>
              <div className="mt-1 flex items-center space-x-3">
                <p className="small">{otherUser.username}</p>
                <Badge variant="outline" className="muted rounded-full">
                  {session.category}
                </Badge>
              </div>
            </div>
            <div className="hidden md:flex flex-col gap-4">
              <Button asChild variant="outline">
                <Link href={`/mentor/session/${session.id}`}>
                  View <ChevronRight className="w-4 h-4 ml-1" />
                </Link>
              </Button>

              {showActionButton && (
                <SessionAction
                  onAccept={handleAcceptSession}
                  onDecline={handleDeclineSession}
                  onCancel={handleCancelSession}
                  cancel={showCancelButton}
                  accept={showAcceptButton}
                  decline={showDeclineButton}
                />
              )}
            </div>
          </div>
          <Separator className="w-full" />
          <div className="flex w-fit justify-between items-start gap-4 flex-col md:flex-row">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="medium uppercase">
                  {formatDateToWeekDDMonth(startInTimeZone)}
                </p>
                <p className="muted mt-1">
                  {formatDateToHHMMToHHMM(startInTimeZone, endInTimeZone)}
                </p>
              </div>
              <div>
                <p className="medium uppercase">duration</p>
                <p className="muted mt-1">{session.duration}min</p>
              </div>
            </div>
            <div className="flex items-start justify-around gap-4">
              <div>
                <p className="medium uppercase">cost</p>
                <p className="muted mt-1">{session.price}$</p>
              </div>
              <div>
                <p className="medium uppercase">Status</p>
                <Badge className="muted mt-1 rounded-full" variant="outline">
                  {session.status}
                </Badge>
              </div>
            </div>
          </div>
          <Separator className="w-full md:hidden" />

          {/* Button Actions */}
          <div className="block md:hidden">
            <div className="flex md:hidden gap-4">
              <Button asChild variant="outline">
                <Link href={`/mentor/session/${session.id}`}>
                  View <ChevronRight className="w-4 h-4 ml-1" />
                </Link>
              </Button>

              {showActionButton && (
                <SessionAction
                  onAccept={handleAcceptSession}
                  onDecline={handleDeclineSession}
                  onCancel={handleCancelSession}
                  cancel={showCancelButton}
                  accept={showAcceptButton}
                  decline={showDeclineButton}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SessionCard;
