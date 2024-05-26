import React from "react";
import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";

import { db } from "@/lib/db";
import { OnboardChallengeForm } from "./_components/onboard-challenge-form";
import OnboardHeading from "../_components/onboard-heading";
import AlertComponent from "@/components/shared/AlertComponent";

const OnboardChallengePage = async () => {
  const { userId } = auth();
  if (!userId) {
    redirect("/sign-in");
  }

  const user = await db.user.findUnique({
    where: {
      clerkId: userId,
    },
    select: {
      id: true,
      timeZone: true,
      meetingPreference: true,
    },
  });

  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-white bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.3),rgba(255,255,255,0))]">
      <div className="form-container pt-10">
        <div className="card-block space-y-4 !pb-12">
          <OnboardHeading
            step={3}
            title="Your #1 growth challenge right now?"
            imageUrl="/assets/undraw_programming.svg"
          />

          <OnboardChallengeForm
            userId={user.id}
            timeZone={user?.timeZone || ""}
            meetingPreference={user?.meetingPreference || ""}
          />

          <AlertComponent
            title="Why are we asking this?"
            description="This information helps us match you with the most relavant mentors."
            name="Info"
          />
        </div>
      </div>
    </div>
  );
};

export default OnboardChallengePage;
