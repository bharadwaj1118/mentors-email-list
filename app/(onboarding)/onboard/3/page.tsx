import React from "react";
import { OnboardStepFourForm } from "./_components/step4-form";
import OnboardHeading from "../_components/onboard-heading";
import AlertComponent from "@/components/shared/AlertComponent";
import { Separator } from "@/components/ui/separator";
import Onboard3Page from "./page";

const Onboard4Page = () => {
  return (
    <div className="min-h-screen bg-white bg-[radial-gradient(60%_120%_at_50%_50%,hsla(0,0%,100%,0)_0,rgba(252,205,238,.5)_100%)]">
      <div className="form-container pt-10">
        <div className="card-block space-y-4">
          <OnboardHeading
            step={3}
            title="Your #1 growth challenge right now?"
          />

          <OnboardStepFourForm />

          <Separator className="h-[1px] my-3" />

          <AlertComponent
            title="Why are we asking this?"
            description="This information helps us match you with the most relavant mentors."
            name="Info"
          />
        </div>
      </div>
    </div>
  );
};

export default Onboard4Page;
