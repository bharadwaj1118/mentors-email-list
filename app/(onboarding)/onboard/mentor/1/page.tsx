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

const FormSchema = z.object({
  lastname: z.string().min(2, {
    message: "Last name must be at least 2 characters.",
  }),
  firstname: z.string().min(2, {
    message: "First name must be at least 2 characters.",
  }),
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  linkedinUrl: z.string().url({
    message: "Please enter a valid URL.",
  }),
  experienced: z.string().nonempty({
    message: "Please select an option.",
  }),
});

const ProfileInfoPage = () => {
  const router = useRouter();

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      firstname: "",
      lastname: "",
      email: "",
      linkedinUrl: "",
      experienced: undefined,
    },
  });

  function onSubmit(data: z.infer<typeof FormSchema>) {
    alert(JSON.stringify(data));
    router.push("/onboard/mentor/2");
  }

  return (
    <div className="min-h-screen  bg-[radial-gradient(100%_50%_at_50%_0%,rgba(0,163,255,0.13)_0,rgba(0,163,255,0)_50%,rgba(0,163,255,0)_100%)] mb-12">
      {/* Form content here */}
      <div className="form-container pt-10 space-y-4">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className=" space-y-6">
            <div className="card-block !bg-primary ">
              <p className="text-white font-bold text-lg">Profile Info</p>
            </div>

            <div className="card-block">
              <FormField
                control={form.control}
                name="firstname"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="md:text-base">
                      First Name <span className="text-red-500">*</span>
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Your First Name"
                        {...field}
                        className="w-full md:w-1/2"
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
                name="lastname"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="md:text-base">
                      Last Name <span className="text-red-500">*</span>
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Your Last Name"
                        {...field}
                        className="w-full md:w-1/2"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="card-block ">
              {" "}
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="md:text-base">
                      Email <span className="text-red-500">*</span>
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Your Email"
                        {...field}
                        className="w-full md:w-1/2"
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
                name="linkedinUrl"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="md:text-base">
                      What is your LinkedIn profile?{" "}
                      <span className="text-red-500">*</span>
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Linkedin Profile"
                        {...field}
                        className="w-full md:w-1/2"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="card-block ">
              {" "}
              <FormField
                control={form.control}
                name="experienced"
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
                <Button>
                  <Link href="/onboard/mentor">Back</Link>
                </Button>
                <Button type="submit">Next</Button>
              </div>

              <Button variant="link">Clear form</Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default ProfileInfoPage;
