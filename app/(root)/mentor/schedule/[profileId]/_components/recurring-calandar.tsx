"use client";
import React from "react";
import {
  useForm,
  useFieldArray,
  useWatch,
  Control,
  Controller,
} from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

import { zonedTimeToUtc, utcToZonedTime } from "date-fns-tz";
import { format, startOfWeek, add } from "date-fns";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ChevronDown, ChevronUp, Plus, PlusIcon } from "lucide-react";
import { TrashIcon } from "@radix-ui/react-icons";

import { updateUser } from "@/lib/actions/user.action";
import { de } from "date-fns/locale";

type FormValues = {
  schedule: {
    day: string;
    startTime: string;
    endTime: string;
  }[];
};

type ScheduleItem = {
  day: string;
  startTime: string;
  endTime: string;
};

type Schedule = ScheduleItem[];

// Helper to find the next occurrence of a given weekday
const getNextDayDate = (dayName: string, referenceDate = new Date()): Date => {
  const weekStart = startOfWeek(referenceDate, { weekStartsOn: 1 }); // Assuming week starts on Monday
  const daysOfWeek = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];
  const addDays = daysOfWeek.indexOf(dayName);
  return add(weekStart, { days: addDays });
};

// Convert schedule times to UTC
const convertScheduleToUTC = (
  schedule: Schedule,
  timeZone: string
): Schedule => {
  return schedule.map((item) => {
    const dateForDay = getNextDayDate(item.day);
    const startDateTime = new Date(
      `${dateForDay.toISOString().split("T")[0]}T${item.startTime}:00`
    );
    const endDateTime = new Date(
      `${dateForDay.toISOString().split("T")[0]}T${item.endTime}:00`
    );

    const startTimeUTC = zonedTimeToUtc(startDateTime, timeZone);
    const endTimeUTC = zonedTimeToUtc(endDateTime, timeZone);

    return {
      ...item,
      startTime: startTimeUTC.toISOString().split("T")[1].substring(0, 5),
      endTime: endTimeUTC.toISOString().split("T")[1].substring(0, 5),
    };
  });
};

// Convert UTC schedule times to a target timezone
const convertScheduleFromUTC = (
  schedule: Schedule,
  timeZone: string
): Schedule => {
  return schedule.map((item) => {
    const dateForDay = getNextDayDate(item.day);
    const startDateStr = `${format(dateForDay, "yyyy-MM-dd")}T${
      item.startTime
    }:00Z`; // UTC
    const endDateStr = `${format(dateForDay, "yyyy-MM-dd")}T${
      item.endTime
    }:00Z`; // UTC

    const startDateTime = new Date(startDateStr);
    const endDateTime = new Date(endDateStr);

    const startTimeInTimeZone = utcToZonedTime(startDateTime, timeZone);
    const endTimeInTimeZone = utcToZonedTime(endDateTime, timeZone);

    return {
      ...item,
      startTime: format(startTimeInTimeZone, "HH:mm"),
      endTime: format(endTimeInTimeZone, "HH:mm"),
    };
  });
};

const Total = ({ control }: { control: Control<FormValues> }) => {
  const formValues = useWatch({
    name: "schedule",
    control,
  });

  // Assuming startTime and endTime are strings in "HH:mm" format, we calculate the total duration
  const total = formValues.reduce((acc, current) => {
    const startTime = current.startTime.split(":");
    const endTime = current.endTime.split(":");
    const startMinutes = parseInt(startTime[0]) * 60 + parseInt(startTime[1]);
    const endMinutes = parseInt(endTime[0]) * 60 + parseInt(endTime[1]);
    const duration = endMinutes - startMinutes;
    return acc + duration;
  }, 0);

  // Format total minutes back into hours and minutes
  const totalHours = Math.floor(total / 60);
  const totalMinutes = total % 60;

  return (
    <p>
      Your weeekly Duration: {totalHours} hours and {totalMinutes} minutes
    </p>
  );
};

