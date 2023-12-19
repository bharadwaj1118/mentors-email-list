'use client';

import { Calendar, Views, momentLocalizer } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import moment from 'moment';

import React, { Fragment, useState, useCallback, useMemo } from 'react';
import withDragAndDrop from 'react-big-calendar/lib/addons/dragAndDrop';
import { set } from 'mongoose';

const now = new Date();

// Type definitions
type Event = {
  id: number;
  title: string;
  start: Date;
  end: Date;
  allDay?: boolean;
  desc?: string;
};

function splitIntoIntervals(
  start: string,
  end: string,
  intervalMinutes: number
): Event[] {
  const startTime = new Date(start);
  const endTime = new Date(end);
  const intervals: Event[] = [];
  let id = 0;

  while (startTime < endTime) {
    const newStart = new Date(startTime);
    startTime.setMinutes(startTime.getMinutes() + intervalMinutes);
    const newEnd = new Date(startTime);

    if (newEnd > endTime) {
      newEnd.setTime(endTime.getTime());
    }

    intervals.push({
      id: id++,
      title: 'Available',
      start: newStart,
      end: newEnd,
    });

    if (newEnd.getTime() === endTime.getTime()) {
      break;
    }
  }

  return intervals;
}

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

export const MyCalendar = () => {
  const [myEvents, setEvents] = useState<Event[]>(events);

  const handleSelectSlot = useCallback(
    ({ start, end }: any) => {
      const title = 'Available';
      const addSlots: Boolean = isLessThanTwelveHours(start, end);
      if (addSlots) {
        const events = splitIntoIntervals(start, end, 30);
        setEvents((prev) => [...prev, ...events]);
      }

      console.log(start, end);
    },
    [setEvents]
  );

  const handleSelectEvent = useCallback(
    (event: Event) => {
      setEvents((prev) => prev.filter((e) => e.id !== event.id));
      console.log(myEvents);
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
