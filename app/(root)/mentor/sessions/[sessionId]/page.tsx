import {
  CheckCircle2,
  Video,
  CalendarClock,
  VideoIcon,
  ArrowUpRight,
} from "lucide-react";
import Link from "next/link";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

import { calculatePrice, formattedStringToDDMonthYearTime } from "@/lib/format";
import { db } from "@/lib/db";
import { getSelf } from "@/lib/actions/user.action";
import { getInitials } from "@/lib/utils";
import SessionDetailsCard from "@/components/shared/sessions/session-details-card";

interface SessionPageProps {
  params: {
    sessionId: string;
  };
}

const SessionPage = async ({ params }: SessionPageProps) => {
  const { sessionId } = params;
  const session = await db.session.findUnique({
    where: {
      id: sessionId,
    },
    select: {
      objective: true,
      category: true,
      outcome: true,
      start: true,
      end: true,
      duration: true,
      price: true,
      status: true,
      mentee: {
        select: {
          id: true,
          username: true,
          imageUrl: true,
          position: true,
          organization: true,
        },
      },
      mentor: {
        select: {
          id: true,
          timeZone: true,
        },
      },
    },
  });

  const user = await getSelf();

  if (!session) {
    return null;
  }

  return (
    <div className="mx-auto h-full max-w-5xl p-3 md:p-6 mt-[80px]">
      {/* SESSION DETAILS */}

      <h3 className="h4">Session Request</h3>

      {/* SCHDULE SESSION */}
      <div className="mt-3 w-full space-y-3 rounded-md bg-white p-3">
        <div>
          <p className="large">Schedule session</p>
          <p className="muted">Sessions must be scheduled 48 hours before</p>
          <Button className="my-3 rounded-full">
            <CalendarClock className="mr-2 h-4 w-4" />{" "}
            {session?.start
              ? formattedStringToDDMonthYearTime(session?.start)
              : "Select Time/date"}
          </Button>
        </div>
        <Separator />
      </div>

      {/* SESSION DETAILS */}
      <SessionDetailsCard
        roleLabel="Mentee"
        profileUrl="/dashboard/profile"
        session={session}
        otherUser={session.mentee}
        currentUser={session.mentor}
      />

      <div></div>
    </div>
  );
};

export default SessionPage;
