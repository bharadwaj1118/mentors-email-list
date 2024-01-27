import Image from "next/image";
import TestimonialImage01 from "@/public/images/testimonial-01.jpg";
import TestimonialImage02 from "@/public/images/testimonial-02.jpg";
import TestimonialImage03 from "@/public/images/testimonial-03.jpg";
import TestimonialImage04 from "@/public/images/testimonial-04.jpg";
import TestimonialImage05 from "@/public/images/testimonial-05.jpg";
import TestimonialImage06 from "@/public/images/testimonial-06.jpg";
import Link from "next/link";

export default function Clients() {
  return (
    <section className="bg-slate-50">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="py-12 md:py-20">
          {/* Section header */}
          <div className="mx-auto max-w-3xl pb-12 text-center md:pb-20">
            <h2 className="h2 font-playfair-display text-slate-800">
              Get guidance from CX leaders with hands-on experience in
              forward-thinking brands.
            </h2>
          </div>
          {/* Testimonials container */}
          <div
            className="mx-auto mb-12 grid max-w-sm items-start gap-12 sm:max-w-none sm:grid-cols-2 sm:gap-x-6 sm:gap-y-8 md:mb-16 md:grid-cols-3"
            data-aos-id-testimonials
          >
            {/* 1st Testimonial */}
            <article
              className="flex h-full flex-col bg-white p-6 shadow-xl"
              data-aos="fade-up"
              data-aos-anchor="[data-aos-id-testimonials]"
            >
              <header>
                <div className="mb-4 flex items-center">
                  <div className="relative mr-5">
                    <Image
                      className="shrink-0 rounded-full"
                      src={TestimonialImage01}
                      width={48}
                      height={48}
                      alt="Testimonial 01"
                    />
                  </div>
                  {/* Acme Inc. logo */}
                  <div className="text-sm font-medium">
                    <a
                      className="text-slate-800 transition duration-150 ease-in-out hover:text-blue-600"
                      href="#0"
                    >
                      Patrick Hills
                    </a>
                    <span className="text-slate-300"> · </span>
                    <span className="text-slate-500">CEO, Acme Inc.</span>
                  </div>
                </div>
              </header>
              <div className="mb-3 grow">
                <p className="italic text-slate-500">
                  Tidy has been the system to drive change in collaboration on
                  content for our organisation.
                </p>
              </div>
            </article>
            {/* 2nd Testimonial */}
            <article
              className="flex h-full flex-col bg-white p-6 shadow-xl"
              data-aos="fade-up"
              data-aos-anchor="[data-aos-id-testimonials]"
              data-aos-delay="100"
            >
              <header>
                <div className="mb-4 flex items-center">
                  <div className="relative mr-5">
                    <Image
                      className="shrink-0 rounded-full"
                      src={TestimonialImage02}
                      width={48}
                      height={48}
                      alt="Testimonial 02"
                    />
                  </div>
                  {/* Acme Inc. logo */}
                  <div className="text-sm font-medium">
                    <a
                      className="text-slate-800 transition duration-150 ease-in-out hover:text-blue-600"
                      href="#0"
                    >
                      Jeff Wong
                    </a>
                    <span className="text-slate-300"> · </span>
                    <span className="text-slate-500">CEO, Acme Inc.</span>
                  </div>
                </div>
              </header>
              <div className="mb-3 grow">
                <p className="italic text-slate-500">
                  Tidy has been the system to drive change in collaboration on
                  content for our organisation.
                </p>
              </div>
            </article>
            {/* 3rd Testimonial */}
            <article
              className="flex h-full flex-col bg-white p-6 shadow-xl"
              data-aos="fade-up"
              data-aos-anchor="[data-aos-id-testimonials]"
              data-aos-delay="200"
            >
              <header>
                <div className="mb-4 flex items-center">
                  <div className="relative mr-5">
                    <Image
                      className="shrink-0 rounded-full"
                      src={TestimonialImage03}
                      width={48}
                      height={48}
                      alt="Testimonial 03"
                    />
                  </div>
                  {/* Acme Inc. logo */}
                  <div className="text-sm font-medium">
                    <a
                      className="text-slate-800 transition duration-150 ease-in-out hover:text-blue-600"
                      href="#0"
                    >
                      Amy Tolinski
                    </a>
                    <span className="text-slate-300"> · </span>
                    <span className="text-slate-500">CEO, Acme Inc.</span>
                  </div>
                </div>
              </header>
              <div className="mb-3 grow">
                <p className="italic text-slate-500">
                  Tidy has been the system to drive change in collaboration on
                  content for our organisation.
                </p>
              </div>
            </article>
            {/* 4th Testimonial */}
            <article
              className="flex h-full flex-col bg-white p-6 shadow-xl"
              data-aos="fade-up"
              data-aos-anchor="[data-aos-id-testimonials]"
              data-aos-delay="300"
            >
              <header>
                <div className="mb-4 flex items-center">
                  <div className="relative mr-5">
                    <Image
                      className="shrink-0 rounded-full"
                      src={TestimonialImage04}
                      width={48}
                      height={48}
                      alt="Testimonial 04"
                    />
                  </div>
                  {/* Acme Inc. logo */}
                  <div className="text-sm font-medium">
                    <a
                      className="text-slate-800 transition duration-150 ease-in-out hover:text-blue-600"
                      href="#0"
                    >
                      Chris Mallard
                    </a>
                    <span className="text-slate-300"> · </span>
                    <span className="text-slate-500">CEO, Acme Inc.</span>
                  </div>
                </div>
              </header>
              <div className="mb-3 grow">
                <p className="italic text-slate-500">
                  Tidy has been the system to drive change in collaboration on
                  content for our organisation.
                </p>
              </div>
            </article>
            {/* 5th Testimonial */}
            <article
              className="flex h-full flex-col bg-white p-6 shadow-xl"
              data-aos="fade-up"
              data-aos-anchor="[data-aos-id-testimonials]"
              data-aos-delay="400"
            >
              <header>
                <div className="mb-4 flex items-center">
                  <div className="relative mr-5">
                    <Image
                      className="shrink-0 rounded-full"
                      src={TestimonialImage05}
                      width={48}
                      height={48}
                      alt="Testimonial 05"
                    />
                  </div>
                  {/* Acme Inc. logo */}
                  <div className="text-sm font-medium">
                    <a
                      className="text-slate-800 transition duration-150 ease-in-out hover:text-blue-600"
                      href="#0"
                    >
                      Cathie Wood
                    </a>
                    <span className="text-slate-300"> · </span>
                    <span className="text-slate-500">CEO, Acme Inc.</span>
                  </div>
                </div>
              </header>
              <div className="mb-3 grow">
                <p className="italic text-slate-500">
                  Tidy has been the system to drive change in collaboration on
                  content for our organisation.
                </p>
              </div>
            </article>
            {/* 6th Testimonial */}
            <article
              className="flex h-full flex-col bg-white p-6 shadow-xl"
              data-aos="fade-up"
              data-aos-anchor="[data-aos-id-testimonials]"
              data-aos-delay="500"
            >
              <header>
                <div className="mb-4 flex items-center">
                  <div className="relative mr-5">
                    <Image
                      className="shrink-0 rounded-full"
                      src={TestimonialImage06}
                      width={48}
                      height={48}
                      alt="Testimonial 06"
                    />
                  </div>
                  {/* Acme Inc. logo */}
                  <div className="text-sm font-medium">
                    <a
                      className="text-slate-800 transition duration-150 ease-in-out hover:text-blue-600"
                      href="#0"
                    >
                      Mary Duncan
                    </a>
                    <span className="text-slate-300"> · </span>
                    <span className="text-slate-500">CEO, Acme Inc.</span>
                  </div>
                </div>
              </header>
              <div className="mb-3 grow">
                <p className="italic text-slate-500">
                  Tidy has been the system to drive change in collaboration on
                  content for our organisation.
                </p>
              </div>
            </article>
          </div>
          {/* See All Customers */}
          <div className="text-center">
            <Link href="/subscribe">
              <button className="btn group bg-blue-600 text-white hover:bg-blue-700">
                Get started{" "}
                <span className="ml-3 text-xl tracking-normal text-white transition-transform duration-150 ease-in-out group-hover:translate-x-0.5">
                  &gt;
                </span>
              </button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
