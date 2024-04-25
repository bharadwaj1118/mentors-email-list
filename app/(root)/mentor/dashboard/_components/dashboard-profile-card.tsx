import { StarFilledIcon } from "@radix-ui/react-icons";
import Link from "next/link";
import React from "react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";

import { LinkedInShareButton } from "./dashboard-actions";

type DashBoardProfileCardProps = {
  userId: string;
  userImage: string;
  userName: string;
  rating: number;
  sessions: number;
  reviews: number;
};

function getInitials(fullName: string): string {
  // Split the name into parts based on spaces
  const parts = fullName.trim().split(" ");

  // Ensure there are at least two parts for first and last name
  if (parts.length < 2) {
    throw new Error("Please provide both first and last names.");
  }

  const firstInitial = parts[0][0];
  const lastInitial = parts[parts.length - 1][0];
  return (firstInitial + lastInitial).toUpperCase();
}

const DashBoardProfileCard = ({
  userId,
  userImage,
  userName,
  rating,
  sessions,
  reviews,
}: DashBoardProfileCardProps) => {
  return (
    <section className="mt-4 lg:my-8 p-3 border shadow rounded-lg bg-background md:pl-6 col-span-1">
      <div className="flex items-center justify-center flex-col gap-1">
        <Avatar className="w-20 h-20">
          <AvatarImage src={userImage} alt={userName} />
          <AvatarFallback>{getInitials(userName)}</AvatarFallback>
        </Avatar>
        <p className="large flex items-center gap-2 !text-2xl">
          <StarFilledIcon className="w-5 h-5 text-yellow-500" /> {rating}
        </p>

        <p className="muted">{sessions} sessions</p>
        <p className="muted">{reviews} reviews</p>

        <div className="w-full flex justify-between gap-2 items-center my-2">
          <Button variant="outline" size="sm" asChild>
            <Link href={`/dashboard/profile/${userId}`}>View my Profile</Link>
          </Button>

          <LinkedInShareButton />
        </div>
      </div>
    </section>
  );
};

export default DashBoardProfileCard;
