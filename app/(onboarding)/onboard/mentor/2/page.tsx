"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import React from "react";
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
import { toast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Textarea } from "@/components/ui/textarea";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useLocalStorage, useReadLocalStorage, useIsClient } from "usehooks-ts";

const FormSchema = z.object({
  role: z.string().min(2, {
    message: "Please choose an option.",
  }),
  reason: z.string().min(20, {
    message: "Please enter atleast 20 letters..",
  }),
  charge: z.string().min(2, {
    message: "Please choose an option..",
  }),
});

const ProfileInfoPage = () => {
  const router = useRouter();
  const isClient = useIsClient();
  const [mentorOnboardData, setMentorOnboardData] = useLocalStorage(
    "mentorOnboardingData",
    {},
    { initializeWithValue: false }
  );

  const data = useReadLocalStorage("mentorOnboardingData");
  const { role, reason, charge } = JSON.parse(JSON.stringify(data || {}));

  const handleClickStorage = () => {
    console.log(JSON.stringify(mentorOnboardData));
  };

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      role: role || "",
      reason: reason || "",
      charge: charge || "",
    },
  });

  function onSubmit(data: z.infer<typeof FormSchema>) {
    setMentorOnboardData({ ...mentorOnboardData, ...data });
    router.push("/onboard/mentor/3");
  }

  if (!isClient) return null;

  return (
    <div className="min-h-screen  bg-[radial-gradient(100%_50%_at_50%_0%,rgba(0,163,255,0.13)_0,rgba(0,163,255,0)_50%,rgba(0,163,255,0)_100%)] mb-12">
      {/* Form content here */}
      <div className="form-container pt-10 space-y-4">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className=" space-y-6">
            <div className="card-block !bg-primary ">
              <p className="text-white font-bold text-lg">Motive</p>
            </div>

            <div className="card-block">
              <FormField
                control={form.control}
                name="role"
                render={({ field }) => (
                  <FormItem className="space-y-3">
                    <FormLabel className="md:text-base">
                      What do you do?
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
                            <RadioGroupItem value="I'm a business owner" />
                          </FormControl>
                          <FormLabel className="font-normal">
                            I&apos;m a business owner
                          </FormLabel>
                        </FormItem>
                        <FormItem className="flex items-center space-x-3 space-y-0">
                          <FormControl>
                            <RadioGroupItem value="I'm a paid employee" />
                          </FormControl>
                          <FormLabel className="font-normal">
                            I&apos;m a paid employee
                          </FormLabel>
                        </FormItem>
                        <FormItem className="flex items-center space-x-3 space-y-0">
                          <FormControl>
                            <RadioGroupItem value="I'm a freelancer or consultant" />
                          </FormControl>
                          <FormLabel className="font-normal">
                            I&apos;m a freelancer or consultant
                          </FormLabel>
                        </FormItem>
                        <FormItem className="flex items-center space-x-3 space-y-0">
                          <FormControl>
                            <RadioGroupItem value="I'm a CX influencer/content creator" />
                          </FormControl>
                          <FormLabel className="font-normal">
                            I&apos;m a CX influencer/content creator
                          </FormLabel>
                        </FormItem>

                        <FormItem className="flex items-center space-x-3 space-y-0">
                          <FormControl>
                            <RadioGroupItem value="Other" />
                          </FormControl>
                          <FormLabel className="font-normal">Other</FormLabel>
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
                name="reason"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="md:text-base">
                      Why would you like to become a CX mentor? (one sentence)
                      <span className="text-red-500">*</span>
                    </FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Your answer"
                        {...field}
                        className="w-full"
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
                name="charge"
                render={({ field }) => (
                  <FormItem className="space-y-3">
                    <FormLabel className="md:text-base">
                      Do you have at least 5 years of experience working in
                      customer experience, customer support, with startups, or
                      in tech companies? <span className="text-red-500">*</span>
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

            {/* Form footer */}
            <div className="form-container mt-4 flex items-center justify-between p-3">
              <div className="space-x-4">
                <Button type="button">
                  <Link href="/onboard/mentor/1">Back</Link>
                </Button>
                <Button type="submit">Next</Button>
              </div>

              <Button variant="link" onClick={handleClickStorage} type="button">
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
