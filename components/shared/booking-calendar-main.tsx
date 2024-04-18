"use client";
import React from "react";
import { utcToZonedTime } from "date-fns-tz";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { SessionDetailsForm } from "./session-details-form";
import { formatAMPM } from "@/lib/format";

type Event = {
  start: Date;
  end: Date;
};

type BookingCalendarMainProps = {
  individualEvents: Event[];
  timeZone: string;
  weeklyEvents: Event[];
  duration: number;
  mentorId: string;
};

type CalanderSidebarProps = {
  slots: Event[];
  selectedDay: Date;
  onSlotSelect: (slot: Event) => void;
  onOpenForm: () => void;
};

function convertEventsToTimezone(events: Event[], timezone: string): Event[] {
  return events.map((event) => {
    // Assuming the original event times are in UTC, we convert them to the specified timezone.
    // If they are not in UTC, adjust this part of the code accordingly.
    const startInTimezone = utcToZonedTime(event.start, timezone);
    const endInTimezone = utcToZonedTime(event.end, timezone);

    return {
      start: startInTimezone,
      end: endInTimezone,
    };
  });
}

function createTimeSlots(events: Event[], durationMinutes: number): Event[] {
  const timeSlots: Event[] = [];

  events.forEach((event) => {
    let startTime = event.start;
    let endTime = new Date(startTime.getTime() + durationMinutes * 60000); // 60000ms = 1 minute

    while (endTime <= event.end) {
      timeSlots.push({ start: new Date(startTime), end: new Date(endTime) });

      // Move to the next slot
      startTime = new Date(startTime.getTime() + durationMinutes * 60000);
      endTime = new Date(endTime.getTime() + durationMinutes * 60000);
    }
  });

  return timeSlots;
}

function filterTimeSlotsByDate(
  timeSlots: Event[],
  selectedDate: Date
): Event[] {
  return timeSlots.filter((timeSlot) => {
    const startDate = timeSlot.start.toString().slice(0, 10);
    const selectedDateStr = selectedDate.toString().slice(0, 10);
    return startDate === selectedDateStr;
  });
}

const CalanderSidebar = ({
  slots,
  selectedDay,
  onSlotSelect,
  onOpenForm,
}: CalanderSidebarProps) => {
  const [slotSelected, setSlotSelected] = React.useState<Event | null>(null);
  const [openForm, setOpenForm] = React.useState(false);

  const handleSlotSelect = (slot: Event) => {
    onSlotSelect(slot);
    setSlotSelected(slot);
  };

  const handleResetSlot = () => {
    setSlotSelected(null);
  };

  const handleOpenForm = () => {
    onOpenForm();
  };

  if (slots.length === 0) {
    return (
      <div className="flex items-center justify-center h-[400px] w-[200px] border p-3">
        <h1>No slots available this day</h1>
      </div>
    );
  }
  return (
    <ScrollArea className="h-[400px] w-fit border p-3">
      <div className="flex items-center justify-center flex-col">
        <h1 className="my-2">{selectedDay.toDateString()}</h1>
        <ul className="flex flex-col gap-4">
          {slotSelected && (
            <div>
              <Button className="w-full " variant="outline">
                {formatAMPM(slotSelected.start)}
              </Button>
              <div className="flex items-center gap-4 mt-3">
                <Button variant="secondary" onClick={handleResetSlot}>
                  Back
                </Button>
                <Button onClick={handleOpenForm}>Next</Button>
              </div>
            </div>
          )}
          {!slotSelected &&
            slots.map((slot, index) => (
              <li key={index}>
                <Button
                  variant="outline"
                  size="lg"
                  className="w-[200px]"
                  onClick={() =>
                    handleSlotSelect({ start: slot.start, end: slot.end })
                  }
                >
                  {formatAMPM(slot.start)}
                </Button>
              </li>
            ))}
        </ul>
      </div>
    </ScrollArea>
  );
};

