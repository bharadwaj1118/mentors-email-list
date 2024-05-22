"use server";
import { auth, clerkClient } from "@clerk/nextjs";
import { db } from "@/lib/db";

export async function hasAdminAccess() {
  try {
    const { userId } = await auth();
    if (!userId) {
      throw new Error("User not found");
    }

    const user = await clerkClient.users.getUser(userId);
    return user.privateMetadata?.admin;
  } catch (error) {
    console.error(error);
  }
}

export async function updateMentorApplicationStatus({
  id,
  applicationStatus,
}: {
  id: number;
  applicationStatus: string;
}) {
  try {
    const isAdmin = await hasAdminAccess();

    if (!isAdmin) {
      throw new Error("User not found");
    }

    const application = await db.mentorApplication.update({
      where: { id },
      data: {
        applicationStatus,
      },
    });

    return application;
  } catch (error) {
    console.error(error);
  }
}
