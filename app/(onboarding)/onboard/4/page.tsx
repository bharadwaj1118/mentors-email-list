import React from "react";

import { OnboardStepFiveForm } from "./_components/step5-form";
import OnboardHeading from "../_components/onboard-heading";

const Onboard5Page = () => {
  return (
    <div className="min-h-screen bg-white bg-[radial-gradient(60%_120%_at_50%_50%,hsla(0,0%,100%,0)_0,rgba(252,205,238,.5)_100%)]">
      <div className="form-container pt-10">
        <div className="card-block space-y-4">
          <OnboardHeading step={4} title="How did you find out about us?" />

          <OnboardStepFiveForm />
        </div>
      </div>
    </div>
  );
};

export default Onboard5Page;
