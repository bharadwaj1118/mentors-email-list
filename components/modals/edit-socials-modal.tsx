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

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useParams, useRouter } from "next/navigation";
import { useModal } from "@/hooks/use-modal-store";
import Select from "react-select";
import { useEffect } from "react";
import { Textarea } from "../ui/textarea";

import { industryData } from "@/constants/data";
import { FileUpload } from "@/components/shared/file-upload";
import { updateUser } from "@/lib/actions/user.action";

const formSchema = z.object({
  linkedinProfile: z.string().min(1, {
    message: "LinkedIn Profile is required.",
  }),
  twitterProfile: z.string(),
  facebookProfile: z.string(),
  tiktokProfile: z.string(),
});

export const EditSocialsModal = () => {
  const { isOpen, onClose, type, data } = useModal();
  const router = useRouter();
  const params = useParams();

  const isModalOpen = isOpen && type === "editSocials";
  const user = data?.user;

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      linkedinProfile: user?.linkedinProfile || "",
      twitterProfile: user?.twitterProfile || "",
      facebookProfile: user?.facebookProfile || "",
      tiktokProfile: user?.tiktokProfile || "",
    },
  });

  useEffect(() => {
    if (user?.linkedinProfile !== undefined) {
      form.setValue("linkedinProfile", user?.linkedinProfile);
    }
    if (user?.twitterProfile !== undefined) {
      form.setValue("twitterProfile", user?.twitterProfile);
    }
    if (user?.facebookProfile !== undefined) {
      form.setValue("facebookProfile", user?.facebookProfile);
    }
    if (user?.tiktokProfile !== undefined) {
      form.setValue("tiktokProfile", user?.tiktokProfile);
    }
  }, [user, form]);

  const isLoading = form.formState.isSubmitting;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const id = user?.id;
      console.log("id", id);
      console.log("This is the id bro", id);
      const result = await updateUser({
        id,
        linkedinProfile: values.linkedinProfile,
        twitterProfile: values.twitterProfile,
        facebookProfile: values.facebookProfile,
        tiktokProfile: values.tiktokProfile,
      });

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

  if (!isModalOpen) return null;

  return (
    <Dialog open={isModalOpen} onOpenChange={handleClose}>
      <DialogContent className="bg-white text-black p-0 overflow-hidden">
        <DialogHeader className="pt-8 px-6">
          <DialogTitle className="text-2xl text-center font-bold">
            Socials
          </DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <div className="space-y-4 px-6">
              <FormField
                control={form.control}
                name="linkedinProfile"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="uppercase text-xs font-bold text-zinc-500 dark:text-secondary/70">
                      Linkedin url
                    </FormLabel>
                    <FormControl>
                      <Input
                        disabled={isLoading}
                        className="bg-zinc-300/50 border-0 focus-visible:ring-0 text-black focus-visible:ring-offset-0"
                        placeholder="Enter url..."
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="space-y-4 px-6">
              <FormField
                control={form.control}
                name="twitterProfile"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="uppercase text-xs font-bold text-zinc-500 dark:text-secondary/70">
                      Twitter url
                    </FormLabel>
                    <FormControl>
                      <Input
                        disabled={isLoading}
                        className="bg-zinc-300/50 border-0 focus-visible:ring-0 text-black focus-visible:ring-offset-0"
                        placeholder="Enter url..."
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="space-y-4 px-6">
              <FormField
                control={form.control}
                name="facebookProfile"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="uppercase text-xs font-bold text-zinc-500 dark:text-secondary/70">
                      facebook url
                    </FormLabel>
                    <FormControl>
                      <Input
                        disabled={isLoading}
                        className="bg-zinc-300/50 border-0 focus-visible:ring-0 text-black focus-visible:ring-offset-0"
                        placeholder="Enter url..."
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="space-y-4 px-6">
              <FormField
                control={form.control}
                name="tiktokProfile"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="uppercase text-xs font-bold text-zinc-500 dark:text-secondary/70">
                      tiktok url
                    </FormLabel>
                    <FormControl>
                      <Input
                        disabled={isLoading}
                        className="bg-zinc-300/50 border-0 focus-visible:ring-0 text-black focus-visible:ring-offset-0"
                        placeholder="Enter url..."
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <DialogFooter className="bg-gray-100 px-6 py-4">
              <Button disabled={isLoading}>Save</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
