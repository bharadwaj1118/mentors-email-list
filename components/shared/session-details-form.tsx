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
  >;
}

const FormSchema = z.object({
  objective: z.string().min(20, {
    message: "object must be at least 20 characters.",
  }),
  category: z.string().min(20, {
    message: "category must be at least 20 characters.",
  }),
  description: z.string().min(20, {
    message: "description must be at least 20 characters.",
  }),
  outcome: z.string().min(20, {
    message: "outcome must be at least 20 characters.",
  }),
});

export function SessionDetailsForm({ session }: SessionDetailsFormProps) {
  const start = new Date(session.start);
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
    alert("submitting");
    try {
      const newSession = await createSession({
        ...session,
        ...values,
      });

      console.log(newSession);

      if (newSession) {
        toast.success("Session created successfully");
      }

      router.refresh();
    } catch (error) {
      console.log(error);
      toast.error("Unexpected Error...");
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <p> Your slot: {start?.toISOString()}</p>
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
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
}
