"use client";

import { Calendar, Views, momentLocalizer } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import moment from "moment";
import { v4 as uuidv4 } from "uuid";
import { useRouter } from "next/navigation";

import React, { Fragment, useState, useCallback, useMemo } from "react";
import withDragAndDrop from "react-big-calendar/lib/addons/dragAndDrop";

const now = new Date();

// Type definitions
type Event = {
  id: string;
  title?: string;
  start: Date;
  end: Date;
};

function isLessThanTwelveHours(start: string, end: string): boolean {
  const startTime = new Date(start);
  const endTime = new Date(end);
  const twelveHoursInMilliseconds = 12 * 60 * 60 * 1000; // 12 hours in milliseconds

  const difference = endTime.getTime() - startTime.getTime();

  return difference <= twelveHoursInMilliseconds;
}

const events: Event[] = [];

const DragAndDropCalendar = withDragAndDrop(Calendar);

const localizer = momentLocalizer(moment);

interface BookingCalendarProps {
  sessions: string;
}

export const BookingCalendar = ({ sessions }: BookingCalendarProps) => {
  const sessionsArray = JSON.parse(sessions);

  // Filter available session
  const availableSessions = sessionsArray.filter((session: any) => {
    return session.status === "AVAILABLE";
  });
  const result = availableSessions.map((event: any) => ({
    id: event.id,
    start: new Date(event.start),
    end: new Date(event.end),
  }));

  const [myEvents, setEvents] = useState<Event[]>(result);
  const router = useRouter();

  const handleSelectEvent = useCallback(
    async (event: Event) => {
      const { id } = event;
      router.push(`/dashboard/session/${id}`);
    },
    [myEvents]
  );

  const { defaultDate, scrollToTime } = useMemo(
    () => ({
      defaultDate: new Date(2023, 12, 19),
      scrollToTime: new Date(1970, 1, 1, 6),
    }),
    []
  );

  return (
    <div className="h-[500px] max-w-3xl">
      <Calendar
        defaultDate={defaultDate}
        defaultView={Views.MONTH}
        events={myEvents}
        localizer={localizer}
        onSelectEvent={handleSelectEvent}
        selectable
        scrollToTime={scrollToTime}
        step={30}
        timeslots={1}
      />
    </div>
  );
};
