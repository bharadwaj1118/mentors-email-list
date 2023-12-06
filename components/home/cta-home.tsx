import Link from 'next/link';

export default function CtaDark() {
  return (
    <section className="bg-slate-900">
      <div className="relative max-w-6xl mx-auto px-4 sm:px-6">
        <div className="py-12 md:py-20">
          <div className="relative max-w-5xl mx-auto text-center">
            <div className="relative">
              <h2 className="h2 font-playfair-display text-slate-100 mb-4">
                Say goodbye to roadblocks, guesswork, and frustration.
              </h2>

              <p className="text-xl text-slate-400 mb-8">
                Join Mentors CX and start{' '}
                <span className="text-emerald-500">
                  building your career today
                </span>
                .
              </p>
              <div>
                <Link
                  className="btn text-white bg-blue-600 hover:bg-blue-700 group"
                  href="/request-demo"
                >
                  Get started{' '}
                  <span className="tracking-normal text-white text-xl group-hover:translate-x-0.5 transition-transform duration-150 ease-in-out ml-3">
                    &gt;
                  </span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
