"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import React from "react";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
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

import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import Link from "next/link";
import { useLocalStorage, useReadLocalStorage, useIsClient } from "usehooks-ts";

import { useRouter } from "next/navigation";
import { Toaster } from "@/components/ui/sonner";
import { toast } from "sonner";

const roles = [
  {
    id: "First-time founders",
    label: "First-time founders",
  },
  {
    id: "VC backed founders",
    label: "VC backed founders",
  },
  {
    id: "Bootstrapped founders",
    label: "Bootstrapped founders",
  },
  {
    id: "CX roles",
    label: "CX roles",
  },
  {
    id: "Customer support roles",
    label: "Customer support roles",
  },
  {
    id: "Customer success roles",
    label: "Customer success roles",
  },
  {
    id: "Technical support roles",
    label: "Technical support roles",
  },
  {
    id: "Onboarding specialist",
    label: "Onboarding specialist",
  },
  {
    id: "Customer lifecycle managers",
    label: "Customer lifecycle managers",
  },
  {
    id: "Customer retention leads",
    label: "Customer retention leads",
  },
  {
    id: "Women in tech",
    label: "Women in tech",
  },
  {
    id: "Career switchers in tech",
    label: "Career switchers in tech",
  },
] as const;

const sessionOptions = [
  {
    label: "1",
    value: "1",
  },
  {
    label: "2",
    value: "2",
  },
  {
    label: "3",
    value: "3",
  },
  {
    label: "4",
    value: "4",
  },
  {
    label: "5",
    value: "5",
  },
  {
    label: "6",
    value: "6",
  },
  {
    label: "7",
    value: "7",
  },
  {
    label: "8",
    value: "8",
  },
  {
    label: "9",
    value: "9",
  },
  {
    label: "10",
    value: "10",
  },
] as const;

const FormSchema = z.object({
  videoAccepted: z.string().min(2, {
    message: "Please choose an option.",
  }),
  sessions: z.string().min(0, {
    message: "Please enter a valid option",
  }),
  priorExperience: z.string().min(2, { message: "Please choose an option." }),
  firstPersonView: z
    .string()
    .min(20, { message: "Please enter short description." }),
  cxDefination: z
    .string()
    .min(20, { message: "Please enter short description." }),
  challangeSolved: z
    .string()
    .min(20, { message: "Please enter short description." }),
  menteePreference: z.string().min(0, {
    message: "Please choose a valid option",
  }),
});

