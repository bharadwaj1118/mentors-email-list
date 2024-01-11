import Intro from "./intro";
import LogoStory from "./logo-story";
import Story from "./story";
import CoreValues from "./values";

export const metadata = {
  title: "About - Simple",
  description: "Page description",
};

export default function About() {
  return (
    <>
      <Intro />
      <Story />
      <CoreValues />
      <LogoStory />
    </>
  );
}