function getDisabledDays(events: Event[]): Date[] {
  const toDateString = (date: Date) => date.toISOString().split("T")[0];

  // Define the 6 months period
  const today = new Date();
  const sixMonthsLater = new Date(today);
  sixMonthsLater.setMonth(sixMonthsLater.getMonth() + 6);

  const enabledDates = new Set<string>();

  // Populate enabledDates with dates from all events, adjusted to the 6 months range
  events.forEach((event) => {
    const eventStart = new Date(
      Math.max(event.start.getTime(), today.getTime())
    ); // Ensure event starts today or in the future
    const eventEnd = new Date(
      Math.min(event.end.getTime(), sixMonthsLater.getTime())
    ); // Limit to 6 months range

    for (
      let d = new Date(eventStart);
      d <= eventEnd;
      d = new Date(d.setDate(d.getDate() + 1))
    ) {
      enabledDates.add(toDateString(d));
    }
  });

  // Iterate through the 6 month period to find disabled dates
  const disabledDates: Date[] = [];
  for (
    let d = new Date(today);
    d <= sixMonthsLater;
    d = new Date(d.setDate(d.getDate() + 1))
  ) {
    const dateString = toDateString(d);

    if (!enabledDates.has(dateString)) {
      disabledDates.push(new Date(d));
    }
  }

  return disabledDates;
}

const BookingCalendarMain = ({
  individualEvents,
  timeZone,
  weeklyEvents,
  duration,
  mentorId,
}: BookingCalendarMainProps) => {
  const [date, setDate] = React.useState<Date>(new Date());
  const [selectedSlot, setSelectedSlot] = React.useState<Event | null>(null);
  const [openForm, setOpenForm] = React.useState(false);

  const handleOpenForm = () => {
    setOpenForm(!openForm);
  };

  const handleSelectSlot = (slot: Event) => {
    setSelectedSlot(slot);
    console.log(slot);
  };

  // Convert events to the specified timezone
  const convertedIndividualEvents = convertEventsToTimezone(
    individualEvents,
    timeZone
  );

  const convertedWeeklyEvents = convertEventsToTimezone(weeklyEvents, timeZone);

  const allAvailableEvents = [
    ...convertedIndividualEvents,
    ...convertedWeeklyEvents,
  ];

  const disabledDays = getDisabledDays(convertedIndividualEvents);
  const availableTimeSlots = createTimeSlots(allAvailableEvents, duration);

  // Remove duplicate slots in available time slots
  const uniqueSlots = new Set<string>();
  const uniqueAvailableTimeSlots = availableTimeSlots.filter((slot) => {
    const slotStr = `${slot.start.getTime()}-${slot.end.getTime()}`;
    if (uniqueSlots.has(slotStr)) {
      return false;
    }
    uniqueSlots.add(slotStr);
    return true;
  });

  const availableDays = [new Date(2024, 5, 5), new Date(2024, 5, 6)];
  const availableDaysStyle = { border: "1px solid currentColor" };

  const eventSlots = filterTimeSlotsByDate(uniqueAvailableTimeSlots, date);
  const availableSlots = [...eventSlots];

  const handleSelectDate = (selectedDate: Date) => {
    setDate(selectedDate);
  };

  const days = [
    new Date(2024, 4, 10),
    new Date(2024, 4, 12),
    new Date(2024, 4, 20),
    { from: new Date(2024, 4, 22), to: new Date(2024, 4, 29) },
  ];

  return (
    <div className="w-full flex gap-4">
      {!openForm && (
        <>
          <Calendar
            mode="single"
            selected={date}
            onDayClick={handleSelectDate}
            disabled={days}
            modifiers={{ booked: availableDays }}
            modifiersStyles={{ booked: availableDaysStyle }}
          />
          <CalanderSidebar
            slots={availableSlots}
            selectedDay={date}
            onSlotSelect={handleSelectSlot}
            onOpenForm={handleOpenForm}
          />
        </>
      )}
      {openForm && (
        <div className="flex flex-col">
          <div>
            <Button onClick={handleOpenForm} variant="outline" className="mr-0">
              Back
            </Button>
          </div>

          <SessionDetailsForm
            session={{
              objective: "",
              category: "",
              description: "",
              outcome: "",
              menteeId: "",
              mentorId,
              start: selectedSlot?.start || new Date(),
              end: selectedSlot?.end || new Date(),
            }}
          />
        </div>
      )}
    </div>
  );
};

export default BookingCalendarMain;
