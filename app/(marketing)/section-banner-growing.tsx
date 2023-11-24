import Link from 'next/link';
import React from 'react';

const SectionBannerGrowing = () => {
  return (
    <section className="container my-6 py-4 md:py-6 lg:py-12 w-3/4 text-start bg-primary/50 rounded-lg">
      <div className="pl-3">
        <h2 className="text-4xl text-white font-bold md:text-4xl mb-3">
          Get unstuck with mentorship
        </h2>
        <p className="text-xl md:text-2xl text-white text-muted-foreground mb-6">
          Join the community where people help people grow
        </p>

        <Link href="/login">
          <p className="bg-primary px-4 py-3 rounded-full text-white w-fit uppercase">
            {' '}
            Get Growing
          </p>
        </Link>
      </div>
    </section>
  );
};

export default SectionBannerGrowing;
