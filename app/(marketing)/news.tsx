import Link from "next/link";
import Image from "next/image";
import NewsAuthor from "@/public/mentors-cx.svg";
import NewsImage1 from "@/public/images/blog/MasteringTheArtOfOnlineMentoring.jpg";
import NewsImage2 from "@/public/images/blog/IncreasingRevenueThroughCustomerExperience.jpg";
import NewsImage3 from "@/public/images/blog/IncreasingRevenueThroughCustomerExperience3.jpg";

export default function News() {
  return (
    <section>
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="py-12 md:py-20">
          {/* Section header */}
          <div className="max-w-3xl mx-auto text-center pb-12 md:pb-20">
            <h2 className="h2">
              The best of blogs to know more about Mentors CX{" "}
            </h2>
          </div>

          {/* Articles list */}
          <div className="max-w-sm mx-auto md:max-w-none">
            <div className="grid gap-12 md:grid-cols-3 md:gap-x-6 md:gap-y-8 items-start">
              {/* 1st article */}
              <article className="flex flex-col h-full" data-aos="zoom-y-out">
                <header>
                  <a
                    href="/blog/master-the-art-of-online-mentoring"
                    className="block mb-6"
                  >
                    <figure className="relative h-full overflow-hidden rounded">
                      <Image
                        className="w-full h-full object-cover scale-105 hover:-translate-y-1 transition duration-700 ease-out"
                        src={NewsImage1}
                        width={200}
                        height={150}
                        alt="News 01"
                      />
                    </figure>
                  </a>
                  <div className="mb-3">
                    <ul className="flex flex-wrap text-xs font-medium -m-1">
                      <li className="m-1">
                        <a
                          className="inline-flex text-center text-gray-100 py-1 px-3 rounded-full bg-blue-500 hover:bg-blue-600 transition duration-150 ease-in-out"
                          href="#0"
                        >
                          Tips & tricks - mentoring
                        </a>
                      </li>
                      <li className="m-1 hidden">
                        <a
                          className="inline-flex text-center text-gray-800 py-1 px-3 rounded-full bg-white hover:bg-gray-100 shadow-sm transition duration-150 ease-in-out"
                          href="#0"
                        >
                          Hubspot
                        </a>
                      </li>
                    </ul>
                  </div>
                  <h3 className="text-xl font-bold leading-snug tracking-tight">
                    <a
                      href="/blog/master-the-art-of-online-mentoring"
                      className="hover:underline"
                    >
                      Actionable tips to master the art of online mentoring
                    </a>
                  </h3>
                </header>
                <footer className="text-sm flex items-center mt-4">
                  <div className="flex shrink-0 mr-3">
                    <a className="relative" href="#0">
                      {/* <span
                        className="absolute inset-0 -m-px"
                        aria-hidden="true"
                      >
                        <span className="absolute inset-0 -m-px bg-white rounded-full"></span>
                      </span> */}
                      <Image
                        className="relative rounded-full"
                        src={NewsAuthor}
                        width="32"
                        height="32"
                        alt="Author 01"
                      />
                    </a>
                  </div>
                  <div>
                    <span className="text-gray-600">By </span>
                    <a className="font-medium hover:underline" href="#0">
                      Mentors CX
                    </a>
                  </div>
                </footer>
              </article>

              {/* 2nd article */}
              <article
                className="flex flex-col h-full"
                data-aos="zoom-y-out"
                data-aos-delay="150"
              >
                <header>
                  <a href="#0" className="block mb-6">
                    <figure className="relative overflow-hidden  rounded">
                      <Image
                        className=" w-full h-full object-cover scale-105  hover:-translate-y-1 transition duration-700 ease-out"
                        src={NewsImage2}
                        width={200}
                        height={150}
                        alt="News 02"
                      />
                    </figure>
                  </a>
                  <div className="mb-3">
                    <ul className="flex flex-wrap text-xs font-medium -m-1">
                      <li className="m-1">
                        <a
                          className="inline-flex text-center text-gray-100 py-1 px-3 rounded-full bg-blue-500 hover:bg-blue-600 transition duration-150 ease-in-out"
                          href="#0"
                        >
                          Revenue ops
                        </a>
                      </li>
                      <li className="m-1 hidden">
                        <a
                          className="inline-flex text-center text-gray-800 py-1 px-3 rounded-full bg-white hover:bg-gray-100 shadow-sm transition duration-150 ease-in-out"
                          href="#0"
                        >
                          Facebook
                        </a>
                      </li>
                    </ul>
                  </div>
                  <h3 className="text-xl font-bold leading-snug tracking-tight">
                    <a href="#0" className="hover:underline">
                      Maximizing revenue: the power of customer experience
                    </a>
                  </h3>
                </header>
                <footer className="text-sm flex items-center mt-4">
                  <div className="flex shrink-0 mr-3">
                    <a className="relative -ml-2" href="#0">
                      <span
                        className="absolute inset-0 -m-px"
                        aria-hidden="true"
                      >
                        {/* <span className="absolute inset-0 -m-px bg-white rounded-full"></span> */}
                      </span>
                      <Image
                        className="relative rounded-full"
                        src={NewsAuthor}
                        width="32"
                        height="32"
                        alt="Author 03"
                      />
                    </a>
                  </div>
                  <div>
                    <span className="text-gray-600">By </span>
                    <a className="font-medium hover:underline" href="#0">
                      Mentors CX
                    </a>
                  </div>
                </footer>
              </article>

              {/* 3rd article */}
              <article
                className="flex flex-col h-full"
                data-aos="zoom-y-out"
                data-aos-delay="300"
              >
                <header>
                  <a href="#0" className="block mb-6">
                    <figure className=" overflow-hidden  rounded">
                      <Image
                        className=" w-full h-full object-cover scale-105  hover:-translate-y-1 transition duration-700 ease-out"
                        src={NewsImage3}
                        width={200}
                        height={150}
                        alt="News 03"
                      />
                    </figure>
                  </a>
                  <div className="mb-3">
                    <ul className="flex flex-wrap text-xs font-medium -m-1">
                      <li className="m-1">
                        <a
                          className="inline-flex text-center text-gray-100 py-1 px-3 rounded-full bg-blue-500 hover:bg-blue-600 transition duration-150 ease-in-out"
                          href="#0"
                        >
                          Tips & tricks - mentoring
                        </a>
                      </li>
                      <li className="m-1 hidden">
                        <a
                          className="inline-flex text-center text-gray-800 py-1 px-3 rounded-full bg-white hover:bg-gray-100 shadow-sm transition duration-150 ease-in-out"
                          href="#0"
                        >
                          Tinder
                        </a>
                      </li>
                    </ul>
                  </div>
                  <h3 className="text-xl font-bold leading-snug tracking-tight">
                    <a href="#0" className="hover:underline">
                      Turning Customers into Clients: Building Loyalty and
                      Repeat Business
                    </a>
                  </h3>
                </header>
                <footer className="text-sm flex items-center mt-4">
                  <div className="flex shrink-0 mr-3">
                    <a className="relative" href="#0">
                      <span
                        className="absolute inset-0 -m-px"
                        aria-hidden="true"
                      >
                        {/* <span className="absolute inset-0 -m-px bg-white rounded-full"></span> */}
                      </span>
                      <Image
                        className="relative rounded-full"
                        src={NewsAuthor}
                        width="32"
                        height="32"
                        alt="Author 01"
                      />
                    </a>
                  </div>
                  <div>
                    <span className="text-gray-600">By </span>
                    <a className="font-medium hover:underline" href="#0">
                      Mentors CX
                    </a>
                  </div>
                </footer>
              </article>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
