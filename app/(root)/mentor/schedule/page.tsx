import { db } from "@/lib/db";
import { MyCalendar } from "./_components/mentor-calendar";
import React from "react";
import { getSelf } from "@/lib/actions/user.action";
import { redirect } from "next/navigation";
import { Role } from "@prisma/client";

const SchedulePage = async () => {
  const currUser = await getSelf();
  if (!currUser) return <div>Not logged in</div>;

  const user = await db.user.findUnique({
    where: {
      id: currUser.id,
    },
    include: {
      events: true,
    },
  });

  //TODO: Add access error
  if (!user) {
    return <div>You cannot access this page!</div>;
  }

  // Redirect if the user is not MENTOR
  if (user.role !== Role.MENTOR) {
    redirect("/dashboard/search");
  }

  redirect("/mentor/schedule/" + user.id);

  return (
    <div className="flex justify-center items-center h-screen mt-[80px]">
      <MyCalendar user={JSON.stringify(user)} />
    </div>
  );
};

export default SchedulePage;
