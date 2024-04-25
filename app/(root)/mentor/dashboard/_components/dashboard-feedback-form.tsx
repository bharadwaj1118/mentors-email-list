"use client";

import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";

import { updateUser } from "@/lib/actions/user.action";
import { Textarea } from "@/components/ui/textarea";

interface DashboardFeedbackFormProps {
  userId: string;
}

const formSchema = z.object({
  featureRequest: z.string().min(10, "Must be at least 10 characters"),
});

export const DashboardFeedbackForm = ({
  userId,
}: DashboardFeedbackFormProps) => {
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      featureRequest: "",
    },
  });

  const { isSubmitting, isValid } = form.formState;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      // TODO: Change the Relavant Method
      await updateUser({ ...values, id: userId });
      toast.success("Price updated");
      router.refresh();
    } catch {
      toast.error("Something went wrong");
    }
  };

  return (
    <div className="my-4 lg:my-8 p-3 border shadow rounded-lg bg-background">
      <div className="font-medium flex items-center justify-between">
        <p className="large">
          What else would you like to see in your dashboard?
        </p>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 mt-4">
          <FormField
            control={form.control}
            name="featureRequest"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Textarea
                    disabled={isSubmitting}
                    placeholder="Type your feedback here..."
                    {...field}
                    className="h-[150px] md:h-[100px]"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex items-center gap-x-2">
            <Button disabled={!isValid || isSubmitting} type="submit">
              Submit
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};
