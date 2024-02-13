"use client";
import Image from "next/image";
import { motion } from "framer-motion";
import { LampContainer } from "@/components/ui/lamp";

import { SubscribeForm } from "@/components/subscribe-form";

export default function AuthenticationPage() {
  return (
    <>
      <div className="relative min-h-screen h-full flex-col items-center justify-center md:grid md:max-w-none md:grid-cols-2 sm:px-0 max-md:mb-10">
        <div className="relative h-[1/3] flex-col items-center justify-center bg-muted text-white dark:border-r flex md:h-full max-md:mb-3">
          <div className="absolute inset-0 bg-zinc-900" />
          <LampContainer className="max-md:hidden">
            <motion.h1
              initial={{ opacity: 0.5, y: 100 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{
                delay: 0.3,
                duration: 0.8,
                ease: "easeInOut",
              }}
              className="mt-8  "
            >
              <div className="flex items-center gap-2 justify-center">
                <div className="font-serif bg-gradient-to-br from-slate-500 to-slate-100  bg-clip-text text-center text-4xl font-medium tracking-tight text-transparent md:text-7xl">
                  Mentors
                </div>
                <div className="flex items-center">
                  <Image
                    src="/mentors-cx.png"
                    width={120}
                    height={120}
                    alt="Mentors CX"
                    className="invert fill-slate-500"
                  />
                </div>
              </div>
            </motion.h1>
          </LampContainer>
          <div className="flex md:hidden">
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
              <h1 className="text-3xl font-bold text-center tracking-tight sm:text-4xl">
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
            <SubscribeForm />
          </div>
        </div>
      </div>
    </>
  );
}
