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
      <h1 className="h2-bold mb-12">
        Your response has been successfully submitted!
      </h1>
      <Button size="lg" className="text-lg" onClick={handleClick}>
        Continue to website
      </Button>
    </div>
  );
};

export default ThankyouPage;
