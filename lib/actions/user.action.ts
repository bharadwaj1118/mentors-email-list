"use server";

import { auth } from "@clerk/nextjs";
import { db } from "../db";

export async function getSelf() {
  try {
    const { userId } = auth();
    if (!userId) {
      throw new Error("User not logged in");
    }
    const user = await db.user.findUnique({
      where: {
        clerkId: userId,
      },
    });
    return user;
  } catch (error) {
    console.log(error);
    throw Error("GET_SELF_ERROR, " + error);
  }
}

export async function getSelfWithEvents() {
  try {
    const { userId } = auth();
    if (!userId) {
      throw new Error("User not logged in");
    }
    const user = await db.user.findUnique({
      where: {
        clerkId: userId,
      },
      include: {
        events: true,
      },
    });
    return user;
  } catch (error) {
    console.log(error);
    throw Error("GET_SELF_ERROR, " + error);
  }
}

export async function getUserByclerkId(userId: string) {
  try {
    const user = await db.user.findUnique({
      where: {
        clerkId: userId,
      },
    });

    if (!user) throw new Error("User not found");

    return user;
  } catch (error) {
    console.log(error);
    throw Error("GET_USER_BY_CLERK_ID_ERROR, " + error);
  }
}

export async function updateUserOnboarding02(user: any) {
  try {
    const { id } = user;

    if (!id) throw new Error("User id is required");

    const { city, country, languages, role } = user;

    const deleteLanguages = await db.language.deleteMany({
      where: {
        userId: user.id,
      },
    });

    const insertLanguages = await db.language.createMany({
      data: languages.map((language: any) => ({
        name: language.value,
        userId: user.id,
      })),
    });

    const updatedUser = await db.user.update({
      where: {
        id: user.id,
      },
      data: {
        city,
        country,
        role,
      },
    });
    return updatedUser;
  } catch (error) {
    console.log(error);
    throw Error("UPDATE_USER_ERROR_ONBOARING02, " + error);
  }
}

export async function updateUser(user: any) {
  try {
    const { id } = user;

    if (!id) throw new Error("User id is required");

    const updatedUser = await db.user.update({
      where: {
        id: user.id,
      },
      data: {
        ...user,
      },
    });
    return updatedUser;
  } catch (error) {
    console.log(error);
    throw Error("UPDATE_USER_ERROR, " + error);
  }
}

export async function getAllMentors() {
  try {
    const mentors = await db.user.findMany({
      where: {
        role: "MENTOR" || "BOTH",
      },
    });
    return mentors;
  } catch (error) {
    console.log(error);
    throw Error("GET_ALL_MENTORS_ERROR, " + error);
  }
}
