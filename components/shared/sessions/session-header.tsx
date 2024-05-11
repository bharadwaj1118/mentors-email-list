import { Clock, HeartHandshake, LucideIcon, Mail } from "lucide-react";

import { Role, SessionStatus } from "@prisma/client";
import { cn } from "@/lib/utils";
import { SessionHeaderActions } from "./session-header-actions";

interface SessionHeaderResponse {
  header: string;
  content: string;
  Icon: LucideIcon;
  theme: string;
}

const getContentForSessionHeader = (
  currentRole: Role,
  status: SessionStatus
): SessionHeaderResponse | undefined => {
  if (currentRole === Role.MENTOR) {
    if (status === SessionStatus.AWAITING_HOST) {
      return {
        header: "New session request received",
        content:
          "Please read the details of the request and select an option below.",
        Icon: Mail,
        theme: "yellow",
      };
    } else if (status === SessionStatus.ACCEPTED) {
      return {
        header: "You accepted this session",
        content:
          "Ensure you’re ready to join the video call at the scheduled time. If needed, you can reschedule or cancel the call 24hrs before. Read more about it here",
        Icon: HeartHandshake,
        theme: "blue",
      };
    } else if (status === SessionStatus.REJECTED) {
      return {
        header: "You declined this session",
        content:
          "You already explained to the mentee why you decided not to accept this call. If you’d like to encourage them to book again, shoot them a message.",
        Icon: Clock,
        theme: "slate",
      };
    } else if (status === SessionStatus.CANCELLED) {
      return {
        header: "You cancelled this session",
        content:
          "You already explained to the mentee why you decided to cancel this call. If you’d like to encourage them to book again, shoot them a message.",
        Icon: Clock,
        theme: "slate",
      };
    }
  } else if (currentRole === Role.MENTEE) {
    if (status === SessionStatus.AWAITING_HOST) {
      return {
        header: "Your session request was sent successfully",
        content:
          "Now you just need to wait for the mentor’s response. Questions about responsiveness? Read more here. ",
        Icon: Mail,
        theme: "yellow",
      };
    } else if (status === SessionStatus.ACCEPTED) {
      return {
        header: "Your session request was accepted",
        content:
          "The mentor accepted! Ensure you’re ready to join the video call at the scheduled time.  If needed, you can reschedule or cancel the call 24hrs before. Read more about it here",
        Icon: HeartHandshake,
        theme: "blue",
      };
    } else if (status === SessionStatus.REJECTED) {
      return {
        header: "The mentor declined this session",
        content:
          "The mentor explained why they decided not to accept this call. If you’d like to ask for more details or to discuss the possibility to book again, shoot them a message.",
        Icon: Clock,
        theme: "slate",
      };
    } else if (status === SessionStatus.CANCELLED) {
      return {
        header: "The mentor cancelled this session",
        content:
          "The mentor explained why they decided to cancel this call. If you’d like to ask for more details or to discuss the possibility to book again, shoot them a message.",
        Icon: Clock,
        theme: "slate",
      };
    }
  }
};

type Props = {
  sessionId: string;
  role: Role;
  status: SessionStatus;
};

const SessionHeader = ({ sessionId, role, status }: Props) => {
  const details = getContentForSessionHeader(role, status);

  if (!details) return null;

  const buttonBaseClasses =
    "min-w-[150px] rounded-full hover:bg-background outline border-1 font-semibold";
  const buttonThemeClasses = `${cn(
    `text-${details.theme}-600`,
    `border-${details.theme}-500`,
    `hover:text-${details.theme}-500/80`
  )}`;

  return (
    <section
      className={cn(
        "p-3 md:p-6 bg-background rounded shadow ",
        `bg-gradient-to-b from-${details.theme}-300 via-slate-100 to-white`,
        `text-${details.theme}-600`
      )}
    >
      <div className="flex flex-col items-center justify-center space-y-3">
        <details.Icon className="h-24 w-24" />
        <h3 className="font-semibold text-2xl md:text-3xl">{details.header}</h3>
        <p className="px-3 md:px-24 text-center">{details.content}</p>

        {/* SESSION ACTIONS */}
        <SessionHeaderActions
          sessionId={sessionId}
          role={role}
          status={status}
          buttonBaseClasses={buttonBaseClasses}
          buttonThemeClasses={buttonThemeClasses}
        />
      </div>
    </section>
  );
};

export default SessionHeader;
