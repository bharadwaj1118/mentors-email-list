"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

import Link from "next/link";

import OnboardingImage from "../../onboarding-image";
import OnboardingProgress from "../../onboarding-progress";

import Select from "react-select";
import { INDUSTRIES } from "@/constants/data";

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

import { useRouter } from "next/navigation";
import { useState } from "react";
import { updateUserOnboarding03 } from "@/lib/actions/user.action";
import RichTextEditor from "@/components/ui/rich-texteditor";
import { draftToMarkdown } from "markdown-draft-js";

const FormSchema = z.object({
  industries: z.array(
    z.object({
      label: z.string(),
      value: z.string(),
    })
  ),
  description: z.string(),
});

interface Props {
  user: string;
}

export default function Onboarding03({ user }: Props) {
  const parsedUser = JSON.parse(user);
  const { industries } = parsedUser;
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  // Convert the industries to match the select input
  const initialIndustries = industries.map((industry: any) => ({
    label: industry.name,
    value: industry.name,
  }));

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      industries: initialIndustries || [],
    },
  });

  const { setFocus } = form;

  async function onSubmit(values: z.infer<typeof FormSchema>) {
    setIsSubmitting(true);
    try {
      await updateUserOnboarding03({
        id: parsedUser.id,
        industries: values.industries,
      });

      router.refresh();
      router.push("/onboarding-04");
    } catch (error) {
      console.log(error);
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <section className="bg-white dark:bg-slate-900 min-h-screen">
      <div className="relative flex">
        {/* Content */}
        <div className="w-full md:w-2/3">
          <div className="flex flex-col after:flex-1">
            <div className="flex-1">
              {/* <OnboardingHeader /> */}
              <OnboardingProgress step={3} />
            </div>

            <div className="px-4 py-8">
              <div className="max-w-md mx-auto">
                <h1 className="text-3xl text-slate-800 dark:text-slate-100 font-bold mb-6">
                  Industry information ✨
                </h1>
                {/* htmlForm */}
                <Form {...form}>
                  <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className=" space-y-6"
                  >
                    <FormField
                      control={form.control}
                      name="industries"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Industries:</FormLabel>
                          <FormControl>
                            <Select
                              options={INDUSTRIES}
                              classNamePrefix="select"
                              {...field}
                              isMulti
                            />
                          </FormControl>
                          <FormDescription>
                            Select your Industry
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
                          <FormLabel onClick={() => setFocus("description")}>
                            Description
                          </FormLabel>
                          <FormControl>
                            <RichTextEditor
                              onChange={(draft) =>
                                field.onChange(draftToMarkdown(draft))
                              }
                              ref={field.ref}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <div className="flex justify-between">
                      <Link href="/onboarding-02">
                        <Button type="button" variant="outline">
                          Back
                        </Button>
                      </Link>
                      <Button type="submit" disabled={isSubmitting}>
                        {" "}
                        {isSubmitting ? "Saving..." : "Next"}
                      </Button>
                    </div>
                  </form>
                </Form>
              </div>
            </div>
          </div>
        </div>

        <OnboardingImage />
      </div>
    </section>
  );
}
