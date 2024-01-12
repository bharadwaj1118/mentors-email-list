import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { User, Bell } from "lucide-react";
import { getSelf } from "@/lib/actions/user.action";
import { redirect } from "next/navigation";
import { ProfileBasicForm } from "./_components/profile-basic-form";
import { InputForm } from "./_components/profile-communication-form";

const ProfilePage = async () => {
  const user = await getSelf();
  if (!user) return redirect("/login");

  return (
    <div className="mx-auto mt-6 max-w-5xl">
      <section className=" w-full bg-white">
        <Tabs defaultValue="basic" className="p-6">
          <TabsList>
            <TabsTrigger value="basic" className="flex items-center">
              <User className="mr-1 h-4 w-4 text-gray-700" />
              <p>Basic</p>
            </TabsTrigger>
            <TabsTrigger value="communication" className="flex items-center">
              <Bell className="mr-1 h-4 w-4 text-gray-700" />
              <p>Communication</p>
            </TabsTrigger>
          </TabsList>
          <TabsContent value="basic">
            <ProfileBasicForm />
          </TabsContent>
          <TabsContent value="communication">
            <InputForm />
          </TabsContent>
        </Tabs>
      </section>
    </div>
  );
};

export default ProfilePage;
