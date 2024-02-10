"use client";
import Image from "next/image";

import { UserAuthForm } from "@/components/user-auth-form";

export default function AuthenticationPage() {
  return (
    <>
      {/* <div className="lg:hidden">
        <Image
          src="/authentication-light.png"
          width={1280}
          height={843}
          alt="Authentication"
          className="block dark:hidden"
        />
        <Image
          src="/authentication-light.png"
          width={1280}
          height={843}
          alt="Authentication"
          className="hidden dark:block"
        />
      </div> */}
      <div className="relative min-h-screen h-full flex-col items-center justify-center md:grid md:max-w-none md:grid-cols-2 sm:px-0">
        <div className="relative h-[1/3] flex-col items-center justify-center bg-muted p-10 text-white dark:border-r flex md:h-full max-md:mb-3">
          <div className="absolute inset-0 bg-zinc-900" />
          <div className="flex">
            <Image
              src="/mentors-cx.png"
              width={500}
              height={500}
              alt="Picture of the author"
              className="invert"
            />
          </div>
        </div>
        <div className="max-md:container sm:p-8">
          <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
            <div className="flex flex-col space-y-4 ">
              <h1 className="h1 text-center">
                The CX community that grows your career
              </h1>
              <p className="text-sm text-muted-foreground text-start">
                Whether you&apos;re a seasoned professional eager to share your
                knowledge or someone hungry for insights, our platform is your
                gateway to a community that thrives on learning and growth.
              </p>
              <p className="text-sm font-bold text-start">
                Join the wait list now and be part of the CX transformative
                wave.{" "}
              </p>
            </div>
            <UserAuthForm />
          </div>
        </div>
      </div>
    </>
  );
}
