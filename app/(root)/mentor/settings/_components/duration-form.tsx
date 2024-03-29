"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { ChevronDownIcon } from "@radix-ui/react-icons";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { useRouter } from "next/navigation";

import { cn } from "@/lib/utils";
import { Button, buttonVariants } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { toast } from "sonner";

import { updateUser } from "@/lib/actions/user.action";
import router from "next/router";

const appearanceFormSchema = z.object({
  duration: z.enum(["15", "30", "45", "60"], {
    invalid_type_error: "Select a duration",
    required_error: "Please select a duration.",
  }),
});

type AppearanceFormValues = z.infer<typeof appearanceFormSchema>;

interface AppearanceFormProps {
  user: string;
}

export function AppearanceForm({ user }: AppearanceFormProps) {
  const router = useRouter();

  const parsedUser = JSON.parse(user);
  const { duration: initialDuration } = parsedUser;
  const form = useForm<AppearanceFormValues>({
    resolver: zodResolver(appearanceFormSchema),
    defaultValues: {
      duration: initialDuration || "30",
    },
  });

  const { isSubmitting, isValid, isDirty } = form.formState;

  async function onSubmit(data: AppearanceFormValues) {
    await updateUser({ ...data, id: parsedUser.id });
    console.log(data);
    toast.success("Preferences updated");
    router.refresh();
  }

  return (
    <div className="mt-6 border bg-slate-100 rounded-md p-4">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="duration"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Duration</FormLabel>
                <div className="relative w-max">
                  <FormControl>
                    <select
                      className={cn(
                        buttonVariants({ variant: "outline" }),
                        "w-[200px] appearance-none bg-transparent font-normal"
                      )}
                      {...field}
                    >
                      <option value="15">15 Minutes</option>
                      <option value="30">30 Minutes</option>
                      <option value="45">45 Minutes</option>
                      <option value="60">60 Minutes</option>
                    </select>
                  </FormControl>
                  <ChevronDownIcon className="absolute right-3 top-2.5 h-4 w-4 opacity-50" />
                </div>
                <FormDescription>
                  Select the duration of your sessions you want to avaiable for.
                  The price is calculated based on the hourly rate.{" "}
                  <span className="text-blue-500">Learn more</span>
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit" disabled={!isValid || isSubmitting || !isDirty}>
            Update Duration
          </Button>
        </form>
      </Form>
    </div>
  );
}
