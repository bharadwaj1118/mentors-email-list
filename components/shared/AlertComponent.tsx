import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { icons } from "lucide-react";

import React from "react";

interface AlertComponentProps {
  title: string;
  description: string;
  name: keyof typeof icons;
}

const AlertComponent = ({ title, description, name }: AlertComponentProps) => {
  const LucideIcon = icons[name];
  return (
    <>
      <Alert>
        <LucideIcon className="h-4 w-4" />
        <AlertTitle>{title}</AlertTitle>
        <AlertDescription>{description}</AlertDescription>
      </Alert>
    </>
  );
};

export default AlertComponent;
