"use client";

import { Calendar, Views, momentLocalizer } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import moment from "moment";
import { v4 as uuidv4 } from "uuid";

import React, { Fragment, useState, useCallback, useMemo } from "react";
import withDragAndDrop from "react-big-calendar/lib/addons/dragAndDrop";
import { addEvent, deleteEvent } from "@/lib/actions/event.action";
import { isEventInThePast, isEventOverlapping } from "@/lib/utils";

const now = new Date();

// Type definitions
type Event = {
  id: string;
  title: string;
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

interface MyCalendarProps {
  user: string;
}

export const MyCalendar = ({ user }: MyCalendarProps) => {
  const { events } = JSON.parse(user);
  const result = events.map((event: any) => ({
    id: event.id,
    title: event.title,
    start: new Date(event.start),
    end: new Date(event.end),
  }));

  const [myEvents, setEvents] = useState<Event[]>(result);

  const handleSelectSlot = useCallback(
    async ({ start, end }: any) => {
      const title = "Available";
      console.log("added event");
      const addSlots: Boolean = isLessThanTwelveHours(start, end);
      if (addSlots) {
        const newEvent = { id: uuidv4(), title, start, end };
        console.log(isEventInThePast(newEvent));
        console.log(isEventOverlapping(newEvent, myEvents));
        if (
          !isEventInThePast(newEvent) &&
          isEventOverlapping(newEvent, myEvents)
        ) {
          await addEvent(newEvent);
          setEvents((prevEvents) => [...prevEvents, newEvent]);
          console.log("comes inside");
        }
      }
    },
    [setEvents]
  );

  const handleSelectEvent = useCallback(
    async (event: Event) => {
      const { id } = event;
      await deleteEvent({ ...event });
      setEvents((prevEvents) => prevEvents.filter((event) => event.id !== id));
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
        onSelectSlot={handleSelectSlot}
        selectable
        scrollToTime={scrollToTime}
        step={30}
        timeslots={1}
      />
    </div>
  );
};
