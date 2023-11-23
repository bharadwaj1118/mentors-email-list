'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Select, SelectItem, Selection } from '@nextui-org/react';
import * as z from 'zod';
import axios from 'axios';
import React, { useState } from 'react';

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
import { Separator } from '@/components/ui/separator';

import {
  TIMEZONES,
  LANGUAGES,
  TOOLS,
  EXPERTISE,
  INDUSTRIES,
} from '@/constants/data';

import { useToast } from '@/components/ui/use-toast';
import { Profile } from '@prisma/client';
import { useRouter } from 'next/navigation';

interface ProfileFormProps {
  initialData: Profile | null;
}

const profileFormSchema = z.object({
  username: z
    .string()
    .min(2, {
      message: 'Username must be at least 2 characters.',
    })
    .max(30, {
      message: 'Username must not be longer than 30 characters.',
    }),
  currentrole: z
    .string()
    .min(2, {
      message: 'Role must be at least 2 characters.',
    })
    .max(30, {
      message: 'Role must not be longer than 30 characters.',
    }),
  email: z
    .string({
      required_error: 'Please select an email to display.',
    })
    .email(),
  bio: z.string().max(160).min(4),
  timezone: z.string().min(1, 'Choose one timezone'),
  languages: z.string().min(1, 'Choose one language'),
  tools: z.string().min(1, 'Choose one Tool'),
  expertise: z.string().min(1, 'Choose one expertise'),
  industries: z.string().min(1, 'Choose one industry'),
  twitterUrl: z.string(),
  linkedinUrl: z.string(),
});

type ProfileFormValues = z.infer<typeof profileFormSchema>;

// This can come from your database or API.
const defaultValues: Partial<ProfileFormValues> = {
  //   bio: 'I own a computer.',
  //   urls: [
  //     { value: 'https://shadcn.com' },
  //     { value: 'http://twitter.com/shadcn' },
  //   ],
};

