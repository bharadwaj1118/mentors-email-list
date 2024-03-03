"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

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
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { ROLES, industryData } from "@/constants/data";
import Select from "react-select";

import { useRouter } from "next/navigation";
import { saveUserCompanyAndRoleById } from "@/lib/actions/user.action";

const rangeOptions = [
  { label: "Solo", value: "Solo" },
  { label: "2-5", value: "2-5" },
  { label: "6-20", value: "6-20" },
  { label: "21-50", value: "21-50" },
  { label: "50+", value: "50+" },
];

const FormSchema = z.object({
  company: z.string().min(2, {
    message: "Please enter company name",
  }),
  companySize: z.string().min(2, {
    message: "Please select an option.",
  }),
  role: z.object({
    label: z.string(),
    value: z.string(),
  }),
  linkedinProfile: z.string().url({
    message: "Please enter a valid URL.",
  }),
});

interface Props {
  user: string;
}

export function OnboardStepTwoForm({ user }: Props) {
  const router = useRouter();

  const { id, organization, companySize, position, portfolioWebsite } =
    JSON.parse(user);

  // convert the indutries to match the select input
  let initialRole = {};
  if (position !== null) {
    initialRole = { label: position, value: position };
  }

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      company: organization || "",
      companySize: companySize || "",
      role: initialRole || {},
      linkedinProfile: portfolioWebsite || "",
    },
  });

  function onSubmit(data: z.infer<typeof FormSchema>) {
    saveUserCompanyAndRoleById({
      userId: id,
      company: data.company,
      companySize: data.companySize,
      currentRole: data.role.value,
      linkedinProfile: data.linkedinProfile,
    });
    router.push("/onboard/3");
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="company"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Company</FormLabel>
              <FormControl>
                <Input placeholder="" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="companySize"
          render={({ field }) => (
            <FormItem className="space-y-3">
              <FormLabel>How big is your company?</FormLabel>
              <FormControl>
                <RadioGroup
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  className="flex flex-row gap-4 flex-wrap "
                >
                  {rangeOptions.map((option) => (
                    <FormItem
                      key={option.value}
                      className="flex items-center space-x-1 space-y-0"
                    >
                      <FormControl>
                        <RadioGroupItem value={option.value} />
                      </FormControl>
                      <FormLabel className="font-normal">
                        {option.label}
                      </FormLabel>
                    </FormItem>
                  ))}
                </RadioGroup>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="role"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Your current role</FormLabel>
              <FormControl>
                <Select {...field} isMulti={false} options={ROLES} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="linkedinProfile"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Linkedin profile</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex items-start justify-end">
          <Button type="submit" className="rounded-full">
            Submit
          </Button>
        </div>
      </form>
    </Form>
  );
}
