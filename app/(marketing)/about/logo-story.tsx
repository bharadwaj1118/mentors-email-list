import React from 'react';
import Image from 'next/image';

const LogoStory = () => {
  return (
    <section>
      <div className="max-w-3xl mx-auto px-4 sm:px-6 mb-12 flex items-center justify-center flex-col">
        <h2 className="h2 pb-6 text-center underline underline-offset-8 decoration-2">
          Our Logo
        </h2>
        <Image src="/mentors-cx.png" width={360} height={120} alt="Logo" />
        <div className="w-full flex justify-center"></div>
        <p className="pb-6 text-lg text-gray-600 mt-6 md:mt-9">
          Our logo is simple. CX is obvious 😀. Inspired by the Mayan
          civilization, number four represents the Cardinal Direction: North,
          East, South, and West. The four horizontal lines across the arrow/line
          portrait that, accompanied by the arrow facing upward to clarify the
          focus on the North. The mentors are providing guidance. Helping
          mentees find the northstar, and both mentors and mentees keep growing
          personally and professionally.{' '}
        </p>

        <p className="text-lg text-gray-600 mt-3">
          You’ll see other subtle Mayan references around. For example, our
          plans are named Eclipse, Moon, and Sun because of the relation Mayans
          had with Astronomy.{' '}
        </p>
      </div>
    </section>
  );
};

export default LogoStory;
