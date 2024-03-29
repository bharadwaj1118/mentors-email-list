import { Separator } from "@/components/ui/separator";
import { CheckCircle2, Video, CalendarClock, VideoIcon } from "lucide-react";
import { Button } from "@/components/ui/button";

import { SessionForm } from "../_components/session-form";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { getSessionById } from "@/lib/actions/session.action";
import { getSelf } from "@/lib/actions/user.action";
import { db } from "@/lib/db";
import { calculatePrice, formattedStringToDDMonthYearTime } from "@/lib/format";

interface SessionPageProps {
  params: {
    sessionId: string;
  };
}

const SessionPage = async ({ params }: SessionPageProps) => {
  const { sessionId } = params;
  const session = await getSessionById(sessionId);
  const user = await getSelf();
  const menteeId = session?.menteeId;
  if (!menteeId) return null;
  const mentee = await db.user.findUnique({
    where: {
      id: menteeId,
    },
    select: {
      username: true,
      email: true,
      imageUrl: true,
      position: true,
      organization: true,
      price: true,
      duration: true,
    },
  });

  return (
    <div className="mx-auto h-full max-w-5xl p-6">
      {/* SESSION DETAILS */}

      <h3 className="h4">Session Request</h3>
      <div className="mt-3 w-full space-y-3 rounded-md bg-white p-3">
        <p className="large">Session Details</p>
        <div className="flex items-center justify-start space-x-2">
          <div>
            <Avatar>
              <AvatarImage src={mentee?.imageUrl} alt="@mentee" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
          </div>
          <div>
            <p className="muted">{mentee?.username}</p>
            <p className="small">
              {" "}
              {mentee?.position} @{mentee?.organization}
            </p>
          </div>
        </div>
        <Separator />
        <div>
          <p className="large"> Schedule session</p>
          <p className="muted">
            {" "}
            Sessions must be scheduled atleast 24 hours Advance
          </p>
        </div>
        <div className="flex w-fit items-center justify-center space-x-2 rounded-md border-1 border-blue-600 p-3">
          <div>
            <p className="large">{mentee?.duration} min</p>
            <p className="muted">
              {" "}
              ${calculatePrice(mentee?.duration, mentee?.price)} total bill
            </p>
          </div>
          <div>
            {" "}
            <CheckCircle2 className="h-6 w-6 fill-blue-700 text-white" />
          </div>
        </div>
        <div>
          <p className="large">Communication Tool</p>
          <p className="muted">
            Choose which tool you wish to choose your session
          </p>
          <div className="mt-3 flex w-fit items-center space-x-2 rounded-md border-1 border-blue-800 p-2">
            <div>
              <Video className="h-6 w-6 bg-blue-500 p-1 text-white" />
            </div>
            <div className="large">Zoom</div>
            <div>
              <CheckCircle2 className="h-6 w-6 fill-blue-700 text-white" />
            </div>
          </div>
        </div>

        <div>
          <p className="large">Conference Link</p>
          <p className="muted">
            Your video link will be available 30 minutes before the session
          </p>

          <Button variant="outline" size="lg" className="mt-3">
            Join call <VideoIcon className="h-6 w-6 ml-1" />
          </Button>
        </div>
      </div>

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

        <SessionForm
          session={JSON.stringify(session)}
          user={JSON.stringify(user)}
          menteeEmail={JSON.stringify(mentee?.email)}
        />
      </div>

      <div></div>
    </div>
  );
};

export default SessionPage;
