import React from "react";
import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";

import { OnboardStepTwoForm } from "./_components/step2-form";
import OnboardHeading from "../_components/onboard-heading";
import AlertComponent from "@/components/shared/AlertComponent";
import { Separator } from "@/components/ui/separator";
import { db } from "@/lib/db";

const Onboard2Page = async () => {
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
      organization: true,
      position: true,
      industries: {
        select: {
          name: true,
        },
      },
      portfolioWebsite: true,
      companySize: true,
    },
  });

  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-white bg-[radial-gradient(60%_120%_at_50%_50%,hsla(0,0%,100%,0)_0,rgba(252,205,238,.5)_100%)]">
      <div className="form-container pt-10">
        <div className="card-block space-y-4">
          <OnboardHeading step={2} title="Company and Role" />

          <OnboardStepTwoForm user={JSON.stringify(user)} />

          <AlertComponent
            title="Why are we asking this?"
            description="This information will help us to match with the most relevant one."
            name="Info"
          />
        </div>
      </div>
    </div>
  );
};

export default Onboard2Page;
