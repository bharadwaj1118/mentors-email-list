"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import React from "react";
import { useRouter } from "next/navigation";

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

import { COUNTRIES, languageData } from "@/constants/data";
import Select from "react-select";
import { saveUserBasicDetailsById } from "@/lib/actions/user.action";

const FormSchema = z.object({
  city: z.string().min(2, "Please enter city name"),
  country: z.object({
    label: z.string(),
    value: z.string(),
  }),
  languages: z.array(
    z.object({
      label: z.string(),
      value: z.string(),
    })
  ),
});

interface Props {
  user: string;
}

export function OnboardStepOneForm({ user }: Props) {
  const router = useRouter();

  const { id, city, country, languages } = JSON.parse(user);
  let initialLocation = {};
  let initialLanguages = [];
  if (country !== null) {
    initialLocation = { label: country, value: country };
  }
  if (languages !== null) {
    initialLanguages = languages.map((language: any) => ({
      label: language.name,
      value: language.name,
    }));
  }

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      city: city || "",
      country: initialLocation || {},
      languages: initialLanguages || [],
    },
  });

  function onSubmit(data: z.infer<typeof FormSchema>) {
    saveUserBasicDetailsById({
      userId: id,
      city: data.city,
      country: data.country.value,
      languages: data.languages,
    });

    router.push("/onboard/2");
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 ">
        <div>
          <FormField
            control={form.control}
            name="city"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  City <span className="text-red-400">*</span>
                </FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div>
          <FormField
            control={form.control}
            name="country"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  Country <span className="text-red-400">*</span>
                </FormLabel>
                <FormControl>
                  <Select {...field} isMulti={false} options={COUNTRIES} />
                </FormControl>
                <FormDescription>
                  Type a city name in the above and select from the dropdown
                </FormDescription>
              </FormItem>
            )}
          />
        </div>

        <div>
          <FormField
            control={form.control}
            name="languages"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  Languages <span className="text-red-400">*</span>
                </FormLabel>
                <FormControl>
                  <Select {...field} isMulti={true} options={languageData} />
                </FormControl>
                <FormDescription>
                  Type a language name in the above and select languages from
                  the dropdown
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="flex items-center justify-end">
          <Button type="submit" className="rounded-full">
            Next
          </Button>
        </div>
      </form>
    </Form>
  );
}
