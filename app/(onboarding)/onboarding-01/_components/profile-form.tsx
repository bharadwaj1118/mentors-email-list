'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import OnboardingImage from '../../onboarding-image';
import OnboardingProgress from '../../onboarding-progress';
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
import { Textarea } from '@/components/ui/textarea';
import { useState } from 'react';

import { usePathname, useRouter } from 'next/navigation';


import { updateUser } from '@/lib/actions/user.action';


const onboard1Schema = z.object({
  shortBio: z.string().min(20, {
    message: 'your short must be at least 20 characters',
  }),
  organization: z.string().min(2, {
    message: 'organization must be at least 2 characters',
  }),
  bio: z.string().min(20, {
    message: 'your bio must be at least 20 characters',
  }),
  position: z.string().min(2, {
    message: 'position must be at least 2 characters',
  }),
  portfolioWebsite: z.string().min(2, {
    message: 'portfolioWebsite must be at least 2 characters',
  }),
});

interface Props {
  user: string;
}

export default function Onboarding01({ user }: Props) {
  const parsedUser = JSON.parse(user);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  const {shortBio, organization, bio, position, portfolioWebsite} = parsedUser;

  // 1. Define your form.
  const form = useForm<z.infer<typeof onboard1Schema>>({
    resolver: zodResolver(onboard1Schema),
    defaultValues: {
      shortBio: shortBio || '',
      organization: organization|| '',
      bio: bio || '',
      position: position || '',
      portfolioWebsite: portfolioWebsite || '',
    },
  });

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof onboard1Schema>) {
    setIsSubmitting(true);
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    try {
      await updateUser({...parsedUser, ...values});
      router.push('/onboarding-02');
    } catch (error) {
      console.log(error);
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <main className="bg-white dark:bg-slate-900 mt-24">
      <div className="relative flex">
        {/* Content */}
        <div className="w-full md:w-2/3">
          <div className=" flex flex-col after:flex-1">
            <div className="flex-1">
              {/* <OnboardingHeader /> */}
              <OnboardingProgress step={1} />
            </div>

            <div className="px-4 py-8">
              <div className="max-w-md mx-auto">
                <h1 className="text-3xl text-slate-800 dark:text-slate-100 font-bold mb-6">
                  Tell us what&apos;s your situation ✨
                </h1>
                {/* Form */}
                <Form {...form}>
                  <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="space-y-8"
                  >
                    <FormField
                      control={form.control}
                      name="position"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Current position</FormLabel>
                          <FormControl>
                            <Input placeholder="shadcn" {...field} />
                          </FormControl>
                          <FormDescription>
                            This is your current position
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="organization"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Current Organization</FormLabel>
                          <FormControl>
                            <Input placeholder="shadcn" {...field} />
                          </FormControl>
                          <FormDescription>
                            Enter the Organization you work for
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="shortBio"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Short Bio</FormLabel>
                          <FormControl>
                            <Input placeholder="shadcn" {...field} />
                          </FormControl>
                          <FormDescription>
                            Enter your short Bio about you
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="bio"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Bio</FormLabel>
                          <FormControl>
                            <Textarea
                              placeholder="Enter your bio here"
                              {...field}
                            />
                          </FormControl>
                          <FormDescription>
                            Enter your Bio in detail
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="portfolioWebsite"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>portfolioWebsite</FormLabel>
                          <FormControl>
                            <Input placeholder="shadcn" {...field} />
                          </FormControl>
                          <FormDescription>
                            Enter your portfolioWebsite
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <div className="flex justify-end">
                      <Button type="submit" disabled={isSubmitting}>
                        {' '}
                        {isSubmitting ? 'Saving...' : 'Next'}
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
    </main>
  );
}
