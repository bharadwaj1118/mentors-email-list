"use server";
import { db } from "@/lib/db";

interface AddExpertiseProps {
  userId: string;
  name: string;
  description: string;
  imageUrl: string;
}
export async function addExpertise({
  userId,
  name,
  description,
  imageUrl,
}: AddExpertiseProps) {
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

    const expertise = await db.expertise.create({
      data: {
        userId: user.id,
        name,
        description,
        imageUrl,
      },
    });

    return expertise;
  } catch (error) {
    console.log("error in ADD_INDUSTRY_FUNCTION", error);
  }
}
