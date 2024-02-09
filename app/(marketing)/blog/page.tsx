import { allPosts } from "contentlayer/generated";
import PostItem from "@/components/post-item";
import PopularPosts from "./popular-posts";
import Topics from "./topics";

export const metadata = {
  title: "Blog - Simple",
  description: "Page description",
};

export default function Blog() {
  // Sort posts by date
  allPosts.sort((a, b) => {
    return new Date(a.publishedAt) > new Date(b.publishedAt) ? -1 : 1;
  });

  return (
    <section>
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="pt-20 pb-3 md:pt-24 md:pb-6">
          {/* Page header */}
          {/* <div className="max-w-3xl pb-4 md:pb-4 text-center md:text-left">
            <h1 className="h1 mb-4">Type the way you talk</h1>
            <p className="text-xl text-gray-600">
              Stay up to date on the latest from Simple and best news from the
              Dev world.
            </p>
          </div> */}

          {/* <h1 className="h2 mb-4">Type the way you talk</h1> */}

          {/* Main content */}
          <div className="md:flex md:justify-between">
            {/* Articles container */}
            <div className="md:grow -mt-4">
              <PostItem />
            </div>

            {/* Sidebar */}
            <aside className="relative mt-12 md:mt-0 md:w-64 md:ml-12 lg:ml-20 md:shrink-0">
              <PopularPosts />
              {/* <Topics /> */}
            </aside>
          </div>
        </div>
      </div>
    </section>
  );
}
