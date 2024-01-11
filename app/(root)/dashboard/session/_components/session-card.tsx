import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

interface SessionCardProps {
  session: string;
}

const SessionCard = ({ session }: SessionCardProps) => {
  const sessionJSON = JSON.parse(session);
  console.log(sessionJSON);
  return (
    <div className="mt-3 w-full rounded-md border-1 p-3">
      <div className="flex space-x-3">
        <div className="p-3">
          <Avatar>
            <AvatarImage src="https://github.com/shadcn.png" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
        </div>
        <div className="space-y-3">
          <div>
            <p className="large">To get your expert opinion and advice</p>
            <div className="mt-1 flex items-center space-x-3">
              <p className="small">Martin Taylor</p>
              <Badge variant="outline" className="muted rounded-full">
                PPC Stratergies
              </Badge>
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
