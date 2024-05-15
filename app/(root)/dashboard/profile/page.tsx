"use router";
import { redirect } from "next/navigation";
import { auth } from "@clerk/nextjs";
import { db } from "@/lib/db";

const MenteeProfilePage = async () => {
  const { userId } = auth();

  // If the user is not authenticated, redirect to sign-in page immediately
  if (!userId) {
    redirect("/sign-in");
  }

  const currUser = await db.user.findUnique({
    where: {
      clerkId: userId,
    },
    select: {
      id: true,
    },
  });

  // If the user profile is not found, return an appropriate message
  if (!currUser) {
    return <div>Profile not found</div>;
  }

  if (currUser) {
    redirect(`/dashboard/profile/${currUser.id}`);
  }

  return <div>Profile Page</div>;
};

export default MenteeProfilePage;
