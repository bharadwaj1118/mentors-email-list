import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { User, Bell, Video, LayoutList, Calendar } from "lucide-react";
import { getSelf } from "@/lib/actions/user.action";
import { redirect } from "next/navigation";

import AvailabilityForm from "./_components/availability-form";
import { NotificationForm } from "./_components/notification-form";
import SessionForm from "./_components/session-form";
import CalandarForm from "./_components/calandar-form";
import AccountForm from "./_components/account-form";

const SettingsPage = async () => {
  const user = await getSelf();
  if (!user) return redirect("/login");

  return (
    <div className="mx-auto mt-6 max-w-5xl">
      <section className=" w-full bg-white">
        <Tabs defaultValue="sessions" className="p-6">
          <TabsList>
            <TabsTrigger value="account" className="flex items-center">
              <User className="mr-1 h-4 w-4 text-gray-700" />
              <p>Account</p>
            </TabsTrigger>
            <TabsTrigger value="notifications" className="flex items-center">
              <Bell className="mr-1 h-4 w-4 text-gray-700" />
              <p>Notifications</p>
            </TabsTrigger>
            <TabsTrigger value="calandar" className="flex items-center">
              <Calendar className="mr-1 h-4 w-4 text-gray-700" />
              <p>Calendar Integration</p>
            </TabsTrigger>
          </TabsList>
          <TabsContent value="account">
            <AccountForm />
          </TabsContent>
          <TabsContent value="notifications">
            <NotificationForm />
          </TabsContent>
          <TabsContent value="calandar">
            <CalandarForm />
          </TabsContent>
        </Tabs>
      </section>
    </div>
  );
};

export default SettingsPage;
