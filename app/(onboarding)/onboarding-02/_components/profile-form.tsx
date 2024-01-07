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
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';

import Select from 'react-select';
import { COUNTRIES, LANGUAGES } from '@/constants/data';

import { useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';

import { updateUser } from '@/lib/actions/user.action';
import Link from 'next/link';

const FormSchema = z.object({
  city: z.string().min(2, {
    message: 'Username must be at least 2 characters.',
  }),
  country: z.object({
    label: z.string(),
    value: z.string(),
  }),
  languages: z.array(
    z.object({
      label: z.string(),
      value: z.string(),
    })
  ),
  role: z.enum(['MENTOR', 'MENTEE', 'BOTH']),
});

interface Props {
  user: string;
}

export default function Onboarding02({ user }: Props) {
  const parsedUser = JSON.parse(user);
  const {city, country, languages, role} = parsedUser;
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();
  const pathname = usePathname();
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      city:  city || '',
      country:  country || {},
      languages: languages || {},
      role:  role || 'mentor',
    },
  });

  async function onSubmit(values: z.infer<typeof FormSchema>) {
    setIsSubmitting(true);

    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    try {
      await updateUser({...parsedUser, ...values});
      console.log(values);
      router.push('/onboarding-03');
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
          <div className="min-h-[100dvh] h-screen flex flex-col after:flex-1">
            <div className="flex-1">
              {/* <OnboardingHeader /> */}
              <OnboardingProgress step={2} />
            </div>

            <div className="px-4 py-8">
              <div className="max-w-md mx-auto">
                <h1 className="text-3xl text-slate-800 dark:text-slate-100 font-bold mb-6">
                  Tell more about you.. ✨
                </h1>
                {/* Form */}
                <Form {...form}>
                  <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="w-full space-y-6"
                  >
                    <FormField
                      control={form.control}
                      name="city"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>City</FormLabel>
                          <FormControl>
                            <Input placeholder="Berlin" {...field} />
                          </FormControl>
                          <FormDescription>
                            Please enter the city you are from
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="country"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Country:</FormLabel>
                          <FormControl>
                            <Select
                              options={COUNTRIES}
                              classNamePrefix="select"
                              {...field}
                            />
                          </FormControl>
                          <FormDescription>
                            Country you are from
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="role"
                      render={({ field }) => (
                        <FormItem className="space-y-3">
                          <FormLabel>I am interested in being a...</FormLabel>
                          <FormControl>
                            <RadioGroup
                              onValueChange={field.onChange}
                              defaultValue={field.value}
                              className="flex space-x-3"
                            >
                              <FormItem className="flex items-center space-x-3 space-y-0">
                                <FormControl>
                                  <RadioGroupItem value="MENTOR" />
                                </FormControl>
                                <FormLabel className="font-normal">
                                  Mentor
                                </FormLabel>
                              </FormItem>
                              <FormItem className="flex items-center space-x-3 space-y-0">
                                <FormControl>
                                  <RadioGroupItem value="MENTEE" />
                                </FormControl>
                                <FormLabel className="font-normal">
                                  Mentee
                                </FormLabel>
                              </FormItem>
                              <FormItem className="flex items-center space-x-3 space-y-0">
                                <FormControl>
                                  <RadioGroupItem value="BOTH" />
                                </FormControl>
                                <FormLabel className="font-normal">
                                  Both
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
                      name="languages"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Languages</FormLabel>
                          <FormControl>
                            <Select
                              isMulti
                              options={LANGUAGES}
                              classNamePrefix="select"
                              {...field}
                            />
                          </FormControl>
                          <FormDescription>Languages you know</FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <div className="flex justify-between">
                      <Link href="/onboarding-01">
                        <Button type="button" variant="outline">
                          Back
                        </Button>
                      </Link>
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
