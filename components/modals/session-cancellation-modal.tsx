"use client";

import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { useParams, useRouter } from "next/navigation";
import { useModal } from "@/hooks/use-modal-store";
import { useEffect } from "react";
import { Textarea } from "../ui/textarea";

import { updateUser } from "@/lib/actions/user.action";

const formSchema = z.object({
  reason: z.string().min(1, {
    message: "Bio is required.",
  }),
});

export const SessionCancelModal = () => {
  const { isOpen, onClose, type, data } = useModal();
  const router = useRouter();
  const params = useParams();

  const isModalOpen = isOpen && type === "sessionCancel";
  const user = data?.user;

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      reason: "",
    },
  });

  const isLoading = form.formState.isSubmitting;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const id = user?.id;
      console.log("id", id);
      console.log("This is the id bro", id);
      //   const result = await updateUser({
      //     id,
      //     reason: values.reason,
      //   });
      const result = "";

      onClose();
      form.reset();
      router.refresh();

      if (result) {
        toast.success("Updated successfully");
      } else {
        toast.error("Failed to update");
      }
    } catch (error) {
      console.log(error);
      toast.error("Failed to update");
    }
  };

  const handleClose = () => {
    form.reset();
    onClose();
  };

  return (
    <Dialog open={isModalOpen} onOpenChange={handleClose}>
      <DialogContent className="bg-white text-black p-0 overflow-hidden">
        <DialogHeader className="pt-8 px-6">
          <DialogTitle className="text-2xl text-center font-bold">
            Reason for cancellation
          </DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <div className="space-y-4 px-6">
              <FormField
                control={form.control}
                name="reason"
                render={({ field }) => (
                  <FormItem>
                    {/* <FormLabel className="uppercase text-xs font-bold text-zinc-500 dark:text-secondary/70">
                      Bio
                    </FormLabel> */}
                    <FormControl>
                      <Textarea
                        disabled={isLoading}
                        className="bg-zinc-300/50 border-0 focus-visible:ring-0 text-black focus-visible:ring-offset-0 md:h-24"
                        placeholder="Enter reason"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <DialogFooter className="bg-gray-100 px-6 py-4">
              <Button disabled={isLoading}>Submit</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
