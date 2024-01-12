"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import Link from "next/link";

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
import { Switch } from "@/components/ui/switch";

const FormSchema = z.object({
  skype_url: z.string().min(2, {
    message: "Provide a valid Skype url",
  }),
  zoom_url: z.string().min(2, {
    message: "Provide a valid zoom url",
  }),
  google_url: z.string().min(2, {
    message: "Provide a valid google url",
  }),
  mentors_url: z.boolean(),
});

export function InputForm() {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      skype_url: "",
      zoom_url: "",
      google_url: "",
      mentors_url: false,
    },
  });

  function onSubmit(data: z.infer<typeof FormSchema>) {
    console.log(data);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div>
          <p className="large">Connecting with mentees</p>
          <p className="muted">
            You can connect with mentees using Skype, Google Meet or Zoom, It is
            your choice.{" "}
            <Link href="/" className="text-blue-600 underline text-lg">
              Learn more
            </Link>
          </p>
        </div>

        <FormField
          control={form.control}
          name="mentors_url"
          render={({ field }) => (
            <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
              <div className="space-y-0.5">
                <FormLabel className="large">
                  CX Video Room{" "}
                  <span className="text-green-700">[Coming soon...]</span>
                </FormLabel>
                <FormDescription className="muted">
                  Allow in-app video call option, If not activated, atleast add
                  one option below.
                </FormDescription>
              </div>
              <FormControl>
                <Switch
                  checked={field.value}
                  onCheckedChange={field.onChange}
                  disabled
                  aria-readonly
                />
              </FormControl>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="skype_url"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Skype</FormLabel>
              <FormControl>
                <Input
                  placeholder="Your skype ID goes here"
                  {...field}
                  className="p-regular-16 bg-gray-50 px-4 py-3 placeholder:text-gray-500 focus-visible:ring-transparent focus-visible:ring-offset-0"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="google_url"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Google Meet</FormLabel>
              <FormControl>
                <Input
                  placeholder="Your google Meet URL goes here"
                  {...field}
                  className="p-regular-16 bg-gray-50 px-4 py-3 placeholder:text-gray-500 focus-visible:ring-transparent focus-visible:ring-offset-0"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="zoom_url"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Zoom</FormLabel>
              <FormControl>
                <Input
                  placeholder="Your zoom goes here"
                  {...field}
                  className="p-regular-16 bg-gray-50 px-4 py-3 placeholder:text-gray-500 focus-visible:ring-transparent focus-visible:ring-offset-0"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="rounded-full">
          Save
        </Button>
      </form>
    </Form>
  );
}
