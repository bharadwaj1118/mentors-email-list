import BookingCalendarDetails from "@/components/shared/booking-calendar-details";
import BookingCalendarMain from "@/components/shared/booking-calendar-main";
import { Calendar } from "@/components/ui/calendar";
import { db } from "@/lib/db";
import { generateEventsForNextYear } from "@/lib/helpers/recurring";
import { auth } from "@clerk/nextjs";
import { subBusinessDays } from "date-fns";
import { utcToZonedTime } from "date-fns-tz";
import { redirect } from "next/navigation";
import React from "react";

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
  const timeZone = user?.timeZone || "America/New_York";

  // Convert weekly events to Timezone
  const weeklyEventsInTimezone = weeklyEvents.map((event) => {
    const startInTimezone = utcToZonedTime(event.start, timeZone);
    const endInTimezone = utcToZonedTime(event.end, timeZone);

    return {
      start: startInTimezone,
      end: endInTimezone,
    };
  });

  // Convert weekly events to timeSlots

  // Convert to mentor timeZones

  // Convert to 24:00 hour timeZones

  return (
    <div className="h-screen flex justify-center items-center">
      <div className="max-w-5xl mx-auto p-3 md:p-6 bg-background rounded border shadow">
        <div className="flex flex-col md:flex-row">
          {/* Right Side: Details */}
          <div>
            <BookingCalendarDetails
              imageUrl={user.imageUrl}
              username={user.username}
              timeZone={user.timeZone || "America/New_York"}
              meetingPreference={user.meetingPreference || "zoom"}
              duration={user.duration}
            />
          </div>
          <hr className="h-[1px]" />
          {/* Main Calendar */}
          <div className="flex-1">
            <BookingCalendarMain
              individualEvents={individualEvents}
              weeklyEvents={weeklyEventsInTimezone}
              timeZone={user.timeZone || "America/New_York"}
              duration={user.duration}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CalendarPage;
