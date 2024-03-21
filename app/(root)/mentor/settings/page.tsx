import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { User, Bell, Video, LayoutList, Calendar } from "lucide-react";
import { getSelf, getSelfWithEvents } from "@/lib/actions/user.action";
import { redirect } from "next/navigation";

import AvailabilityForm from "./_components/availability-form";
import { DisplayForm } from "./_components/notification-form";
import SessionForm from "./_components/session-form";
import { CalandarForm } from "./_components/calandar-form";
import { AccountForm } from "./_components/account-form";
import { db } from "@/lib/db";
import Heading from "@/components/shared/heading";

const SettingsPage = async () => {
  const user = await getSelfWithEvents();
  if (!user) return redirect("/login");

  return (
    <div className="mx-auto max-w-5xl">
      <div className="my-4 lg:my-8 p-3 border shadow rounded bg-background md:pl-6">
        <Heading
          title="Your Sessions"
          description="Manage your sessions"
          imageUrl="/assets/session_tab.svg"
        />
      </div>
      <section className="my-4 lg:my-8 p-3 border shadow rounded bg-background">
        <Tabs defaultValue="availablity" className="p-6">
          <TabsList>
            <TabsTrigger value="sessions" className="flex items-center">
              <Calendar className="mr-1 h-4 w-4 text-blue-600" />
              <p>Sessions</p>
            </TabsTrigger>
            <TabsTrigger value="availablity" className="flex items-center">
              <Calendar className="mr-1 h-4 w-4 text-blue-600" />
              <p>Availability</p>
            </TabsTrigger>
            <TabsTrigger value="account" className="flex items-center">
              <User className="mr-1 h-4 w-4 text-blue-600" />
              <p>Account</p>
            </TabsTrigger>
            <TabsTrigger value="notifications" className="flex items-center">
              <Bell className="mr-1 h-4 w-4 text-blue-600" />
              <p>Notifications</p>
            </TabsTrigger>
            <TabsTrigger value="calandar" className="flex items-center">
              <Calendar className="mr-1 h-4 w-4 text-blue-600" />
              <p>Calendar Integration</p>
            </TabsTrigger>
          </TabsList>
          <TabsContent value="sessions">
            <SessionForm user={JSON.stringify(user)} />
          </TabsContent>
          <TabsContent value="availablity">
            <AvailabilityForm user={JSON.stringify(user)} />
          </TabsContent>
          <TabsContent value="account">
            <AccountForm user={JSON.stringify(user)} />
          </TabsContent>
          <TabsContent value="notifications">
            <DisplayForm />
          </TabsContent>
          <TabsContent value="calandar">
            <CalandarForm user={JSON.stringify(user)} />
          </TabsContent>
        </Tabs>
      </section>
    </div>
  );
};

export default SettingsPage;
