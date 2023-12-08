'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';

import Link from 'next/link';
import OnboardingHeader from '../onboarding-header';
import OnboardingImage from '../onboarding-image';
import OnboardingProgress from '../onboarding-progress';

import Select from 'react-select';
import { TOOLS, EXPERTISE, INDUSTRIES } from '@/constants/data';

import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { toast } from '@/components/ui/use-toast';

const FormSchema = z.object({
  industries: z.array(
    z.object({
      label: z.string(),
      value: z.string(),
    })
  ),
  expertise: z.array(
    z.object({
      label: z.string(),
      value: z.string(),
    })
  ),
  tools: z.array(
    z.object({
      label: z.string(),
      value: z.string(),
    })
  ),
});

export default function Onboarding03() {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      industries: [],
      expertise: [],
      tools: [],
    },
  });

  function onSubmit(data: z.infer<typeof FormSchema>) {
    console.log(data);
  }

  return (
    <main className="bg-white dark:bg-slate-900 mt-24 h-full">
      <div className="relative flex">
        {/* Content */}
        <div className="w-full md:w-2/3">
          <div className="min-h-[100dvh] flex flex-col after:flex-1">
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
                      name="expertise"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Expertise:</FormLabel>
                          <FormControl>
                            <Select
                              options={EXPERTISE}
                              classNamePrefix="select"
                              {...field}
                              isMulti
                            />
                          </FormControl>
                          <FormDescription>
                            Select your expertise
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="tools"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Toolkit:</FormLabel>
                          <FormControl>
                            <Select
                              options={TOOLS}
                              classNamePrefix="select"
                              {...field}
                              isMulti
                            />
                          </FormControl>
                          <FormDescription>Select your toolkit</FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <Button type="submit">Submit</Button>
                  </form>
                </Form>
              </div>
            </div>
          </div>
        </div>

        <OnboardingImage />
      </div>
    </main>
  );
}
