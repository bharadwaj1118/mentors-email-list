"use client";

import { useEffect } from "react";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";

import { toast } from "sonner";
import Select from "react-select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
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

import { ROLES } from "@/constants/data";
import { updateUser } from "@/lib/actions/user.action";
import { useModal } from "@/hooks/use-modal-store";

const formSchema = z.object({
  position: z
    .object({
      label: z.string(),
      value: z.string(),
    })
    .refine((data) => data.value, {
      message: "Role is required.",
    }),
  organization: z.string().min(1, {
    message: "Company name is required.",
  }),
});

export const EditProfessionModal = () => {
  const { isOpen, onClose, type, data } = useModal();
  const router = useRouter();

  const isModalOpen = isOpen && type === "editProfession";
  const user = data?.user;
  console.log(user);

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      position: {
        label: user?.position || "",
        value: user?.position || "",
      },
      organization: user?.organization || "",
    },
  });

  useEffect(() => {
    if (user) {
      if (user?.organization !== undefined) {
        form.setValue("organization", user?.organization);
      }
      if (user?.position) {
        const position = {
          label: user.position,
          value: user.position,
        };
        form.setValue("position", position);
      }
    }
  }, [user, form]);

  const isLoading = form.formState.isSubmitting;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const id = user?.id;
      if (id) {
        const user = await updateUser({
          id,
          ...values,
          position: values.position.value,
        });
      }
      onClose();
      form.reset();
      router.refresh();
      if (user !== null) {
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
            Add Industry
          </DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <div className="space-y-4 px-6">
              <FormField
                control={form.control}
                name="organization"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="uppercase text-xs font-bold text-zinc-500 dark:text-secondary/70">
                      company name
                    </FormLabel>
                    <FormControl>
                      <Input
                        disabled={isLoading}
                        className="bg-zinc-300/50 border-0 focus-visible:ring-0 text-black focus-visible:ring-offset-0"
                        placeholder="Enter company name"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="position"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="uppercase text-xs font-bold text-zinc-500 dark:text-secondary/70">
                      Industry
                    </FormLabel>
                    <FormControl>
                      <Select {...field} isMulti={false} options={ROLES} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="w-full h-24"></div>
            <DialogFooter className="bg-gray-100 px-6 py-4">
              <Button disabled={isLoading}>Save</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
