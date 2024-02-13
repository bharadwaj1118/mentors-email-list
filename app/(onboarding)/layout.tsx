import React from "react";
import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";

import { db } from "@/lib/db";

const OnboardingLayout = async ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const { userId } = auth();
  if (!userId) {
    redirect("/sign-in");
  }

  const user = await db.user.findFirst({
    where: {
      clerkId: userId,
    },
    select: {
      isOnboarded: true,
    },
  });

  const isOnboarded = user && user.isOnboarded;

  if (isOnboarded) {
    redirect("/");
  }

  return <section className="min-h-screen">{children}</section>;
};

export default OnboardingLayout;
