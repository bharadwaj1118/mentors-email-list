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
      challenge: true,
    },
  });

  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-white bg-[radial-gradient(60%_120%_at_50%_50%,hsla(0,0%,100%,0)_0,rgba(252,205,238,.5)_100%)]">
      <div className="form-container pt-10">
        <div className="card-block space-y-4">
          <OnboardHeading
            step={3}
            title="Your #1 growth challenge right now?"
          />

          <OnboardChallengeForm
            userId={user.id}
            challenge={user.challenge || ""}
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
