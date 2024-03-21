import React from "react";

import { redirect } from "next/navigation";
import { auth } from "@clerk/nextjs";

import { MentorsCalendar } from "./_components/mentors-calendar";
import { db } from "@/lib/db";
import { listEvents } from "@/lib/actions/google-calandar.action";
import Heading from "@/components/shared/heading";

interface MentorSchedulePageProps {
  params: {
    profileId: string;
  };
}
const MentorSchedulePage = async ({
  params: { profileId },
}: MentorSchedulePageProps) => {
  const { userId } = auth();

  if (!userId) {
    redirect("/login");
  }

  const user = await db.user.findUnique({
    where: {
      id: profileId,
      clerkId: userId,
    },
    select: {
      id: true,
      email: true,
      events: {
        select: {
          id: true,
          title: true,
          start: true,
          end: true,
        },
      },
    },
  });

  // TODO: Add access error
  if (!user) {
    return <div>You cannot access this page!</div>;
  }

  const externalEvents = await listEvents(user?.email);

  return (
    <div className="max-w-5xl mx-auto">
      <div className="my-4 lg:my-8 p-3 border shadow rounded bg-background">
        <Heading
          title="Mentor Schedule"
          description="Manage your calendar"
          imageUrl="/assets/undraw_city_girl.svg"
        />
      </div>
      <div className="my-4 p-3 border shadow rounded bg-background">
        <MentorsCalendar
          user={JSON.stringify(user)}
          externalEvents={JSON.stringify(externalEvents)}
        />
      </div>
    </div>
  );
};

export default MentorSchedulePage;
