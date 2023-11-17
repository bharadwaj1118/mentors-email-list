'use client';

import Link from 'next/link';
import { zodResolver } from '@hookform/resolvers/zod';
import { useFieldArray, useForm } from 'react-hook-form';
import * as z from 'zod';

import { cn } from '@/lib/utils';
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
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { toast } from '@/components/ui/use-toast';

const languages = [
  { label: 'English', value: 'en' },
  { label: 'French', value: 'fr' },
  { label: 'German', value: 'de' },
  { label: 'Spanish', value: 'es' },
  { label: 'Portuguese', value: 'pt' },
  { label: 'Russian', value: 'ru' },
  { label: 'Japanese', value: 'ja' },
  { label: 'Korean', value: 'ko' },
  { label: 'Chinese', value: 'zh' },
] as const;

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
  language: z.string({
    required_error: 'Please select a language.',
  }),
  toolkit: z.string({
    required_error: 'Please select toolkit',
  }),
  industries: z.string({
    required_error: 'Please select industries',
  }),
  expertise: z.string({
    required_error: 'Please select industries',
  }),
  timezone: z.string({
    required_error: 'Please select timezone',
  }),
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

export function ProfileForm() {
  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileFormSchema),
    defaultValues,
    mode: 'onChange',
  });

  async function onSubmit(values: ProfileFormValues) {
    console.log(values);
    console.log('The click works');
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
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
                <FormLabel>TimeZone</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="select a Timezone" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>North America</SelectLabel>
                      <SelectItem value="est">
                        Eastern Standard Time (EST)
                      </SelectItem>
                      <SelectItem value="cst">
                        Central Standard Time (CST)
                      </SelectItem>
                      <SelectItem value="mst">
                        Mountain Standard Time (MST)
                      </SelectItem>
                      <SelectItem value="pst">
                        Pacific Standard Time (PST)
                      </SelectItem>
                      <SelectItem value="akst">
                        Alaska Standard Time (AKST)
                      </SelectItem>
                      <SelectItem value="hst">
                        Hawaii Standard Time (HST)
                      </SelectItem>
                    </SelectGroup>
                    <SelectGroup>
                      <SelectLabel>Europe & Africa</SelectLabel>
                      <SelectItem value="gmt">
                        Greenwich Mean Time (GMT)
                      </SelectItem>
                      <SelectItem value="cet">
                        Central European Time (CET)
                      </SelectItem>
                      <SelectItem value="eet">
                        Eastern European Time (EET)
                      </SelectItem>
                      <SelectItem value="west">
                        Western European Summer Time (WEST)
                      </SelectItem>
                      <SelectItem value="cat">
                        Central Africa Time (CAT)
                      </SelectItem>
                      <SelectItem value="eat">
                        East Africa Time (EAT)
                      </SelectItem>
                    </SelectGroup>
                    <SelectGroup>
                      <SelectLabel>Asia</SelectLabel>
                      <SelectItem value="msk">Moscow Time (MSK)</SelectItem>
                      <SelectItem value="ist">
                        India Standard Time (IST)
                      </SelectItem>
                      <SelectItem value="cst_china">
                        China Standard Time (CST)
                      </SelectItem>
                      <SelectItem value="jst">
                        Japan Standard Time (JST)
                      </SelectItem>
                      <SelectItem value="kst">
                        Korea Standard Time (KST)
                      </SelectItem>
                      <SelectItem value="ist_indonesia">
                        Indonesia Central Standard Time (WITA)
                      </SelectItem>
                    </SelectGroup>
                    <SelectGroup>
                      <SelectLabel>Australia & Pacific</SelectLabel>
                      <SelectItem value="awst">
                        Australian Western Standard Time (AWST)
                      </SelectItem>
                      <SelectItem value="acst">
                        Australian Central Standard Time (ACST)
                      </SelectItem>
                      <SelectItem value="aest">
                        Australian Eastern Standard Time (AEST)
                      </SelectItem>
                      <SelectItem value="nzst">
                        New Zealand Standard Time (NZST)
                      </SelectItem>
                      <SelectItem value="fjt">Fiji Time (FJT)</SelectItem>
                    </SelectGroup>
                    <SelectGroup>
                      <SelectLabel>South America</SelectLabel>
                      <SelectItem value="art">Argentina Time (ART)</SelectItem>
                      <SelectItem value="bot">Bolivia Time (BOT)</SelectItem>
                      <SelectItem value="brt">Brasilia Time (BRT)</SelectItem>
                      <SelectItem value="clt">
                        Chile Standard Time (CLT)
                      </SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
                <FormDescription>
                  You can manage email addresses in your{' '}
                </FormDescription>
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

        <div className="grid max-md:space-y-3 md:grid-cols-2 md:gap-2">
          <FormField
            control={form.control}
            name="language"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Languages</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Selact a language" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="ENGLISH">English</SelectItem>
                    <SelectItem value="GERMAN">German</SelectItem>
                    <SelectItem value="SPANISH">Spanish</SelectItem>
                    <SelectItem value="FRENCH">French</SelectItem>
                    <SelectItem value="ITALIAN">Italian</SelectItem>
                  </SelectContent>
                </Select>
                <FormDescription>Please pick a Language</FormDescription>
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
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select your expertise" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="ENGLISH">English</SelectItem>
                    <SelectItem value="GERMAN">German</SelectItem>
                    <SelectItem value="SPANISH">Spanish</SelectItem>
                    <SelectItem value="FRENCH">French</SelectItem>
                    <SelectItem value="ITALIAN">Italian</SelectItem>
                  </SelectContent>
                </Select>
                <FormDescription>Please pick your expertise</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="grid max-md:space-y-3 md:grid-cols-2 md:gap-6">
          <FormField
            control={form.control}
            name="toolkit"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Toolkit</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a language" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="ENGLISH">English</SelectItem>
                    <SelectItem value="GERMAN">German</SelectItem>
                    <SelectItem value="SPANISH">Spanish</SelectItem>
                    <SelectItem value="FRENCH">French</SelectItem>
                    <SelectItem value="ITALIAN">Italian</SelectItem>
                  </SelectContent>
                </Select>
                <FormDescription>Please pick Toolkit</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="industries"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Industries</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Selact a language" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="ENGLISH">English</SelectItem>
                    <SelectItem value="GERMAN">German</SelectItem>
                    <SelectItem value="SPANISH">Spanish</SelectItem>
                    <SelectItem value="FRENCH">French</SelectItem>
                    <SelectItem value="ITALIAN">Italian</SelectItem>
                  </SelectContent>
                </Select>
                <FormDescription>Please pick industries</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <Button type="submit">Update profile</Button>
      </form>
    </Form>
  );
}
