import React from "react";
import Link from "next/link";

import { Button } from "@/components/ui/button";
const OnboardingMentorPage = () => {
  return (
    <div className="h-screen  bg-[radial-gradient(100%_50%_at_50%_0%,rgba(0,163,255,0.13)_0,rgba(0,163,255,0)_50%,rgba(0,163,255,0)_100%)]">
      {/* Form content here */}
      <div className="form-container pt-10">
        <div className="card-block space-y-4">
          <h1 className="h1 ">Becoming a mentor</h1>
          <p className="large">
            Here are a few important things you should know before filling out
            the application form.
          </p>
          <ul className="my-6 ml-6 list-decimal [&>li]:mt-2 text-base md:text-lg">
            <li>
              Our main differentiator is a thorough “recruiting-like” process to
              keep our platform curated with top mentors.
            </li>
            <li>
              The best mentors believe in Kaizen, therefore we encourage mentors
              to also be mentees and we provide free session bookings (one for
              one model).
            </li>
            <li>
              Remember to treat mentees the same way you’d like to be treated -
              it’s key for the health of our community.{" "}
            </li>
            <li>
              {" "}
              If you decide to charge, we suggest keeping your rates affordable.
              Also, we collect 9% of your fee due to processing and maintenance.
            </li>
            <li>
              As a community-first mindset platform, you’ll have to mentor for
              free until you have three reviews.{" "}
            </li>
          </ul>

          <p className="large">
            We hope these are aligned with what you were looking for and you’re
            ready to join the best CX leaders who are passionate about sharing
            their knowledge and helping others evolve.{" "}
          </p>
        </div>
      </div>

      {/* Form footer */}
      <div className="form-container mt-4 flex items-center justify-between p-3">
        <Button variant="outline" asChild>
          <Link href="/onboard/mentor/1">Next</Link>
        </Button>

        <Button variant="link">Clear form</Button>
      </div>
    </div>
  );
};

export default OnboardingMentorPage;
