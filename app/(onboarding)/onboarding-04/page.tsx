'use client';
import Link from 'next/link';
import OnboardingHeader from '../onboarding-header';
import OnboardingImage from '../onboarding-image';
import OnboardingProgress from '../onboarding-progress';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Button } from '@/components/ui/button';

import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';

const Onboarding4Schema = z.object({
  session: z.enum(['15', '30', '60'], {
    required_error: 'You need to select a notification type.',
  }),
  price: z.enum(['Free', '25', '50', '75', '100'], {
    required_error: 'You need to select a price type.',
  }),
});

export default function Onboarding04() {
  // 1. Define your form.
  const form = useForm<z.infer<typeof Onboarding4Schema>>({
    resolver: zodResolver(Onboarding4Schema),
    defaultValues: {
      session: '30',
      price: 'Free',
    },
  });

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof Onboarding4Schema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values);
  }

  return (
    <main className="bg-white dark:bg-slate-900 mt-24 h-screen">
      <div className="relative flex">
        {/* Content */}
        <div className="w-full md:w-2/3">
          <div className="min-h-[100dvh]  flex flex-col after:flex-1">
            <div className="flex-1">
              {/* <OnboardingHeader /> */}
              <OnboardingProgress step={4} />
            </div>

            <div className="px-4 py-8">
              <div className="max-w-md mx-auto">
                <h3 className="h3 mb-3">Almost there, just one final step..</h3>
                <Form {...form}>
                  <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="space-y-3"
                  >
                    <FormField
                      control={form.control}
                      name="session"
                      render={({ field }) => (
                        <FormItem className="space-y-3">
                          <FormLabel>Select the session duration...</FormLabel>
                          <FormControl>
                            <RadioGroup
                              onValueChange={field.onChange}
                              defaultValue={field.value}
                              className="flex space-x-3"
                            >
                              <FormItem className="flex items-center space-x-3 space-y-0">
                                <FormControl>
                                  <RadioGroupItem value="15" />
                                </FormControl>
                                <FormLabel className="font-normal">
                                  15min
                                </FormLabel>
                              </FormItem>
                              <FormItem className="flex items-center space-x-3 space-y-0">
                                <FormControl>
                                  <RadioGroupItem value="30" />
                                </FormControl>
                                <FormLabel className="font-normal">
                                  30min
                                </FormLabel>
                              </FormItem>
                              <FormItem className="flex items-center space-x-3 space-y-0">
                                <FormControl>
                                  <RadioGroupItem value="60" />
                                </FormControl>
                                <FormLabel className="font-normal">
                                  60min
                                </FormLabel>
                              </FormItem>
                            </RadioGroup>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="price"
                      render={({ field }) => (
                        <FormItem className="space-y-3">
                          <FormLabel>Select the price ...</FormLabel>
                          <FormControl>
                            <RadioGroup
                              onValueChange={field.onChange}
                              defaultValue={field.value}
                              className="flex space-x-3 flex-wrap"
                            >
                              <FormItem className="flex items-center space-x-3 space-y-0">
                                <FormControl>
                                  <RadioGroupItem value="Free" />
                                </FormControl>
                                <FormLabel className="font-normal">
                                  Free
                                </FormLabel>
                              </FormItem>
                              <FormItem className="flex items-center space-x-3 space-y-0">
                                <FormControl>
                                  <RadioGroupItem value="25" />
                                </FormControl>
                                <FormLabel className="font-normal">
                                  25$
                                </FormLabel>
                              </FormItem>
                              <FormItem className="flex items-center space-x-3 space-y-0">
                                <FormControl>
                                  <RadioGroupItem value="50" />
                                </FormControl>
                                <FormLabel className="font-normal">
                                  50$
                                </FormLabel>
                              </FormItem>
                              <FormItem className="flex items-center space-x-3 space-y-0">
                                <FormControl>
                                  <RadioGroupItem value="75" />
                                </FormControl>
                                <FormLabel className="font-normal">
                                  75$
                                </FormLabel>
                              </FormItem>
                              <FormItem className="flex items-center space-x-3 space-y-0">
                                <FormControl>
                                  <RadioGroupItem value="100" />
                                </FormControl>
                                <FormLabel className="font-normal">
                                  100$
                                </FormLabel>
                              </FormItem>
                            </RadioGroup>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <div className="flex justify-center">
                      <Button type="submit" className="mt-6">
                        Complete your profile
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
