import React from "react";
import { redirect } from "next/navigation";
import { auth } from "@clerk/nextjs";

import { db } from "@/lib/db";

import BookingCalendarDetails from "@/components/shared/booking-calendar-details";
import BookingCalendarMain from "@/components/shared/booking-calendar-main";
import Heading from "@/components/shared/heading";
import { generateEventsForNextYear } from "@/lib/helpers/recurring";

const CalendarPage = async () => {
  // Get clerk Auth return if nothing
  const { userId } = auth();
  if (!userId) {
    redirect("/login");
  }

  // Get user details from database
  const user = await db.user.findUnique({
    where: {
      clerkId: userId,
    },
    select: {
      id: true,
      imageUrl: true,
      username: true,
      timeZone: true,
      meetingPreference: true,
      duration: true,
      price: true,
      weeklyAvailability: true,
      events: {
        select: {
          start: true,
          end: true,
        },
      },
    },
  });

  if (!user) return null;

  // Get rrule for next one year recurring events
  // Get Available events from the database

  // Combine recurring events and available events
  const individualEvents = await db.event.findMany({
    where: {
      userId: user.id,
      start: {
        gte: new Date(), // This compares against the current date and time
      },
    },
    select: {
      start: true,
      end: true,
    },
  });

  const weeklyAvailability = user?.weeklyAvailability || {};
  const { schedule } = JSON.parse(JSON.stringify(weeklyAvailability)) || [];
  const weeklyEvents = generateEventsForNextYear(schedule);
  //TODO: SET DEFAULT TIMEZONE IN PRISMA
  const timeZone = user?.timeZone || "America/New_York";

  return (
    <div className="pt-[80px] min-h-screen p-3">
      <div className="w-full mt-4 max-w-5xl mx-auto p-3 border shadow rounded bg-background md:pl-6">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <Heading
            title="[Preview] Your Calendar"
            description="This is how mentees will see your availability when they try to request a session with you"
            imageUrl="/assets/schedule_tab.svg"
          />
        </div>
      </div>
      <div className="w-full mt-4 max-w-5xl mx-auto p-3 bg-background rounded border shadow">
        <div className="w-full flex flex-col md:flex-row">
          {/* Right Side: Details */}
          <div className="mt-4 w-full flex justify-start items-center md:items-start md:justify-center p-3">
            <BookingCalendarDetails
              imageUrl={user.imageUrl}
              username={user.username}
              timeZone={timeZone}
              meetingPreference={user.meetingPreference || "zoom"}
              duration={user.duration}
            />
          </div>
          <hr className="h-[1px]" />
          {/* Main Calendar */}
          <div className="w-full flex-1">
            <BookingCalendarMain
              individualEvents={individualEvents}
              weeklyEvents={weeklyEvents}
              timeZone={timeZone}
              duration={user.duration}
              mentorId={user.id}
              price={user.price}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CalendarPage;
