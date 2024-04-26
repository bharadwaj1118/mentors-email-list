"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useRouter } from "next/navigation";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";

import { Session } from "@prisma/client";
import { createSession } from "@/lib/actions/session.action";
import { calculatePrice, formatAMPM } from "@/lib/format";
import { Badge } from "@/components/ui/badge";
import { zonedTimeToUtc } from "date-fns-tz";
import { time } from "console";

interface SessionDetailsFormProps {
  session: Pick<
    Session,
    | "objective"
    | "category"
    | "description"
    | "outcome"
    | "start"
    | "end"
    | "menteeId"
    | "mentorId"
    | "price"
    | "duration"
  >;
  timeZone: string;
}

const FormSchema = z.object({
  objective: z.string().min(10, {
    message: "object must be at least 10 characters.",
  }),
  category: z.string().min(4, {
    message: "category must be at least 4 characters.",
  }),
  description: z.string().min(20, {
    message: "description must be at least 20 characters.",
  }),
  outcome: z.string().min(20, {
    message: "outcome must be at least 20 characters.",
  }),
});

export function SessionDetailsForm({
  session,
  timeZone,
}: SessionDetailsFormProps) {
  const start = new Date(session.start);
  const end = new Date(session.end);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  // 1. Define your form.
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      objective: "",
      category: "",
      description: "",
      outcome: "",
    },
  });

  async function onSubmit(values: z.infer<typeof FormSchema>) {
    setIsSubmitting(true);
    try {
      const newSession = await createSession({
        ...session,
        ...values,
        start: zonedTimeToUtc(start, timeZone),
        end: zonedTimeToUtc(end, timeZone),
        price: calculatePrice(session.duration, session.price),
      });

      if (newSession) {
        toast.success("Session created successfully");
      }
      router.push("/mentor/dashboard");
    } catch (error) {
      console.log(error);
      toast.error("Unexpected Error...");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <div className="flex gap-2 items-center mt-4">
          <Badge variant="outline">
            {formatAMPM(start)} - {formatAMPM(end)}
          </Badge>
        </div>

        <FormField
          control={form.control}
          name="objective"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Objective</FormLabel>
              <FormControl>
                <Input placeholder="Enter your objective.." {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="category"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Category</FormLabel>
              <FormControl>
                <Input placeholder="category" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Please enter the challenge.."
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="outcome"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Desired outcome of the call..</FormLabel>
              <FormControl>
                <Textarea placeholder="Please enter the outcome.." {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" disabled={isSubmitting}>
          Submit
        </Button>
      </form>
    </Form>
  );
}
