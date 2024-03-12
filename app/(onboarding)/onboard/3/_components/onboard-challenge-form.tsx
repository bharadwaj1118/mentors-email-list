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
import { Textarea } from "@/components/ui/textarea";
import { useRouter } from "next/navigation";
import { saveUserChallengeById } from "@/lib/actions/user.action";

const FormSchema = z.object({
  challenge: z.string().min(20, {
    message: "Please enter text in a detailed manner",
  }),
});

interface RecommendedByFormProps {
  userId: string;
  challenge: string;
}

export function OnboardChallengeForm({
  userId,
  challenge,
}: RecommendedByFormProps) {
  const router = useRouter();
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      challenge,
    },
  });

  function onSubmit(data: z.infer<typeof FormSchema>) {
    saveUserChallengeById({
      userId,
      challenge: data.challenge,
    });

    router.refresh();
    router.push("/onboard/4");
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="challenge"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                What industries do you have experience working in?
              </FormLabel>
              <FormControl>
                <Textarea
                  {...field}
                  className="h-32"
                  placeholder="ex. I am struggling to find market to priortize what channels to focus on."
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex items-start justify-end">
          <Button type="submit" className="rounded-full">
            Next
          </Button>
        </div>
      </form>
    </Form>
  );
}
