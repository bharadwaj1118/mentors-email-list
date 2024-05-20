"use server";

import { db } from "@/lib/db";

export async function updateMentorApplicationStatus({
  id,
  applicationStatus,
}: {
  id: number;
  applicationStatus: string;
}) {
  try {
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
