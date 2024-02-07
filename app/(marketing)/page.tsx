import Faqs from "@/components/home/faq";
import Customers from "@/components/home/customers";
import Clients from "@/components/home/clients";
import CtaHome from "@/components/home/cta-home";
import HeroHome from "@/components/home/HeroHome";
import FeaturesHome from "@/components/home/features-main";
import Companies from "@/components/home/companies";
import News from "./news";

async function getGitHubStars(): Promise<string | null> {
  try {
    const response = await fetch("https://api.github.com/repos/shadcn", {
      headers: {
        Accept: "application/vnd.github+json",
        Authorization: `Bearer random random`,
      },
      next: {
        revalidate: 60,
      },
    });

    if (!response?.ok) {
      return null;
    }

    const json = await response.json();

    return parseInt(json.stargazers_count).toLocaleString();
  } catch (error) {
    return null;
  }
}

export default async function IndexPage() {
  const stars = await getGitHubStars();

  return (
    <>
      <HeroHome />
      <FeaturesHome />
      <Companies />
      {/* <TestimonialsCarousel /> */}
      {/* <Customers /> */}
      <Clients />
      <News />
      <Faqs />
      <CtaHome />
    </>
  );
}
