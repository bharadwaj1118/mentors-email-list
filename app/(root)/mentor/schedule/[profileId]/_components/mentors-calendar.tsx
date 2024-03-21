"use client";

import { Calendar, Views, dateFnsLocalizer } from "react-big-calendar";

import format from "date-fns/format";
import parse from "date-fns/parse";
import startOfWeek from "date-fns/startOfWeek";
import getDay from "date-fns/getDay";
import enUS from "date-fns/locale/en-US";

import "react-big-calendar/lib/css/react-big-calendar.css";
import moment from "moment";
import { v4 as uuidv4 } from "uuid";
import { toast } from "sonner";

import React, { Fragment, useState, useCallback, useMemo } from "react";
import withDragAndDrop from "react-big-calendar/lib/addons/dragAndDrop";
import { addEvent, deleteEvent } from "@/lib/actions/event.action";
import { isEventInThePast, isEventOverlapping } from "@/lib/utils";
import { m } from "framer-motion";
import { formattedStringToDDMonthYearTime } from "@/lib/format";
import { Alert } from "@/components/ui/alert";
import { AlertPopup } from "@/components/shared/alert-popup";
import { set } from "mongoose";

const now = new Date();

// Type definitions
type Event = {
  id: string;
  title: string;
  start: Date;
  end: Date;
};

const locales = {
  "en-US": enUS,
};

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
});

function isLessThanTwelveHours(start: string, end: string): boolean {
  const startTime = new Date(start);
  const endTime = new Date(end);
  const twelveHoursInMilliseconds = 12 * 60 * 60 * 1000; // 12 hours in milliseconds

  const difference = endTime.getTime() - startTime.getTime();

  return difference <= twelveHoursInMilliseconds;
}

function isExternalEvent(event: Event, externalEvents: Event[]): boolean {
  return externalEvents.some((externalEvent) => event.id === externalEvent.id);
}

const events: Event[] = [];

const DnDCalendar = withDragAndDrop(Calendar);

interface MyCalendarProps {
  user: string;
  externalEvents: string;
}

export const MentorsCalendar = ({ user, externalEvents }: MyCalendarProps) => {
  const { events } = user !== null ? JSON.parse(user) : [];
  const result = events.map((event: any) => ({
    id: event.id,
    title: event.title,
    start: new Date(event.start),
    end: new Date(event.end),
  }));

  console.log(externalEvents);
  const backgroundEventsArray =
    externalEvents !== undefined ? JSON.parse(externalEvents) : [];
  const backgroundEvents = backgroundEventsArray.map((event: any) => ({
    id: event.id,
    title: event.summary,
    start: new Date(event.start.dateTime),
    end: new Date(event.end.dateTime),
  }));

  const [myEvents, setEvents] = useState<Event[]>(result);
  const [currentEvent, setCurrentEvent] = useState<Event>();
  const [showDeleteAlert, setShowDeleteAlert] = useState(false);

  const handleSelectSlot = async (event: any) => {
    const { start, end } = event;
    const title = "Available";
    const addSlots: Boolean = isLessThanTwelveHours(start, end);
    if (addSlots) {
      const newEvent = { id: uuidv4(), title, start, end };
      console.log(isEventInThePast(newEvent));
      console.log(isEventOverlapping(newEvent, myEvents));
      if (
        !isEventInThePast(newEvent) &&
        isEventOverlapping(newEvent, myEvents)
      ) {
        try {
          await addEvent(newEvent);
          setEvents((prevEvents) => [...prevEvents, newEvent]);
          toast.success("Event has been created", {
            description: formattedStringToDDMonthYearTime(new Date(start)),
          });
        } catch (error) {
          toast.error("Event not created");
        }
      }
    }
  };

  const handleSelectEvent = async (event: any) => {
    const { id } = event;
    if (isExternalEvent(event, backgroundEvents)) {
      return;
    }
    setShowDeleteAlert(true);
    setCurrentEvent(event);
  };

  const handleResizeEvent = async (event: any) => {
    alert("resize event" + JSON.stringify(event));
  };

  const handleDeleteEvent = async (curr: any) => {
    try {
      await deleteEvent({ ...curr });
      setEvents((prevEvents) =>
        prevEvents.filter((event) => event.id !== curr.id)
      );
      toast.success("Event has been deleted");
    } catch (error) {
      toast.error("Event not deleted");
    }
  };

  // const { defaultDate, scrollToTime } = useMemo(
  //   () => ({
  //     defaultDate: new Date(2023, 12, 19),
  //     scrollToTime: new Date(1970, 1, 1, 6),
  //   }),
  //   []
  // );

  return (
    <>
      <AlertPopup
        title="Are you  sure?"
        description="This event will be removed from your calendar."
        open={showDeleteAlert}
        onConfirm={() => {
          setShowDeleteAlert(false);
          if (currentEvent) handleDeleteEvent(currentEvent);
        }}
        onCancel={() => {
          setShowDeleteAlert(false);
        }}
      />
      <div className="h-[400px] md:h-[600px] max-w-5xl">
        <DnDCalendar
          defaultView={Views.MONTH}
          events={myEvents}
          localizer={localizer}
          backgroundEvents={backgroundEvents}
          onSelectEvent={handleSelectEvent}
          onSelectSlot={handleSelectSlot}
          step={30}
          timeslots={1}
          onEventResize={handleResizeEvent}
          resizable
          selectable
          popup
        />
      </div>
    </>
  );
};
