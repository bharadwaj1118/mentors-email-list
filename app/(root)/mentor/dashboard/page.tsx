import React from "react";
import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";

import { db } from "@/lib/db";

import { DashboardFeedbackForm } from "./_components/dashboard-feedback-form";
import DashBoardProfileCard from "./_components/dashboard-profile-card";
import DashBoardProfileViews from "./_components/dashboard-profile-views";
import DashBoardSessionCount from "./_components/dashbord-session-count";
import DashBoardUsersBooked from "./_components/dashboard-users-booked";
import DashboardSessionsUpcoming from "./_components/dashboard-sessions-upcoming";
import DashboardSessionsRequest from "./_components/dashboard-sessions-request";

type MentorDashboardPageProps = {
  id: string;
  imageUrl: string;
  username: string;
};

const MentorDashboardPage = async () => {
  const { userId } = auth();
  if (!userId) {
    redirect("/login");
  }

  const user = await db.user.findUnique({
    where: {
      clerkId: userId,
    },
    select: {
      id: true,
      imageUrl: true,
      username: true,
    },
  });

  if (!user) return null;

  const { id, imageUrl, username } = user;

  return (
    <div className="max-w-5xl mx-auto pt-[80px] p-3">
      {/* Page Title */}
      <div className="w-full flex flex-col lg:flex-row gap-4">
        {/* Welcome Back and Details*/}
        <section className="w-full mt-4 p-3 border shadow rounded-lg bg-background md:pl-6 col-start-1 col-span-2">
          <h1 className="text-2xl font-semibold">Welcome back {username}!</h1>
          <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-4 my-4 md:px-4">
            <DashBoardProfileViews userId={id} />
            <DashBoardUsersBooked userId={id} />
            <DashBoardSessionCount userId={id} />
          </div>
        </section>

        {/* Profile and Details */}
        <div className="col-span-1">
          <DashBoardProfileCard
            userId={id}
            userImage={imageUrl}
            userName={username}
            rating={4.51}
            sessions={345}
            reviews={342}
          />
        </div>
      </div>

      {/* Sessions Request */}
      <DashboardSessionsRequest userId={id} />
      <DashboardSessionsUpcoming userId={id} />

      {/* Feedback Form */}
      <div className="w-full col-span-3">
        <DashboardFeedbackForm userId={id} />
      </div>
    </div>
  );
};

export default MentorDashboardPage;
