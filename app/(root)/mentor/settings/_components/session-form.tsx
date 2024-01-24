import React from "react";
import { PriceForm } from "./price-form";
import { WeeklySessionForm } from "./weekly-sessions-form";
import { AppearanceForm } from "./duration-form";

interface SessionFormProps {
  user: string;
}

const SessionForm = ({ user }: SessionFormProps) => {
  return (
    <>
      <div className="w-full md:w-3/4">
        <PriceForm user={user} />
      </div>

      <div className="w-full md:w-3/4">
        <WeeklySessionForm user={user} />
      </div>

      <div className="w-full md:w-3/4">
        <AppearanceForm user={user} />
      </div>
    </>
  );
};

export default SessionForm;