export function ProfileForm({ initialData }: ProfileFormProps) {
  const { toast } = useToast();
  const router = useRouter();

  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileFormSchema),
    defaultValues: {
      username: initialData?.username || '',
      currentrole: initialData?.currentrole || '',
      email: initialData?.email || '',
      bio: initialData?.bio || '',
      timezone: initialData?.timezone || '',
      languages: initialData?.languages || '',
      tools: initialData?.tools || '',
      expertise: initialData?.expertise || '',
      industries: initialData?.industries || '',
      twitterUrl: initialData?.twitterUrl || '',
      linkedinUrl: initialData?.linkedinUrl || '',
    },
    mode: 'onChange',
  });

  const onSubmit = async (values: ProfileFormValues) => {
    console.log(values);
    try {
      if (initialData) {
        await axios.patch(`/api/profile/${initialData.id}`, values);
      } else {
        await axios.post('/api/profile', values);
      }

      toast({
        description: 'Success.',
        duration: 3000,
      });

      router.refresh();
      router.push('/');
    } catch (error) {
      toast({
        variant: 'destructive',
        description: 'Something went wrong.',
        duration: 3000,
      });
    }
  };

  const defaultValues = form.watch();
  const [tools, setTools] = React.useState<Selection>(
    new Set(defaultValues.tools == '' ? [] : defaultValues.tools.split(','))
  );
  const [expertise, setExpertise] = React.useState<Selection>(
    new Set(
      defaultValues.expertise == '' ? [] : defaultValues.expertise.split(',')
    )
  );
  const [industries, setIndustries] = React.useState<Selection>(
    new Set(
      defaultValues.industries == '' ? [] : defaultValues.industries.split(',')
    )
  );
  const [languages, setLanguages] = React.useState<Selection>(
    new Set(
      defaultValues.languages == '' ? [] : defaultValues.languages.split(',')
    )
  );
  const [timezone, setTimezone] = React.useState<Selection>(
    new Set(
      defaultValues.timezone == '' ? [] : defaultValues.timezone.split(',')
    )
  );

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <div className="space-y-2 w-full col-span-2">
          <div>
            <h3 className="text-lg font-medium">General Information</h3>
            <p className="text-sm text-muted-foreground">
              General information about your Companion
            </p>
          </div>
          <Separator className="bg-primary/10" />
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
            name="currentrole"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Current Role</FormLabel>
                <FormControl>
                  <Input placeholder="Marketing Manager" {...field} />
                </FormControl>
                <FormDescription>This is your current role.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="grid max-md:space-y-3 md:grid-cols-2 md:gap-6">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>User email</FormLabel>
                <FormControl>
                  <Input placeholder="Marketing Manager" {...field} />
                </FormControl>
                <FormDescription>Please enter your email.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="timezone"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Time Zone</FormLabel>
                <FormControl>
                  <div className="flex w-full max-w-xs flex-col gap-2 ">
                    <Select
                      size="sm"
                      placeholder="Select timezone"
                      selectedKeys={timezone}
                      onSelectionChange={setTimezone}
                      {...field}
                    >
                      {TIMEZONES.map((timezone) => (
                        <SelectItem key={timezone.value} value={timezone.value}>
                          {timezone.label}
                        </SelectItem>
                      ))}
                    </Select>
                  </div>
                </FormControl>
                <FormDescription>Please choose your timezone.</FormDescription>
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
              <FormLabel>Bio</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Tell us a little bit about yourself"
                  className="resize-none"
                  {...field}
                />
              </FormControl>
              <FormDescription>
                Please mention about yourself in 200 words.
              </FormDescription>
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
                  <div className="flex w-full max-w-xs flex-col gap-2">
                    <Select
                      size="sm"
                      selectionMode="multiple"
                      placeholder="Select an Language"
                      selectedKeys={languages}
                      className="max-w-xs"
                      onSelectionChange={setLanguages}
                      {...field}
                    >
                      {LANGUAGES.map((language) => (
                        <SelectItem key={language.value} value={language.value}>
                          {language.label}
                        </SelectItem>
                      ))}
                    </Select>
                  </div>
                </FormControl>
                <FormDescription>Please choose the language</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="expertise"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Expertise</FormLabel>
                <FormControl>
                  <div className="flex w-full max-w-xs flex-col gap-2">
                    <Select
                      size="sm"
                      selectionMode="multiple"
                      placeholder="Select an expertise"
                      selectedKeys={expertise}
                      className="max-w-xs"
                      onSelectionChange={setExpertise}
                      {...field}
                    >
                      {EXPERTISE.map((expert) => (
                        <SelectItem key={expert.value} value={expert.value}>
                          {expert.label}
                        </SelectItem>
                      ))}
                    </Select>
                  </div>
                </FormControl>
                <FormDescription>Please choose your expertise</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="grid max-md:space-y-3 md:grid-cols-2 md:gap-6">
          <FormField
            control={form.control}
            name="tools"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Tools</FormLabel>
                <FormControl>
                  <div className="flex w-full max-w-xs flex-col gap-2">
                    <Select
                      size="sm"
                      selectionMode="multiple"
                      placeholder="Select a tool"
                      selectedKeys={tools}
                      className="max-w-xs"
                      onSelectionChange={setTools}
                      {...field}
                    >
                      {TOOLS.map((tool) => (
                        <SelectItem key={tool.value} value={tool.value}>
                          {tool.label}
                        </SelectItem>
                      ))}
                    </Select>
                  </div>
                </FormControl>
                <FormDescription>Please choose the Tools</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="industries"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Industries:</FormLabel>
                <FormControl>
                  <div className="flex w-full max-w-xs flex-col gap-2">
                    <Select
                      size="sm"
                      selectionMode="multiple"
                      placeholder="Select an industry"
                      selectedKeys={industries}
                      className="max-w-xs"
                      onSelectionChange={setIndustries}
                      {...field}
                    >
                      {INDUSTRIES.map((industry) => (
                        <SelectItem key={industry.value} value={industry.value}>
                          {industry.label}
                        </SelectItem>
                      ))}
                    </Select>
                  </div>
                </FormControl>
                <FormDescription>Please choose your industries</FormDescription>
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
                <FormLabel>Twitter</FormLabel>
                <FormControl>
                  <Input placeholder="http://twitter.com/user" {...field} />
                </FormControl>
                <FormDescription>This is your Twitter URL.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="linkedinUrl"
            render={({ field }) => (
              <FormItem>
                <FormLabel>LinkedIn</FormLabel>
                <FormControl>
                  <Input placeholder="http://linkedin.com/user" {...field} />
                </FormControl>
                <FormDescription>This is your LinkedIn URL.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <Button type="submit" className="px-4 py-3" size="lg">
          CREATE PROFILE
        </Button>
      </form>
    </Form>
  );
}
