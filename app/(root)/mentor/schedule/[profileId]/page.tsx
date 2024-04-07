import React from "react";

import { MentorsCalendar } from "./_components/mentors-calendar";
import { db } from "@/lib/db";
import { listEvents } from "@/lib/actions/google-calandar.action";
import Heading from "@/components/shared/heading";
import RecurPage from "./_components/recurring-calandar";
import { generateEventsForNextYear } from "@/lib/helpers/recurring";

interface MentorSchedulePageProps {
  params: {
    profileId: string;
  };
}
const MentorSchedulePage = async ({
  params: { profileId },
}: MentorSchedulePageProps) => {
  const user = await db.user.findUnique({
    where: {
      id: profileId,
    },
    select: {
      id: true,
      email: true,
      duration: true,
      timeZone: true,
      weeklyAvailability: true,
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

  const email = user?.email;
  const externalEvents = await listEvents(user?.email);
  const weeklyAvailability = user?.weeklyAvailability || {};
  const { schedule } = JSON.parse(JSON.stringify(weeklyAvailability)) || [];
  const events = generateEventsForNextYear(schedule);

  return (
    <div className="max-w-5xl mx-auto pt-[80px]">
      <div className="my-4 lg:my-8 p-3 border shadow rounded bg-background md:pl-6">
        <Heading
          title="Mentor Schedule"
          description="Manage your calendar"
          imageUrl="/assets/schedule_tab.svg"
        />
      </div>

      <div className="my-4 p-3 border shadow rounded bg-background">
        <RecurPage user={JSON.stringify(user)} />
      </div>

      <div className="my-4 p-3 border shadow rounded bg-background">
        <MentorsCalendar
          user={JSON.stringify(user)}
          externalEvents={JSON.stringify(externalEvents)}
          regularEvents={JSON.stringify(events)}
        />
      </div>
    </div>
  );
};

export default MentorSchedulePage;
