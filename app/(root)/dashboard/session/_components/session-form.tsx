"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { CreditCard } from "lucide-react";
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
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import { ca } from "date-fns/locale";
import { useState, useEffect } from "react";

import { updateSession } from "@/lib/actions/session.action";
import { useRouter } from "next/navigation";

const formSchema = z.object({
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

interface SessionFormProps {
  session: string;
  user: string;
}

export function SessionForm({ session, user }: SessionFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [enableEdit, setEnableEdit] = useState(false);
  const router = useRouter();

  const sessionJSON = JSON.parse(session);
  const userJSON = JSON.parse(user);
  const {
    objective,
    category,
    description,
    outcome,
    id: sessionId,
    status,
  } = sessionJSON;
  const { id: userId } = userJSON;

  useEffect(() => {
    //Runs only on the first render
    setEnableEdit(true);
  }, []);

  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      objective: objective || "",
      category: category || "",
      description: description || "",
      outcome: outcome || "",
    },
  });

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSubmitting(true);
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    try {
      await updateSession({
        ...values,
        id: sessionId,
        status: "REQUESTED",
        menteeId: userId,
      });
      router.push("/onboarding-02");
    } catch (error) {
      console.log(error);
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="mx-auto flex max-w-5xl flex-col gap-5"
      >
        <FormField
          control={form.control}
          name="objective"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Objective</FormLabel>
              <FormControl>
                <Input
                  placeholder="Enter your objecetive.."
                  {...field}
                  className="bg-grey-50 placeholder:text-grey-500 p-regular-16 !important px-4 py-3 focus-visible:ring-transparent focus-visible:ring-offset-0"
                  disabled={!enableEdit}
                />
              </FormControl>
              <FormDescription>
                This is your objective you are interested in...
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <Separator />

        <FormField
          control={form.control}
          name="category"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Category</FormLabel>
              <FormControl>
                <Input
                  placeholder="category"
                  {...field}
                  className="bg-grey-50 placeholder:text-grey-500 p-regular-16 !important px-4 py-3 focus-visible:ring-transparent focus-visible:ring-offset-0"
                  disabled={!enableEdit}
                />
              </FormControl>
              <FormDescription>
                This is your category you are interested in...
              </FormDescription>
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
                  className="bg-grey-50 placeholder:text-grey-500 p-regular-16 !important flex flex-1 px-5 py-3 focus-visible:ring-transparent"
                  disabled={!enableEdit}
                />
              </FormControl>
              <FormDescription>
                Please enter atleast 100 characters...
              </FormDescription>
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
                <Textarea
                  placeholder="Please enter the outcome.."
                  {...field}
                  className="bg-grey-50 placeholder:text-grey-500 p-regular-16 !important flex flex-1 px-5 py-3 focus-visible:ring-transparent"
                  disabled={!enableEdit}
                />
              </FormControl>
              <FormDescription>
                Please enter atleast 100 characters...
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Separator />

        <p>Payment Details</p>
        <Button className="w-40 rounded-full bg-blue-300 text-primary-600">
          <CreditCard className="mr-2 h-4 w-4" /> Add new card
        </Button>

        <Separator />
        {enableEdit && (
          <div className="flex items-center space-x-2">
            <input type="checkbox" className="h-4 w-4" />
            <div>
              I have properly formatted as per the best practices and will show
              up in a timely fashion for the call
            </div>
          </div>
        )}

        {enableEdit && (
          <Button
            className="w-fit rounded-full"
            type="submit"
            disabled={isSubmitting}
          >
            {" "}
            {isSubmitting
              ? "Submitting the request"
              : "Confirm session Request"}
          </Button>
        )}
      </form>
    </Form>
  );
}
