import React from "react";
import { OnboardStepTwoForm } from "./_components/step2-form";
import OnboardHeading from "../_components/onboard-heading";
import AlertComponent from "@/components/shared/AlertComponent";
import { Separator } from "@/components/ui/separator";

const Onboard1Page = () => {
  return (
    <div className="min-h-screen bg-white bg-[radial-gradient(60%_120%_at_50%_50%,hsla(0,0%,100%,0)_0,rgba(252,205,238,.5)_100%)]">
      <div className="form-container pt-10">
        <div className="card-block space-y-4">
          <OnboardHeading step={2} title="Company and Role" />

          <OnboardStepTwoForm />

          <Separator className="h-[1px] my-3" />

          <AlertComponent
            title="Why are we asking this?"
            description="This information will help us to match with the most relevant one."
            name="Info"
          />
        </div>
      </div>
    </div>
  );
};

export default Onboard1Page;
