import React from "react";
import { Send, Check, Video, XCircle } from "lucide-react";
import { redirect } from "next/navigation";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import { getSelf } from "@/lib/actions/user.action";
import { getSessionByMenteeId } from "@/lib/actions/session.action";
import SessionList from "./_components/session-list";
import { SessionStatus } from "@prisma/client";
import EmptyBookingsCard from "@/components/shared/empty-bookings-card";
const SessionPage = async () => {
  const user = await getSelf();
  if (!user) return redirect("/login");

  const sessions = await getSessionByMenteeId(user.id);

  console.log(sessions);

  const upcomingSessions = sessions.filter((session) => {
    return session.status === SessionStatus.ACCEPTED;
  });
  const completedSessions = sessions.filter((session) => {
    return session.status === SessionStatus.COMPLETED;
  });
  const requestedSessions = sessions.filter((session) => {
    return session.status === SessionStatus.AWAITING_HOST;
  });

  const cancelledSessions = sessions.filter((session) => {
    return session.status === SessionStatus.CANCELLED;
  });

  return (
    <div className="mx-auto mt-6 max-w-5xl rounded shadow border">
      <section className=" w-full bg-white p-3 min-h-screen">
        <Tabs defaultValue="upcoming" className="p-6">
          <TabsList>
            <TabsTrigger value="requests" className="flex items-center">
              <Send className="text-gray-700 mr-1 h-4 w-4" />
              <p className="hidden md:block">Requests</p>
            </TabsTrigger>
            <TabsTrigger value="upcoming" className="flex items-center">
              <Video className="mr-1 h-4 w-4 text-blue-700" />
              <p className="hidden md:block">Upcoming</p>
            </TabsTrigger>
            <TabsTrigger value="completed" className="flex items-center">
              <Check className="mr-1 h-4 w-4 text-green-700" />
              <p className="hidden md:block">Completed</p>
            </TabsTrigger>
            <TabsTrigger value="cancelled" className="flex items-center">
              <XCircle className="mr-1 h-4 w-4 text-red-700" />
              <p className="hidden md:block">Archived</p>
            </TabsTrigger>
          </TabsList>
          <TabsContent value="requests">
            {requestedSessions.length === 0 ? (
              <EmptyBookingsCard
                title="No Requested Bookings"
                description="You have no requested bookings. As soon as you request the meeting will show up here."
              />
            ) : (
              <SessionList sessions={JSON.stringify(requestedSessions)} />
            )}
          </TabsContent>
          <TabsContent value="upcoming">
            {upcomingSessions.length === 0 ? (
              <EmptyBookingsCard
                title="No upcoming bookings"
                description="You have no upcoming bookings. As soon as someone books a time with you it will show here."
              />
            ) : (
              <SessionList sessions={JSON.stringify(upcomingSessions)} />
            )}
          </TabsContent>
          <TabsContent value="completed">
            {completedSessions.length === 0 ? (
              <EmptyBookingsCard
                title="No completed bookings"
                description="You have no completed bookings. Your canceled bookings show up here."
              />
            ) : (
              <SessionList sessions={JSON.stringify(completedSessions)} />
            )}
          </TabsContent>
          <TabsContent value="cancelled">
            {cancelledSessions.length === 0 ? (
              <EmptyBookingsCard
                title="No canceled bookings"
                description="You have no canceled bookings. Your canceled bookings show up here."
              />
            ) : (
              <SessionList sessions={JSON.stringify(cancelledSessions)} />
            )}
          </TabsContent>
        </Tabs>
      </section>
    </div>
  );
};

export default SessionPage;
