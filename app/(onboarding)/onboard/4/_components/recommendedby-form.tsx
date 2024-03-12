"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useEffect, useRef, useState } from "react";

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
] as const;

const FormSchema = z.object({
  recommendedBy: z.string().min(2, {
    message: "Please choose an option",
  }),
  otherRecommendation: z.string().optional(),
});

interface RecommendedByFormProps {
  userId: string;
  recommenedBy: string;
  otherRecommendation: string;
}

export function RecommendedByForm({
  userId,
  recommenedBy,
  otherRecommendation,
}: RecommendedByFormProps) {
  const [otherLabelChecked, setOtherLabelChecked] = useState(false);

  const router = useRouter();
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      recommendedBy: recommenedBy || "",
      otherRecommendation: otherRecommendation || "",
    },
  });

  useEffect(() => {
    if (recommenedBy === "Other") {
      setOtherLabelChecked(true);
    }
  }, [recommenedBy]);

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    saveUserReferenceById({
      userId,
      recommendedBy: data.recommendedBy,
      otherRecommendation:
        data.recommendedBy === "Other" ? data?.otherRecommendation || "" : "",
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
                <>
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
                          <RadioGroupItem
                            value={option.value}
                            onClick={() => setOtherLabelChecked(false)}
                          />
                        </FormControl>
                        <FormLabel className="font-normal">
                          {option.label}
                        </FormLabel>
                      </FormItem>
                    ))}
                    <FormItem className="flex items-center space-x-3 space-y-0">
                      <FormControl>
                        <>
                          <RadioGroupItem
                            value="Other"
                            onClick={() => setOtherLabelChecked(true)}
                          />
                        </>
                      </FormControl>
                      <FormLabel className="font-normal ">Other</FormLabel>
                    </FormItem>
                  </RadioGroup>
                </>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {otherLabelChecked && (
          <FormField
            control={form.control}
            name="otherRecommendation"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    className="w-2/3"
                    {...field}
                    defaultValue={otherRecommendation}
                  />
                </FormControl>
                <FormDescription>How do you know about us?</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        )}

        <div className="flex items-start justify-end">
          <Button type="submit" className="rounded-full">
            Submit
          </Button>
        </div>
      </form>
    </Form>
  );
}