const ProfileInfoPage = () => {
  const isClient = useIsClient();
  const router = useRouter();
  const [mentorOnboardData, setMentorOnboardData] = useLocalStorage(
    "mentorOnboardingData",
    {},
    { initializeWithValue: false }
  );

  const data = useReadLocalStorage("mentorOnboardingData");
  const {
    videoAccepted,
    sessions,
    priorExperience,
    firstPersonView,
    cxDefination,
    challangeSolved,
    menteePreference,
    charge,
  } = JSON.parse(JSON.stringify(data || {}));

  const handleClickClearStorage = () => {
    console.log(JSON.stringify(mentorOnboardData));
  };

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      videoAccepted: videoAccepted || "",
      sessions: sessions || 0,
      priorExperience: priorExperience || "",
      firstPersonView: firstPersonView || "",
      cxDefination: cxDefination || "",
      challangeSolved: challangeSolved || "",
      menteePreference: menteePreference || "",
    },
  });

  const onSubmit = async (data: z.infer<typeof FormSchema>) => {
    await setMentorOnboardData({ ...mentorOnboardData, ...data });
    toast.success("Your data has been submitted successfully!");
    router.push("/onboard/mentor/thankyou");
  };

  if (!isClient) return null;

  return (
    <div className="min-h-screen  bg-[radial-gradient(100%_50%_at_50%_0%,rgba(0,163,255,0.13)_0,rgba(0,163,255,0)_50%,rgba(0,163,255,0)_100%)] mb-12">
      {/* Form content here */}
      <div className="form-container pt-10 space-y-4">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className=" space-y-6">
            <div className="card-block !bg-primary ">
              <p className="text-white font-bold text-lg">Final Step</p>
            </div>

            <div className="card-block ">
              <FormField
                control={form.control}
                name="videoAccepted"
                render={({ field }) => (
                  <FormItem className="space-y-3">
                    <FormLabel className="md:text-base">
                      Creating video profile introductions is strongly
                      recommended for new mentors. Are you comfortable with
                      this? <span className="text-red-500">*</span>
                    </FormLabel>
                    <FormControl>
                      <RadioGroup
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                        className="flex flex-col space-y-1"
                      >
                        <FormItem className="flex items-center space-x-3 space-y-0">
                          <FormControl>
                            <RadioGroupItem value="yes" />
                          </FormControl>
                          <FormLabel className="font-normal">Yes</FormLabel>
                        </FormItem>
                        <FormItem className="flex items-center space-x-3 space-y-0">
                          <FormControl>
                            <RadioGroupItem value="no" />
                          </FormControl>
                          <FormLabel className="font-normal">No</FormLabel>
                        </FormItem>
                      </RadioGroup>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="card-block ">
              <FormField
                control={form.control}
                name="sessions"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="md:text-base">
                      Ideally, how many 30-minute mentorship sessions would you
                      aim to conduct each week?{" "}
                      <span className="text-red-500">*</span>
                    </FormLabel>
                    <FormControl>
                      {/* <RadioGroup
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                        className="flex flex-row flex-wrap gap-4"
                      >
                        {sessionOptions.map((option) => (
                          <FormItem
                            key={option.value}
                            className="flex items-center space-x-1 space-y-0"
                          >
                            <FormControl>
                              <RadioGroupItem value={option.value} />
                            </FormControl>
                            <FormLabel className="font-normal">
                              {option.label}
                            </FormLabel>
                          </FormItem>
                        ))}
                      </RadioGroup> */}
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger className="w-[100px]">
                            <SelectValue placeholder="Select" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {sessionOptions.map((option) => (
                            <SelectItem key={option.value} value={option.value}>
                              {option.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="card-block ">
              <FormField
                control={form.control}
                name="priorExperience"
                render={({ field }) => (
                  <FormItem className="space-y-3">
                    <FormLabel className="md:text-base">
                      Have you had any prior experience mentoring others?{" "}
                      <span className="text-red-500">*</span>
                    </FormLabel>
                    <FormControl>
                      <RadioGroup
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                        className="flex flex-col space-y-1"
                      >
                        <FormItem className="flex items-center space-x-3 space-y-0">
                          <FormControl>
                            <RadioGroupItem value="yes" />
                          </FormControl>
                          <FormLabel className="font-normal">Yes</FormLabel>
                        </FormItem>
                        <FormItem className="flex items-center space-x-3 space-y-0">
                          <FormControl>
                            <RadioGroupItem value="no" />
                          </FormControl>
                          <FormLabel className="font-normal">No</FormLabel>
                        </FormItem>
                      </RadioGroup>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="card-block ">
              <FormField
                control={form.control}
                name="firstPersonView"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="md:text-base">
                      If you become a mentor, your response to this question
                      will be added to your mentor profile
                      <span className="text-red-500">*</span>
                    </FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Your answer"
                        {...field}
                        className="w-full h-[150px]"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="card-block ">
              <FormField
                control={form.control}
                name="cxDefination"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="md:text-base">
                      In your own words, please describe what good CX means to
                      you. <span className="text-red-500">*</span>
                    </FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Your answer"
                        {...field}
                        className="w-full h-[150px]"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="card-block ">
              <FormField
                control={form.control}
                name="challangeSolved"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="md:text-base">
                      Share an inventive solution to a challenging problem that
                      you came up with, leaving you with a sense of confidence
                      and thinking, (I&apos;m pretty good at this!){" "}
                      <span className="text-red-500">*</span>
                    </FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Your answer"
                        {...field}
                        className="w-full h-[150px]"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="card-block ">
              <FormField
                control={form.control}
                name="menteePreference"
                render={({ field }) => (
                  <FormItem className="space-y-3">
                    <FormLabel className="md:text-base">
                      Have you had any prior experience mentoring others?{" "}
                      <span className="text-red-500">*</span>
                    </FormLabel>
                    <FormControl>
                      <RadioGroup
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                        className="flex flex-col space-y-1"
                      >
                        {roles.map((role) => (
                          <FormItem
                            key={role.id}
                            className="flex items-center space-x-3 space-y-0"
                          >
                            <FormControl>
                              <RadioGroupItem value={role.id} />
                            </FormControl>
                            <FormLabel className="font-normal">
                              {role.label}
                            </FormLabel>
                          </FormItem>
                        ))}
                      </RadioGroup>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* Form footer */}
            <div className="form-container mt-4 flex items-center justify-between p-3">
              <div className="space-x-4">
                <Button type="button">
                  <Link
                    href={
                      charge === "no"
                        ? "/onboard/mentor/2"
                        : "/onboard/mentor/3"
                    }
                  >
                    Back
                  </Link>
                </Button>
                <Button type="submit">Next</Button>
              </div>

              <Button
                variant="link"
                type="button"
                onClick={handleClickClearStorage}
              >
                Clear form
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default ProfileInfoPage;
