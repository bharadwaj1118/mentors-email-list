import React from "react";
import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";

import AlertComponent from "@/components/shared/AlertComponent";
import { OnboardStepOneForm } from "./_components/step1-form";
import OnboardHeading from "../_components/onboard-heading";
import { db } from "@/lib/db";

const Onboard1Page = async () => {
  const { userId } = auth();
  if (!userId) {
    redirect("/sign-in");
  }

  const user = await db.user.findFirst({
    where: {
      clerkId: userId,
    },
    select: {
      id: true,
      location: true,
      languages: {
        select: {
          name: true,
        },
      },
    },
  });

  return (
    <div className="min-h-screen bg-white bg-[radial-gradient(60%_120%_at_50%_50%,hsla(0,0%,100%,0)_0,rgba(252,205,238,.5)_100%)]">
      <div className="form-container pt-10">
        <div className="card-block space-y-4">
          <OnboardHeading step={1} title="Welcome to the Onboarding Process" />

          <OnboardStepOneForm user={JSON.stringify(user)} />

          <AlertComponent
            title="Why are we asking this?"
            description="We are excited to have you on board. You will be able to connect with mentors and mentees after filling in the form below in the locations"
            name="Info"
          />
        </div>
      </div>
    </div>
  );
};

export default Onboard1Page;
