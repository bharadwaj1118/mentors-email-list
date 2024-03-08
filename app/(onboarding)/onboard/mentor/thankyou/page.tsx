"use client";
import React from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

const ThankyouPage = () => {
  const router = useRouter();

  const handleClick = () => {
    router.push("/");
  };

  return (
    <div className="min-h-screen max-w-5xl mx-auto p-3 w-full flex items-center justify-center flex-col">
      <div className="w-64 h-64 ">
        <Image
          className=" object-cover"
          src="/assets/thank-you.svg"
          alt="thankyou"
          width={200}
          height={200}
        />
      </div>
      <h2 className="h2-bold mb-6">Thank you! Your response has been saved!</h2>
      <h3 className="h3 mb-6">We will get back to you shortly!</h3>

      <Button size="lg" className="text-lg" onClick={handleClick}>
        Continue to website
      </Button>
    </div>
  );
};

export default ThankyouPage;
