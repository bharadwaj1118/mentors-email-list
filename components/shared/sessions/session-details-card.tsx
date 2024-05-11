import React from "react";
import { CheckCircle2, Video, ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { utcToZonedTime } from "date-fns-tz";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

import { cn, getInitials } from "@/lib/utils";
import { Session } from "@prisma/client";
import { Badge } from "@/components/ui/badge";
import { formatDateToWeekDDMonth, formatDateToHHMMToHHMM } from "@/lib/format";

type RoleType = "Mentor" | "Mentee";

type Props = {
  roleLabel: RoleType;
  profileUrl: string;
  session: Pick<
    Session,
    | "start"
    | "end"
    | "price"
    | "status"
    | "objective"
    | "category"
    | "outcome"
    | "duration"
  >;
  currentUser: {
    timeZone: string | null;
  };
  otherUser: {
    id: string;
    username: string;
    imageUrl: string;
  };
};

const SessionDetailsCard = (props: Props) => {
  const { roleLabel, profileUrl, session, currentUser, otherUser } = props;

  console.log(session.start, session.end);

  // Transformations for the Timezone
  const startInTimeZone = utcToZonedTime(
    new Date(session.start),
    currentUser?.timeZone || "UTC"
  );
  const endInTimeZone = utcToZonedTime(
    new Date(session.end),
    currentUser?.timeZone || "UTC"
  );

  // This is for transformations
  const profileLink = `/${profileUrl}/${otherUser.id}`;
  const priceLabel = session.price === 0 ? "Free" : `${session.price}$`;
  const priceLabelColor = session.price === 0 && "text-green-500";
  const statusLabel =
    session.status === "AWAITING_HOST" ? "Requested" : session.status;

  return (
    <div className="w-full mt-4 p-3 md:p-6 bg-background rounded shadow">
      {/* Session Details */}
      <div className="w-full flex flex-col md:flex-row gap-4 items-center justify-center">
        <p className="font-bold"> {formatDateToWeekDDMonth(startInTimeZone)}</p>
        <Separator
          orientation="vertical"
          className="max-md:hidden h-5 w-[1px] font-semibold"
        />
        <p className="font-bold">
          {" "}
          {formatDateToHHMMToHHMM(startInTimeZone, endInTimeZone)}
        </p>
        <Separator
          orientation="vertical"
          className="max-md:hidden h-5 w-[1px]"
        />
        <p className="font-bold">{currentUser.timeZone}</p>
      </div>

      <Separator className="my-4 h-[1px]" />

      {/* Session Profile Details */}
      <div className="md:pr-32 flex flex-col md:flex-row gap-4 flex-wrap items-center justify-between">
        <div className="flex gap-4 items-center">
          <Avatar>
            <AvatarImage src={otherUser.imageUrl} />
            <AvatarFallback>{getInitials(otherUser.username)}</AvatarFallback>
          </Avatar>
          <div>
            <p className="text-base font-semibold">{roleLabel}</p>
            <Button variant="link" size="lg" className="p-0" asChild>
              <Link href={profileLink}>
                {otherUser.username} <ArrowUpRight className="h-5 w-5 ml-1" />
              </Link>
            </Button>
          </div>
        </div>
        <div className="flex flex-col items-center gap-2">
          <p className="text-base font-semibold">Duration</p>
          <p className="text-muted-foreground text-base">
            {session.duration} min
          </p>
        </div>
        <div className="flex flex-col items-center gap-2">
          <p className="text-base font-semibold">Price</p>
          <p className={cn("text-muted-foreground text-base", priceLabelColor)}>
            {priceLabel}
          </p>
        </div>
        <div className="flex flex-col items-center gap-2">
          <p className="text-base font-semibold">Category</p>
          <Badge variant="secondary" className="rounded-full px-2 py-1">
            {session.category}
          </Badge>
        </div>
        <div className="flex flex-col items-center gap-2">
          <p className="text-base font-semibold">Status</p>
          <p className="text-primary-500 font-semibold uppercase">
            {statusLabel}
          </p>
        </div>
      </div>
      <Separator className="my-4 h-[1px]" />
      {/* Session Description */}
      <div className="space-y-4 md:w-3/4">
        <div>
          <p className="uppercase muted font-bold">objective</p>
          <p className="text-base font-semibold">{session.objective}</p>
        </div>

        <div>
          <p className="muted uppercase font-bold">
            Challenge and expected outcome
          </p>
          <p className="text-base font-normal">{session.outcome}</p>
        </div>
      </div>
      <Separator className="my-4 h-[1px]" />
      <div className="space-y-4">
        <div className="mt-3 flex w-fit items-center gap-2 rounded-md border-1 border-blue-800 p-2">
          <div>
            <Video className="h-6 w-6 bg-blue-500 p-1 text-white" />
          </div>
          <div className="large">Zoom</div>
          <div>
            <CheckCircle2 className="h-6 w-6 fill-blue-700 text-white" />
          </div>
        </div>
        <Button variant="link" asChild className="px-0">
          <Link href="/">
            Click here to join the video call{" "}
            <ArrowUpRight className="h-5 w-5 ml-1" />
          </Link>
        </Button>
      </div>
    </div>
  );
};

export default SessionDetailsCard;
