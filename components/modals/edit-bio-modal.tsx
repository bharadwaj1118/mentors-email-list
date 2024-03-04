"use client";

import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useUser } from "@clerk/clerk-react";

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
  bio: z.string().min(1, {
    message: "Bio is required.",
  }),
});

export const EditBioModal = () => {
  const { isOpen, onClose, type, data } = useModal();
  const router = useRouter();
  const params = useParams();

  const isModalOpen = isOpen && type === "editBio";
  const user = data?.user;

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      bio: user?.bio || "",
    },
  });

  useEffect(() => {
    if (user?.bio !== undefined) {
      form.setValue("bio", user?.bio);
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
        bio: values.bio,
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

  return (
    <Dialog open={isModalOpen} onOpenChange={handleClose}>
      <DialogContent className="bg-white text-black p-0 overflow-hidden">
        <DialogHeader className="pt-8 px-6">
          <DialogTitle className="text-2xl text-center font-bold">
            Bio
          </DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <div className="space-y-4 px-6">
              <FormField
                control={form.control}
                name="bio"
                render={({ field }) => (
                  <FormItem>
                    {/* <FormLabel className="uppercase text-xs font-bold text-zinc-500 dark:text-secondary/70">
                      Bio
                    </FormLabel> */}
                    <FormControl>
                      <Textarea
                        disabled={isLoading}
                        className="bg-zinc-300/50 border-0 focus-visible:ring-0 text-black focus-visible:ring-offset-0 md:h-24"
                        placeholder="Enter bio"
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
