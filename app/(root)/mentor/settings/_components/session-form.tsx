import React from "react";
import { PriceForm } from "./price-form";
import { WeeklySessionForm } from "./weekly-sessions-form";
import { AppearanceForm } from "./duration-form";

const SessionForm = () => {
  return (
    <>
      <div className="w-full md:w-3/4">
        <PriceForm />
      </div>

      <div className="w-full md:w-3/4">
        <WeeklySessionForm />
      </div>

      <div className="w-full md:w-3/4">
        <AppearanceForm />
      </div>
    </>
  );
};

export default SessionForm;