interface RecurPageProps {
  user: string;
}

const RecurPage = ({ user }: RecurPageProps) => {
  const router = useRouter();
  const parsedUser = JSON.parse(user);
  const { duration, timeZone, weeklyAvailability } = parsedUser;
  console.log(weeklyAvailability);
  console.log("My availability for the week is: ", weeklyAvailability);
  const defaultWeeklyAvailability = weeklyAvailability || {
    schedule: [
      // { day: "Monday", startTime: "18:17", endTime: "20:19" },
      // { day: "Tuesday", startTime: "18:18", endTime: "20:40" },
    ],
  };
  const defaultWeeklyInTimezone = convertScheduleFromUTC(
    defaultWeeklyAvailability.schedule,
    timeZone
  );
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    defaultValues: { schedule: defaultWeeklyInTimezone },
    mode: "onBlur",
  });
  const { fields, append, remove, swap } = useFieldArray({
    name: "schedule",
    control,
  });
  const onSubmit = async (data: FormValues) => {
    // TODO: Get the original time zone from the user

    try {
      const scheduleUTC = convertScheduleToUTC(data.schedule, timeZone);
      await updateUser({
        id: parsedUser.id,
        weeklyAvailability: { schedule: scheduleUTC },
      });
      toast.success("Weekly schedule updated");

      router.refresh();
    } catch {
      toast.error("Something went wrong");
    }
  };

  return (
    <div className="mx-auto max-w-5xl p-3 mt-6 ">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {fields.map((field, index) => (
          <section className="flex gap-4" key={field.id}>
            {/* <Input
              placeholder="name"
              {...register(`schedule.${index}.name` as const, {
                required: "This field is required",
              })}
              className="w-[200px]"
              defaultValue={field.name}
            /> */}

            <Controller
              control={control}
              name={`schedule.${index}.day`}
              render={({ field }) => (
                <Select
                  value={field.value}
                  onValueChange={(value) => {
                    field.onChange(value);
                  }}
                >
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Select day" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Monday">Monday</SelectItem>
                    <SelectItem value="Tuesday">Tuesday</SelectItem>
                    <SelectItem value="Wednesday">Wednesday</SelectItem>
                    <SelectItem value="Thursday">Thursday</SelectItem>
                    <SelectItem value="Friday">Friday</SelectItem>
                    <SelectItem value="Saturday">Saturday</SelectItem>
                    <SelectItem value="Sunday">Sunday</SelectItem>
                  </SelectContent>
                </Select>
              )}
            />

            <Input
              placeholder="Start Time"
              type="time"
              {...register(`schedule.${index}.startTime` as const, {
                required: "Start time is required",
              })}
              className="w-fit"
              defaultValue={field.startTime}
            />
            <Input
              placeholder="End Time"
              type="time"
              {...register(`schedule.${index}.endTime` as const, {
                required: "End time is required",
              })}
              className="w-fit"
              defaultValue={field.endTime}
            />
            <Button
              type="button"
              onClick={() => {
                if (index > 0) swap(index, index - 1);
              }}
              variant="outline"
              size="icon"
            >
              <ChevronUp />
            </Button>
            <Button
              type="button"
              onClick={() => {
                if (index < fields.length - 1) swap(index, index + 1);
              }}
              variant="outline"
              size="icon"
            >
              <ChevronDown />
            </Button>
            <Button
              type="button"
              onClick={() => remove(index)}
              variant="outline"
              size="icon"
            >
              <TrashIcon className="w-4 h-4 text-danger" />
            </Button>
          </section>
        ))}

        <Total control={control} />

        <div className="flex gap-4">
          <Button
            variant="outline"
            type="button"
            onClick={() =>
              append({
                day: "Monday",
                startTime: "09:00",
                endTime: "18:00",
              })
            }
          >
            ADD <PlusIcon className="w-4 h-4 ml-1" />
          </Button>
          <Button type="submit">Submit</Button>
        </div>
      </form>
    </div>
  );
};

export default RecurPage;
