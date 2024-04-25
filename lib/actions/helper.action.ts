"use server";

import { db } from "@/lib/db";
import { getSelfId } from "@/lib/actions/user.action";

type TProfileViewCount = {
  profileId: string;
};

export async function addProfileViewCount({ profileId }: TProfileViewCount) {
  try {
    const user = await getSelfId();
    if (!user) return;

    const profileView = await db.profileView.create({
      data: {
        profileId,
        viewerId: user?.id,
      },
    });

    return profileView;
  } catch (err) {
    console.log("Error in addProfileViewCount", err);
  }
}

export async function getUniqueProfileViews(profileId: string) {
  try {
    // Get the date 30 days ago from today
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

    const result = await db.profileView.groupBy({
      by: ["viewerId"],
      where: {
        profileId,
        createdAt: {
          gte: thirtyDaysAgo,
        },
      },
      _count: {
        viewerId: true,
      },
    });

    return result.length;
  } catch (err) {
    console.log("Error in getUniqueProfileViews", err);
  }
}

export async function getUniqueBookedSessions(userId: string) {
  try {
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

    const uniqueMenteeSessions = await db.session.findMany({
      where: {
        mentorId: userId, // Filter sessions by this mentorId
        createdAt: {
          gte: thirtyDaysAgo, // Only considering sessions within the last 30 days
        },
      },
      select: {
        menteeId: true, // Select only menteeId to minimize data transfer
      },
      distinct: ["menteeId"], // Ensure only unique menteeIds are returned
    });

    // The number of unique menteeIds is the length of the array returned
    return uniqueMenteeSessions.length;
  } catch (err) {
    console.log("Error in getUniqueBookedSessions", err);
  }
}

export async function getSessionsCompletedLastMonth(userId: string) {
  try {
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

    const sessions = await db.session.findMany({
      where: {
        mentorId: userId,
        createdAt: {
          gte: thirtyDaysAgo,
        },
        status: {
          equals: "COMPLETED",
        },
      },
      select: {
        id: true,
      },
    });

    return sessions.length;
  } catch (err) {
    console.log("Error in getSessionsCompletedLastMonth", err);
  }
}
