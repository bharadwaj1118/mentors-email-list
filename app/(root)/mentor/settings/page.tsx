import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { User, Bell, Clock, LayoutList, Calendar } from "lucide-react";
import { getSelf, getSelfWithEvents } from "@/lib/actions/user.action";
import { redirect } from "next/navigation";
import Link from "next/link";

import AvailabilityForm from "./_components/availability-form";
import { DisplayForm } from "./_components/notification-form";
import SessionForm from "./_components/session-form";
import { CalandarForm } from "./_components/calandar-form";
import { AccountForm } from "./_components/account-form";
import { GoogleCalandarForm } from "./_components/google-calendar-form";

const SettingsPage = async () => {
  const user = await getSelfWithEvents();
  if (!user) return redirect("/login");

  return (
    <div className="mx-auto max-w-5xl">
      <section className="my-4 lg:my-8 p-3 border shadow rounded bg-background">
        <Tabs defaultValue="sessions" className="p-6">
          <TabsList>
            <TabsTrigger value="sessions" className="flex items-center">
              <Clock className="mr-1 h-4 w-4 text-blue-600" />
              <p className="hidden md:block">Sessions</p>
            </TabsTrigger>
            <TabsTrigger value="account" className="flex items-center">
              <User className="mr-1 h-4 w-4 text-blue-600" />
              <p className="hidden md:block">Account</p>
            </TabsTrigger>
            <TabsTrigger value="notifications" className="flex items-center">
              <Bell className="mr-1 h-4 w-4 text-blue-600" />
              <p className="hidden md:block">Notifications</p>
            </TabsTrigger>
            <TabsTrigger value="calandar" className="flex items-center">
              <Calendar className="mr-1 h-4 w-4 text-blue-600" />
              <p className="hidden md:block">Calendar Integration</p>
            </TabsTrigger>
          </TabsList>
          <TabsContent value="sessions">
            <SessionForm user={JSON.stringify(user)} />
          </TabsContent>
          <TabsContent value="account">
            <AccountForm user={JSON.stringify(user)} />
          </TabsContent>
          <TabsContent value="notifications">
            <DisplayForm />
          </TabsContent>
          <TabsContent value="calandar">
            <div className="my-4 lg:my-8 p-3 border shadow-sm rounded">
              <p className="large">Connecting with mentees</p>
              <p className="muted">
                You can connect with mentees using Zoom and Google meets
                <Link href="/" className="text-blue-400 underline">
                  (Learn more)
                </Link>
              </p>
            </div>

            <CalandarForm user={JSON.stringify(user)} />
            <GoogleCalandarForm user={JSON.stringify(user)} />
          </TabsContent>
        </Tabs>
      </section>
    </div>
  );
};

export default SettingsPage;
