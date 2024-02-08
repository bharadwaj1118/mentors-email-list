import Image from "next/image";
import TestimonialImage01 from "@/public/images/testimonial-01.jpg";
import TestimonialImage02 from "@/public/images/testimonial-02.jpg";
import TestimonialImage03 from "@/public/images/testimonial-03.jpg";
import TestimonialImage04 from "@/public/images/testimonial-04.jpg";
import TestimonialImage05 from "@/public/images/testimonial-05.jpg";
import TestimonialImage06 from "@/public/images/testimonial-06.jpg";
import Link from "next/link";

const testimonials = [
  {
    name: "Craig Stoss",
    title: "Director of CX Transformation, PartnerHero",
    description: "Favorite hobby: Making Lego models with my son.",
    image: "/clients/CraigStossPropic.jpg",
  },
  {
    name: "Hilary Dudek",
    title: "Senior Director, Sana Benefits",
    description: "Favorite hobby:  Roller Derby!",
    image: "/clients/HilaryPropic.jpeg",
  },
  {
    name: "Mercer Smith",
    title: "VP, CX Insights & Community, PartnerHero",
    description: "Favorite hobby: Doing things with my hands.",
    image: "/clients/MercerPropic.jpeg",
  },
  {
    name: "Olaf Jacobson",
    title: "CEO, Soon",
    description:
      "Favorite hobby: Water sports: scuba diving, snorkeling, and kite surfing. ",
    image: "/clients/OlafPropic.jpg",
  },
  {
    name: "Sheena OhUiginn",
    title: " Product & Support Experience, ex-Shopify",
    description: "Favorite hobby: Building Lego sets",
    image: "/clients/SheenaPropic.jpg",
  },
  {
    name: "Raquel Rincon",
    title: "Customer Success Manager, PartnerHero",
    description:
      "Favorite hobby: Shopping second-hand: I run a local group for yard sales.",
    image: "/clients/RaqPropic.jpg",
  },

  {
    name: "Elissa Chandler ",
    title: "VP of Marketing & Operations, Odyssey Energy Solutions",
    description: "Favorite hobby: Cooking",
    image: "/clients/ElissaPropic.jpg",
  },

  {
    name: "Killian Alexandre",
    title: "Community Success Manager, ChangeX",
    description: "Favorite hobby: I have a lot in my list",
    image: TestimonialImage06,
  },

  {
    name: "Bhavini Raju",
    title: "Director of Customer Service, NOBULL",
    description: "Favorite hobby: Trying Indian Food...",
    image: TestimonialImage06,
  },
];

export default function Clients() {
  return (
    <section className="bg-slate-50">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="py-12 md:py-20">
          {/* Section header */}
          <div className="mx-auto max-w-3xl pb-12 text-center md:pb-20">
            <h2 className="h2 text-slate-800">
              Get guidance from CX leaders with hands-on experience in
              forward-thinking brands.
            </h2>
          </div>
          {/* Testimonials container */}
          <div
            className="mx-auto mb-12 grid max-w-sm items-start gap-12 sm:max-w-none sm:grid-cols-2 sm:gap-x-6 sm:gap-y-8 md:mb-16 md:grid-cols-3"
            data-aos-id-testimonials
          >
            {testimonials.map((testimonial) => (
              // <article
              //   key={testimonial.name}
              //   className="flex h-full flex-col bg-white p-6 shadow-xl"
              //   data-aos="fade-up"
              //   data-aos-anchor="[data-aos-id-testimonials]"
              //   data-aos-delay="100"
              // >
              //   <header>
              //     <div className="mb-4 flex items-center">
              //       <div className="relative mr-5">
              //         <Image
              //           src={testimonial.image}
              //           alt={testimonial.name}
              //           className="rounded-full shadow-lg shrink-0 shadow-blue-500/50"
              //           height={48}
              //           layout="fixed"
              //           width={48}
              //           objectFit="cover"
              //           objectPosition="center"
              //         />
              //       </div>
              //       {/* Acme Inc. logo */}
              //       <div className="text-sm font-medium ">
              //         <a
              //           className="text-slate-800 transition duration-150 ease-in-out hover:text-blue-600"
              //           href="#0"
              //         >
              //           {testimonial.name}
              //         </a>
              //         <span className="text-slate-300"> · </span>
              //         <span className="text-slate-500">
              //           {testimonial.title}
              //         </span>
              //       </div>
              //     </div>
              //   </header>
              //   <div className="mb-3 grow">
              //     <p className="italic text-slate-500">
              //       {testimonial.description}
              //     </p>
              //   </div>
              // </article>
              <article
                className="rounded-xl bg-white p-4 ring ring-blue-50 sm:p-6 lg:p-8 min-h-[250px]"
                key={testimonial.name}
                //   className="flex h-full flex-col bg-white p-6 shadow-xl"
                data-aos="fade-up"
                data-aos-anchor="[data-aos-id-testimonials]"
                data-aos-delay="100"
              >
                <div className="flex items-start gap-4 sm:gap-8">
                  <div
                    className="grid shrink-0 place-content-center rounded-full border-2 border-blue-500"
                    aria-hidden="true"
                  >
                    <div className="h-12 w-12 md:h-16 md:w-16 relative">
                      <Image
                        quality={100}
                        title={testimonial.name}
                        src={testimonial.image}
                        alt="HS"
                        loading="eager"
                        layout="fill"
                        className="rounded-full object-cover"
                      />
                    </div>
                  </div>

                  <div>
                    <strong className="text-slate-800 transition duration-150 ease-in-out hover:text-blue-600">
                      {testimonial.name}
                    </strong>

                    <h3 className="text-slate-500">
                      <a href="#" className="hover:underline">
                        {testimonial.title}
                      </a>
                    </h3>

                    <p className="italic text-slate-700 mt-3 text-medium">
                      {testimonial.description}
                    </p>
                  </div>
                </div>
              </article>
            ))}
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
