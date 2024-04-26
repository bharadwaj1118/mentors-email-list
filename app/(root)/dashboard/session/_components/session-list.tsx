import React from "react";
import SessionCard from "./session-card";

interface SessionListProps {
  sessions: string;
}

const SessionList = ({ sessions }: SessionListProps) => {
  const sessionsJSON = JSON.parse(sessions);

  return (
    <div>
      {sessionsJSON &&
        sessionsJSON.map((session: any) => {
          return (
            <SessionCard key={session.id} session={JSON.stringify(session)} />
          );
        })}
    </div>
  );
};

export default SessionList;
