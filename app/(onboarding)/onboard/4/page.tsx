import React from "react";

import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";

import { db } from "@/lib/db";
import { RecommendedByForm } from "././_components/recommendedby-form";
import OnboardHeading from "../_components/onboard-heading";

const OnboardRecommendedByPage = async () => {
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
      recommendedBy: true,
    },
  });

  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-white bg-[radial-gradient(60%_120%_at_50%_50%,hsla(0,0%,100%,0)_0,rgba(252,205,238,.5)_100%)]">
      <div className="form-container pt-10">
        <div className="card-block space-y-4">
          <OnboardHeading step={4} title="How did you find out about us?" />

          <RecommendedByForm
            userId={user.id}
            recommenedBy={user.recommendedBy || ""}
          />
        </div>
      </div>
    </div>
  );
};

export default OnboardRecommendedByPage;
