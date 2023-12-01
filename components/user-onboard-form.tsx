'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
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

const formSchema = z.object({
  username: z.string().min(2, {
    message: 'Username must be at least 2 characters.',
  }),
  firstname: z.string().min(2, {
    message: 'Username must be at least 2 characters.',
  }),
  lastname: z.string().min(2, {
    message: 'Username must be at least 2 characters.',
  }),

  email: z.string().email({
    message: 'Please enter a valid email.',
  }),
  role: z.string().min(2, {
    message: 'Role must be at least 2 characters.',
  }),
  bio: z.string().min(10, {
    message: 'Bio must be at least 10 characters.',
  }),
  timezone: z.object({
    label: z.string(),
    value: z.string(),
  }),
  languages: z.array(
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
  toolkit: z.array(
    z.object({
      label: z.string(),
      value: z.string(),
    })
  ),
  twitterUrl: z.string().url({
    message: 'Please enter a valid url.',
  }),
  linkedinUrl: z.string().url({
    message: 'Please enter a valid url.',
  }),
});

export function ProfileForm() {
  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: '',
      firstname: '',
      lastname: '',
      email: '',
      role: '',
      languages: [],
      expertise: [],
      toolkit: [],
      twitterUrl: '',
      linkedinUrl: '',
    },
  });

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.

    const {
      username,
      firstname,
      lastname,
      email,
      role,
      bio,
      timezone,
      languages,
      expertise,
      toolkit,
      twitterUrl,
      linkedinUrl,
    } = values;

    try {
      console.log(values);
      const profile = await prismadb.profile.create({
        data: {
          username: 'emma567',
          firstname: 'Emma',
          lastname: 'Davis',
          email: 'emma5.davis@example.com',
          role: 'Marketing Specialist',
          bio: 'Expert in digital marketing and social media strategies.',
          timezone: { offset: '+0:00', region: 'Greenwich Mean Time' },
          languages: [{ language: 'English', fluency: 'native' }],
          expertise: [{ field: 'Digital Marketing', years: 6 }],
          toolkit: [{ tool: 'Google Analytics', level: 'expert' }],
          twitterUrl: 'https://twitter.com/emma567',
          linkedinUrl: 'https://linkedin.com/in/emma567',
        },
      });
      console.log(profile);
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
