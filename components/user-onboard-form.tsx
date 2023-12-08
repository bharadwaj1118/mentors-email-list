'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import axios from 'axios';
import Select from 'react-select';

import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Separator } from '@/components/ui/separator';
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
import { EXPERTISE, LANGUAGES, TIMEZONES, TOOLS } from '@/constants/data';
import prismadb from '@/lib/prismadb';
import { init } from 'aos';
import { Profile } from '@prisma/client';
import { profileFormSchema } from '@/lib/formSchema';
import { profile } from 'console';
import { parseArgs } from 'util';

interface ProfileFormProps {
  initialData: Profile | null;
}

export function ProfileForm({ initialData }: ProfileFormProps) {
  type profileType = z.infer<typeof profileFormSchema>;

  const result = profileFormSchema.safeParse(initialData);
  let parsedValue: profileType = {} as profileType;
  if (result.success) {
    parsedValue = result.data;
  }

  // 1. Define your form.
  const form = useForm<profileType>({
    resolver: zodResolver(profileFormSchema),
    defaultValues: {
      username: parsedValue?.username || '',
      firstname: parsedValue?.firstname || '',
      lastname: parsedValue?.lastname || '',
      email: parsedValue?.email || '',
      role: parsedValue?.role || '',
      bio: parsedValue?.bio || '',
      timezone: parsedValue?.timezone || '',
      languages: parsedValue?.languages || [],
      expertise: parsedValue?.expertise || [],
      toolkit: parsedValue?.toolkit || [],
      twitterUrl: parsedValue?.twitterUrl || '',
      linkedinUrl: parsedValue?.linkedinUrl || '',
    },
  });

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof profileFormSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.

    try {
      if (initialData) {
        await axios.patch(`/api/profile/${initialData.id}`, values);
      } else {
        await axios.post('/api/profile', values);
      }
    } catch (e) {
      console.log(e);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 mt-12">
        <div className="space-y-2 w-full col-span-2">
          <div>
            <h3 className="text-lg font-medium">Profile Information</h3>
            <p className="text-sm text-muted-foreground">
              Profile information about you
            </p>
          </div>
          <Separator className="bg-primary/10" />
        </div>
        <div className="grid max-md:space-y-3 md:grid-cols-2 md:gap-6">
          <FormField
            control={form.control}
            name="firstname"
            render={({ field }) => (
              <FormItem>
                <FormLabel>First Name</FormLabel>
                <FormControl>
                  <Input placeholder="Elon" {...field} />
                </FormControl>
                <FormDescription>This is your first name.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="lastname"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Last Name</FormLabel>
                <FormControl>
                  <Input placeholder="Musk" {...field} />
                </FormControl>
                <FormDescription>This is your last name.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="grid max-md:space-y-3 md:grid-cols-2 md:gap-6">
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Username</FormLabel>
                <FormControl>
                  <Input placeholder="shadcn" {...field} />
                </FormControl>
                <FormDescription>
                  This is your public display name.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder="shadcn" {...field} />
                </FormControl>
                <FormDescription>This is your Email id.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="space-y-2 w-full col-span-2">
          <div>
            <h3 className="text-lg font-medium">Gereral Information</h3>
            <p className="text-sm text-muted-foreground">
              General information about you
            </p>
          </div>
          <Separator className="bg-primary/10" />
        </div>

        <div className="grid max-md:space-y-3 md:grid-cols-2 md:gap-6">
          <FormField
            control={form.control}
            name="role"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Current role</FormLabel>
                <FormControl>
                  <Input placeholder="Marketing Manager" {...field} />
                </FormControl>
                <FormDescription>This is your current role</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="timezone"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Select your timezone</FormLabel>
                <FormControl>
                  <Select
                    options={TIMEZONES}
                    classNamePrefix="select"
                    {...field}
                  />
                </FormControl>
                <FormDescription>Select your timezone</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="bio"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description about you</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="I am a marketing manager..."
                  {...field}
                />
              </FormControl>
              <FormDescription>This is your current role</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="space-y-2 w-full col-span-2">
          <div>
            <h3 className="text-lg font-medium">Skill stack</h3>
            <p className="text-sm text-muted-foreground">
              Skills information about your profile
            </p>
          </div>
          <Separator className="bg-primary/10" />
        </div>

        <div className="grid max-md:space-y-3 md:grid-cols-2 md:gap-6">
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
        </div>

        <div className="grid max-md:space-y-3 md:grid-cols-2 md:gap-6">
          <FormField
            control={form.control}
            name="expertise"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Expertise</FormLabel>
                <FormControl>
                  <Select
                    isMulti
                    options={EXPERTISE}
                    classNamePrefix="select"
                    {...field}
                  />
                </FormControl>
                <FormDescription>Select your expertise</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="toolkit"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Tool kit</FormLabel>
                <FormControl>
                  <Select
                    isMulti
                    options={TOOLS}
                    classNamePrefix="select"
                    {...field}
                  />
                </FormControl>
                <FormDescription>Select your tool kit</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="space-y-2 w-full col-span-2">
          <div>
            <h3 className="text-lg font-medium">Social information</h3>
            <p className="text-sm text-muted-foreground">
              Social information about your profile
            </p>
          </div>
          <Separator className="bg-primary/10" />
        </div>

        <div className="grid max-md:space-y-3 md:grid-cols-2 md:gap-6">
          <FormField
            control={form.control}
            name="twitterUrl"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Twitter URL</FormLabel>
                <FormControl>
                  <Input placeholder="twitter.com/user" {...field} />
                </FormControl>
                <FormDescription>Enter your twitter URL</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="linkedinUrl"
            render={({ field }) => (
              <FormItem>
                <FormLabel>LinkedIn URL</FormLabel>
                <FormControl>
                  <Input placeholder="linkedin.url" {...field} />
                </FormControl>
                <FormDescription>Enter your linkedIn URL</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
}
