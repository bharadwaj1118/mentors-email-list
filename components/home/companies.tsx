"use client";

import { useEffect } from "react";
import Image from "next/image";
import Particles from "./particles";

import Client01 from "@/public/logos/appcues.svg";
import Client02 from "@/public/logos/apple.svg";
import Client03 from "@/public/logos/automattic.svg";
import Client04 from "@/public/logos/goodEggs.svg";
import Client05 from "@/public/logos/google.svg";
import Client06 from "@/public/logos/handshake.svg";
import Client07 from "@/public/logos/hubspot.svg";
import Client08 from "@/public/logos/klaus.svg";
import Client09 from "@/public/logos/loom.svg";
import Client10 from "@/public/logos/meetup.svg";
import Client11 from "@/public/logos/partnerhero.svg";
import Client12 from "@/public/logos/prezzee.svg";
import Client13 from "@/public/logos/sanaa.svg";
import Client14 from "@/public/logos/shopify.svg";
import Client15 from "@/public/logos/trello.svg";
import Client16 from "@/public/logos/wistia.svg";
import Client17 from "@/public/logos/zapier.svg";
import Client18 from "@/public/logos/zf.svg";

import Swiper, { Autoplay } from "swiper";
import "swiper/swiper.min.css";
Swiper.use([Autoplay]);

export default function Companies() {
  useEffect(() => {
    const carousel = new Swiper(".clients-carousel", {
      slidesPerView: "auto",
      spaceBetween: 64,
      centeredSlides: true,
      loop: true,
      speed: 5000,
      noSwiping: true,
      noSwipingClass: "swiper-slide",
      autoplay: {
        delay: 0,
        disableOnInteraction: true,
      },
    });
  }, []);

  return (
    <section>
      <div className="relative max-w-6xl mx-auto px-4 sm:px-6">
        {/* Particles animation */}
        <div className="absolute inset-0 max-w-6xl mx-auto px-4 sm:px-6">
          <Particles className="absolute inset-0 -z-10" quantity={5} />
        </div>

        <div className="py-12 md:py-16">
          <div className="overflow-hidden">
            {/* Carousel built with Swiper.js [https://swiperjs.com/] */}
            {/* * Custom styles in src/css/additional-styles/theme.scss */}
            <div className="clients-carousel swiper-container relative before:absolute before:inset-0 before:w-1/2 before:z-10 before:pointer-events-none before:bg-gradient-to-r  after:absolute after:inset-0 after:left-auto after:w-1/2  after:z-10 after:pointer-events-none after:bg-gradient-to-l ">
              <div className="swiper-wrapper !ease-linear select-none items-center">
                {/* Carousel items */}
                <div className="swiper-slide !w-auto">
                  <Image
                    src={Client01}
                    alt="Client 01"
                    width={110}
                    height={21}
                  />
                </div>
                <div className="swiper-slide !w-auto">
                  <Image
                    src={Client02}
                    alt="Client 02"
                    width={70}
                    height={25}
                  />
                </div>
                <div className="swiper-slide !w-auto">
                  <Image
                    className="mt-1"
                    src={Client03}
                    alt="Client 03"
                    width={107}
                    height={33}
                  />
                </div>
                <div className="swiper-slide !w-auto">
                  <Image
                    src={Client04}
                    alt="Client 04"
                    width={85}
                    height={36}
                  />
                </div>
                <div className="swiper-slide !w-auto">
                  <Image
                    src={Client05}
                    alt="Client 05"
                    width={86}
                    height={18}
                  />
                </div>
                <div className="swiper-slide !w-auto">
                  <Image
                    src={Client06}
                    alt="Client 06"
                    width={78}
                    height={34}
                  />
                </div>
                <div className="swiper-slide !w-auto">
                  <Image
                    src={Client07}
                    alt="Client 07"
                    width={83}
                    height={23}
                  />
                </div>
                <div className="swiper-slide !w-auto">
                  <Image
                    src={Client08}
                    alt="Client 08"
                    width={98}
                    height={26}
                  />
                </div>
                <div className="swiper-slide !w-auto">
                  <Image
                    className="mt-2"
                    src={Client09}
                    alt="Client 09"
                    width={92}
                    height={28}
                  />
                </div>
                <div className="swiper-slide !w-auto">
                  <Image
                    className="mt-2"
                    src={Client10}
                    alt="Client 10"
                    width={92}
                    height={28}
                  />
                </div>
                <div className="swiper-slide !w-auto">
                  <Image
                    className="mt-2"
                    src={Client11}
                    alt="Client 11"
                    width={92}
                    height={28}
                  />
                </div>
                <div className="swiper-slide !w-auto">
                  <Image
                    className="mt-2"
                    src={Client12}
                    alt="Client 12"
                    width={92}
                    height={28}
                  />
                </div>
                <div className="swiper-slide !w-auto">
                  <Image
                    className="mt-2"
                    src={Client13}
                    alt="Client 13"
                    width={92}
                    height={28}
                  />
                </div>
                <div className="swiper-slide !w-auto">
                  <Image
                    className="mt-2"
                    src={Client14}
                    alt="Client 14"
                    width={92}
                    height={28}
                  />
                </div>
                <div className="swiper-slide !w-auto">
                  <Image
                    className="mt-2"
                    src={Client15}
                    alt="Client 15"
                    width={92}
                    height={28}
                  />
                </div>
                <div className="swiper-slide !w-auto">
                  <Image
                    className="mt-2"
                    src={Client16}
                    alt="Client 15"
                    width={92}
                    height={28}
                  />
                </div>
                <div className="swiper-slide !w-auto">
                  <Image
                    className="mt-2"
                    src={Client17}
                    alt="Client 15"
                    width={92}
                    height={28}
                  />
                </div>
                <div className="swiper-slide !w-auto">
                  <Image
                    className="mt-2"
                    src={Client18}
                    alt="Client 15"
                    width={92}
                    height={28}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}