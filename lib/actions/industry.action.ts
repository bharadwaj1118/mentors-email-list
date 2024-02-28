"use server";
import { db } from "@/lib/db";

interface AddIndustryProps {
  userId: string;
  name: string;
  description: string;
  imageUrl: string;
}
export async function addIndustry({
  userId,
  name,
  description,
  imageUrl,
}: AddIndustryProps) {
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

    const industry = await db.industry.create({
      data: {
        userId: user.id,
        name,
        description,
        imageUrl,
      },
    });

    return industry;
  } catch (error) {
    console.log("error in ADD_INDUSTRY_FUNCTION", error);
  }
}
