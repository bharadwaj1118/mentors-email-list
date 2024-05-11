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
import { Button } from "@/components/ui/button";
import { useParams, useRouter } from "next/navigation";
import { useModal } from "@/hooks/use-modal-store";
import Select from "react-select";
import { Textarea } from "../ui/textarea";
import { toast } from "sonner";

import { TOOLS } from "@/constants/data";
import { FileUpload } from "@/components/shared/file-upload";
import { addTool } from "@/lib/actions/tool.action";

const formSchema = z.object({
  name: z
    .object({
      label: z.string(),
      value: z.string(),
    })
    .refine((data) => data.value, {
      message: "Tool is required.",
    }),
  description: z.string().min(1, {
    message: "Description is required.",
  }),
  imageUrl: z.string().min(1, {
    message: "Upload Logo",
  }),
});

export const AddToolModal = () => {
  const { isOpen, onClose, type, data } = useModal();
  const { isLoaded, user } = useUser();
  const router = useRouter();
  const params = useParams();

  const isModalOpen = isOpen && type === "addTool";

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: {
        label: "",
        value: "",
      },
      description: "",
      imageUrl: "",
    },
  });

  const isLoading = form.formState.isSubmitting;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const tool = await addTool({
        ...values,
        userId: user?.id as string,
        name: values.name.value,
      });
      form.reset();
      router.refresh();
      onClose();

      if (tool !== null) {
        toast.success("Added successfully");
      } else {
        toast.success("Failed to add");
      }
    } catch (error) {
      console.log(error);
      toast.success("Failed to add");
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
            Add Tool
          </DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <div className="space-y-4 px-6">
              <div className="flex items-center justify-center text-center">
                <FormField
                  control={form.control}
                  name="imageUrl"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="uppercase text-xs font-bold text-zinc-500 dark:text-secondary/70">
                        Add Logo
                      </FormLabel>
                      <FormControl>
                        <FileUpload
                          endpoint="serverImage"
                          value={field.value}
                          onChange={field.onChange}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="uppercase text-xs font-bold text-zinc-500 dark:text-secondary/70">
                      Tool
                    </FormLabel>
                    <FormControl>
                      <Select {...field} isMulti={false} options={TOOLS} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="uppercase text-xs font-bold text-zinc-500 dark:text-secondary/70">
                      Description
                    </FormLabel>
                    <FormControl>
                      <Textarea
                        disabled={isLoading}
                        className="bg-zinc-300/50 border-0 focus-visible:ring-0 text-black focus-visible:ring-offset-0 md:h-24"
                        placeholder="Enter description"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <DialogFooter className="bg-gray-100 px-6 py-4">
              <Button disabled={isLoading}>Add</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
