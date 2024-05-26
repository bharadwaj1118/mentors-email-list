"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Check, ChevronsUpDown } from "lucide-react";
import { z } from "zod";

import { cn } from "@/lib/utils";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { Textarea } from "@/components/ui/textarea";
import { useRouter } from "next/navigation";
import { saveUserChallengeById } from "@/lib/actions/user.action";
import { Input } from "@/components/ui/input";

const timeZones = [
  { label: "America/New_York (Eastern Time)", value: "America/New_York" },
  { label: "Europe/London (Greenwich Mean Time)", value: "Europe/London" },
  { label: "Asia/Tokyo (Japan Standard Time)", value: "Asia/Tokyo" },
  { label: "Europe/Berlin (Central European Time)", value: "Europe/Berlin" },
  { label: "America/Los_Angeles (Pacific Time)", value: "America/Los_Angeles" },
  {
    label: "Australia/Sydney (Australian Eastern Time)",
    value: "Australia/Sydney",
  },
  { label: "Asia/Shanghai (China Standard Time)", value: "Asia/Shanghai" },
  { label: "Asia/Dubai (Gulf Standard Time)", value: "Asia/Dubai" },
  { label: "Asia/Kolkata (India Standard Time)", value: "Asia/Kolkata" },
] as const;

const FormSchema = z.object({
  timeZone: z.string({
    required_error: "Please select a timeZone.",
  }),
  meetingPreference: z.string({
    required_error: "Please select a meeting preference.",
  }),
  meetingURL: z
    .string()
    .optional()
    .refine(
      (data) => {
        // Validate as URL only if the field is not empty
        return data === "" || z.string().url().safeParse(data).success;
      },
      {
        message: "Please enter a valid URL.",
      }
    ),
});

interface RecommendedByFormProps {
  userId: string;
  timeZone: string;
  meetingPreference: string;
}

export function OnboardChallengeForm({
  userId,
  timeZone,
  meetingPreference,
}: RecommendedByFormProps) {
  const router = useRouter();
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      timeZone,
      meetingPreference,
    },
  });

  function onSubmit(data: z.infer<typeof FormSchema>) {
    saveUserChallengeById({
      userId,
      timeZone: data.timeZone,
      meetingPreference: data.meetingPreference,
      meetingURL: data.meetingURL,
    });

    router.refresh();
    router.push("/onboard/4");
  }

  const meetingPref = form.watch("meetingPreference");
  const isMeetingOnline =
    meetingPref === "zoom" || meetingPref === "google-meet";

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="timeZone"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>Time zone</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant="outline"
                      role="combobox"
                      className={cn(
                        "w-[400px] justify-between",
                        !field.value && "text-muted-foreground"
                      )}
                    >
                      {field.value
                        ? timeZones.find(
                            (timeZone) => timeZone.value === field.value
                          )?.label
                        : "select time zone"}
                      <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-[400px] p-0">
                  <Command>
                    <CommandInput placeholder="Search timeZone..." />
                    <CommandEmpty>No time zone found.</CommandEmpty>
                    <CommandGroup>
                      {timeZones.map((timeZone) => (
                        <CommandItem
                          value={timeZone.label}
                          key={timeZone.value}
                          onSelect={() => {
                            form.setValue("timeZone", timeZone.value);
                          }}
                        >
                          <Check
                            className={cn(
                              "mr-2 h-4 w-4",
                              timeZone.value === field.value
                                ? "opacity-100"
                                : "opacity-0"
                            )}
                          />
                          {timeZone.label}
                        </CommandItem>
                      ))}
                    </CommandGroup>
                  </Command>
                </PopoverContent>
              </Popover>

              <FormMessage />
            </FormItem>
          )}
        />

        <div className="w-[400px]">
          <FormField
            control={form.control}
            name="meetingPreference"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Meeting Preference</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a verified email to display" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="zoom">zoom</SelectItem>
                    <SelectItem value="google-meet">Google Meet</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        {isMeetingOnline && (
          <FormField
            name="meetingURL"
            control={form.control}
            render={({ field }) => (
              <FormItem className="w-[400px]">
                <FormLabel>
                  {meetingPref === "zoom" ? "Zoom" : "Google Meet"} URL
                </FormLabel>
                <Input
                  {...field}
                  placeholder={`Enter ${
                    meetingPref === "zoom" ? "zoom" : "google-meet"
                  } url here`}
                />
                <FormMessage />
              </FormItem>
            )}
          />
        )}

        <div className="flex items-start justify-end">
          <Button type="submit" className="rounded-full">
            Next
          </Button>
        </div>
      </form>
    </Form>
  );
}
