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
import Select from "react-select";

import { LANGUAGES } from "@/constants/data";

const FormSchema = z.object({
  first_name: z.string().min(2, {
    message: "Please enter a valid first name",
  }),
  last_name: z.string().min(2, {
    message: "Please enter a valid last name",
  }),
  display_name: z.string().min(2, {
    message: "Please enter a valid display name",
  }),
  role: z.string().min(2, {
    message: "Please enter a valid role",
  }),
  from_location: z.string().min(2, {
    message: "Please enter a valid location",
  }),
  living_location: z.string().min(2, {
    message: "Please enter a valid location",
  }),
  timezone: z.object({
    label: z.string(),
    value: z.string(),
  }),
  website: z.string(),
  languages: z.array(
    z.object({
      label: z.string(),
      value: z.string(),
    })
  ),
});

export function ProfileBasicForm() {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      first_name: "",
      last_name: "",
      display_name: "",
      role: "",
      from_location: "",
      living_location: "",
      timezone: {},
      website: "",
      languages: [],
    },
  });

  function onSubmit(data: z.infer<typeof FormSchema>) {
    console.log(data);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid grid-cols-1 max-md:space-y-6 md:grid-cols-2 md:space-x-3">
          <FormField
            control={form.control}
            name="first_name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  First Name <span className="text-red-400">*</span>
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder="Enter your first name"
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
            name="last_name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  Last name <span className="text-red-400">*</span>
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder="Enter your last name"
                    {...field}
                    className="p-regular-16 bg-gray-50 px-4 py-3 placeholder:text-gray-500 focus-visible:ring-transparent focus-visible:ring-offset-0"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="display_name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                Display Name <span className="text-red-400">*</span>
              </FormLabel>
              <FormControl>
                <Input
                  placeholder="Enter your display name"
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
          name="role"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                Role <span className="text-red-400">*</span>
              </FormLabel>
              <FormControl>
                <Input
                  placeholder="Enter your role"
                  {...field}
                  className="p-regular-16 bg-gray-50 px-4 py-3 placeholder:text-gray-500 focus-visible:ring-transparent focus-visible:ring-offset-0"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="grid grid-cols-1 max-md:space-y-6 md:grid-cols-2 md:space-x-3">
          <FormField
            control={form.control}
            name="from_location"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  From <span className="text-red-400">*</span>
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder="Enter your from location"
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
            name="living_location"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  Living in <span className="text-red-400">*</span>
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder="Enter your from location"
                    {...field}
                    className="p-regular-16 bg-gray-50 px-4 py-3 placeholder:text-gray-500 focus-visible:ring-transparent focus-visible:ring-offset-0"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="timezone"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                Timezone <span className="text-red-400">*</span>
              </FormLabel>
              <FormControl>
                <Select
                  options={LANGUAGES}
                  classNamePrefix="select"
                  {...field}
                />
              </FormControl>
              <FormDescription>Timezone you prefer</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="website"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Website</FormLabel>
              <FormControl>
                <Input
                  placeholder="Please enter your website"
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
          name="languages"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                Languages <span className="text-red-400">*</span>
              </FormLabel>
              <FormControl>
                <Select
                  isMulti
                  options={LANGUAGES}
                  classNamePrefix="select"
                  {...field}
                />
              </FormControl>
              <FormDescription>Languages you know</FormDescription>
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
