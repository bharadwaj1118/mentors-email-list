import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import Link from "next/link";

interface SessionCardProps {
  session: string;
}

const SessionCard = ({ session }: SessionCardProps) => {
  const sessionJSON = JSON.parse(session);
  console.log(sessionJSON);
  const { objective, start, end, cost, status, category, mentee, id } =
    sessionJSON;
  const { username, imageUrl } = mentee;
  return (
    <div className="mt-3 w-full rounded-md border-1 p-3">
      <div className="flex space-x-3">
        <div className="p-3">
          <Avatar>
            <AvatarImage src={imageUrl} />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
        </div>
        <div className="w-full space-y-3">
          <div className="flex items-center justify-between">
            <div>
              <p className="large">{objective}</p>
              <div className="mt-1 flex items-center space-x-3">
                <p className="small">{username}</p>
                <Badge variant="outline" className="muted rounded-full">
                  {category}
                </Badge>
              </div>
            </div>
            <div className="flex flex-col space-y-3">
              <Button asChild className="rounded-full">
                <Link href={`/dashboard/session/${id}`}>View Request</Link>
              </Button>
            </div>
          </div>
          <Separator className="w-full" />
          <div className="flex w-fit flex-wrap justify-start space-x-4">
            <div>
              <p className="medium uppercase">Wednesday, 9 AUG</p>
              <p className="muted mt-1">12:00 PM - 12:30 PM GMT + 2</p>
            </div>
            <div>
              <p className="medium uppercase">duration</p>
              <p className="muted mt-1">30min</p>
            </div>
            <div>
              <p className="medium uppercase">cost</p>
              <p className="muted mt-1">Free</p>
            </div>
            <div>
              <p className="medium uppercase">Status</p>
              <Badge className="muted mt-1 rounded-full" variant="outline">
                Pending confirmation
              </Badge>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SessionCard;
