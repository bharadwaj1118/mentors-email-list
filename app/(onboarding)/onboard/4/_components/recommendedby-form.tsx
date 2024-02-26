"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useRef, useState } from "react";

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

import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import { saveUserReferenceById } from "@/lib/actions/user.action";

const options = [
  { value: "Google search", label: "Google search" },
  { value: "LinkedIn", label: "LinkedIn" },
  { value: "Facebook", label: "Facebook" },
  { value: "Instagram", label: "Instagram" },
  { value: "TikTok", label: "TikTok" },
  { value: "Podcast", label: "Podcast" },
  { value: "Digital ads", label: "Digital ads" },
  { value: "Other", label: "Other" },
] as const;

const FormSchema = z.object({
  recommendedBy: z.string().min(2, {
    message: "Please choose an option",
  }),
});

interface RecommendedByFormProps {
  userId: string;
  recommenedBy: string;
}

export function RecommendedByForm({
  userId,
  recommenedBy,
}: RecommendedByFormProps) {
  console.log(recommenedBy);
  const router = useRouter();
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      recommendedBy: recommenedBy || "",
    },
  });

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    saveUserReferenceById({
      userId,
      recommendedBy: data.recommendedBy,
    });
    router.refresh();
    router.push("/onboard/code-of-conduct");
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="recommendedBy"
          render={({ field }) => (
            <FormItem className="space-y-3">
              <FormControl>
                <RadioGroup
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  className="flex flex-col space-y-1"
                >
                  {options.map((option) => (
                    <FormItem
                      key={option.value}
                      className="flex items-center space-x-3 space-y-0"
                    >
                      <FormControl>
                        <RadioGroupItem value={option.value} />
                      </FormControl>
                      <FormLabel className="font-normal">
                        {option.label}
                      </FormLabel>
                    </FormItem>
                  ))}
                </RadioGroup>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex items-start justify-end">
          <Button type="submit" className="rounded-full">
            Submit
          </Button>
        </div>
      </form>
    </Form>
  );
}
