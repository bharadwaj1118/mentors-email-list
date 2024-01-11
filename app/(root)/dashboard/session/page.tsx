import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Send, Check, Video } from "lucide-react";
import { getSelf } from "@/lib/actions/user.action";
import { redirect } from "next/navigation";

import { getSessionByMenteeId } from "@/lib/actions/session.action";
import SessionList from "./_components/session-list";

const SessionPage = async () => {
  const user = await getSelf();
  if (!user) return redirect("/login");

  const sessions = await getSessionByMenteeId(user.id);

  console.log(sessions);

  const upcomingSessions = sessions.filter((session) => {
    return session.status === "ACCEPTED";
  });
  const completedSessions = sessions.filter((session) => {
    return session.status === "COMPLETED";
  });
  const requestedSessions = sessions.filter((session) => {
    return session.status === "REQUESTED";
  });

  return (
    <div className="mx-auto mt-6 max-w-5xl">
      <section className=" w-full bg-white">
        <Tabs defaultValue="upcoming" className="p-6">
          <TabsList>
            <TabsTrigger value="requests" className="flex items-center">
              <Send className="mr-1 h-4 w-4 text-blue-700" />
              <p>Requests</p>
            </TabsTrigger>
            <TabsTrigger value="upcoming" className="flex items-center">
              <Video className="mr-1 h-4 w-4 text-blue-700" />
              <p>Upcoming</p>
            </TabsTrigger>
            <TabsTrigger value="completed" className="flex items-center">
              <Check className="mr-1 h-4 w-4 text-blue-700" />
              <p>Completed</p>
            </TabsTrigger>
          </TabsList>
          <TabsContent value="requests">
            <SessionList sessions={JSON.stringify(requestedSessions)} />
          </TabsContent>
          <TabsContent value="upcoming">
            <SessionList sessions={JSON.stringify(upcomingSessions)} />
          </TabsContent>
          <TabsContent value="completed">
            <SessionList sessions={JSON.stringify(completedSessions)} />
          </TabsContent>
        </Tabs>
      </section>
    </div>
  );
};

export default SessionPage;
