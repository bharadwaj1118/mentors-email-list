"use server";
import { db } from "@/lib/db";

interface AddExperienceProps {
  userId: string;
  companyName: string;
  description: string;
  imageUrl: string;
}
export async function addExperience({
  userId,
  companyName,
  description,
  imageUrl,
}: AddExperienceProps) {
  try {
    const user = await db.user.findUnique({
      where: {
        clerkId: userId,
      },
      select: {
        id: true,
      },
    });

    if (!user) {
      throw new Error("User not found");
    }

    const experience = await db.experience.create({
      data: {
        userId: user.id,
        companyName,
        description,
        imageUrl,
      },
    });

    return experience;
  } catch (error) {
    console.log("error in ADD_EXPERIENCE_FUNCTION", error);
  }
}
