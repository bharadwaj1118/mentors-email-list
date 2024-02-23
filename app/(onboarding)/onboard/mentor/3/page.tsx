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
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useLocalStorage, useReadLocalStorage, useIsClient } from "usehooks-ts";

const FormSchema = z.object({
  sessionCount: z.number().gte(0, { message: "Please enter a valid sessions" }),
  price: z.number().gte(0, { message: "Please enter a valid price" }),
  priceAcceptance: z.string().min(1, { message: "Please select an option" }),
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

  const { sessionCount, price, priceAcceptance } = JSON.parse(
    JSON.stringify(data || {})
  );

  const handleClickClearStorage = () => {
    console.log(JSON.stringify(mentorOnboardData));
  };
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      sessionCount: sessionCount || 5,
      price: price || 0,
      priceAcceptance: priceAcceptance || "",
    },
  });

  function onSubmit(data: z.infer<typeof FormSchema>) {
    setMentorOnboardData({ ...mentorOnboardData, ...data });
    router.push("/onboard/mentor/4");
  }

  if (!isClient) return null;

  return (
    <div className="min-h-screen  bg-[radial-gradient(100%_50%_at_50%_0%,rgba(0,163,255,0.13)_0,rgba(0,163,255,0)_50%,rgba(0,163,255,0)_100%)] mb-12">
      {/* Form content here */}
      <div className="form-container pt-10 space-y-4">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className=" space-y-6">
            <div className="card-block !bg-primary ">
              <p className="text-white font-bold text-lg">Financial talk</p>
            </div>

            <div className="card-block">
              <FormField
                control={form.control}
                name="price"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="md:text-base">
                      What hourly rate do you anticipate setting for your
                      mentoring sessions on Mentors CX? ($USD){" "}
                      <span className="text-red-500">*</span>
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="0"
                        {...field}
                        className="w-1/3 md:w-1/4"
                        type="number"
                        onChange={(event) =>
                          field.onChange(+event.target.value)
                        }
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="card-block">
              <FormField
                control={form.control}
                name="sessionCount"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="md:text-base">
                      How much does the financial incentive of compensated
                      mentoring sessions serve as a motivating factor for you to
                      become a CX mentor?{" "}
                      <span className="text-red-500">*</span>
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="5"
                        {...field}
                        className="w-1/3 md:w-1/4"
                        type="number"
                        onChange={(event) =>
                          field.onChange(+event.target.value)
                        }
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
                name="priceAcceptance"
                render={({ field }) => (
                  <FormItem className="space-y-3">
                    <FormLabel className="md:text-base">
                      Are you planning on charging for your mentorship?{" "}
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
                        <FormItem className="flex items-center space-x-3 space-y-0">
                          <FormControl>
                            <RadioGroupItem value="Maybe Later" />
                          </FormControl>
                          <FormLabel className="font-normal">
                            Maybe Later
                          </FormLabel>
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
                  <Link href="/onboard/mentor/2">Back</Link>
                </Button>
                <Button type="submit">Next</Button>
              </div>

              <Button
                variant="link"
                onClick={handleClickClearStorage}
                type="button"
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
