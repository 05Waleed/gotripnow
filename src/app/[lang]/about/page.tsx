import AboutHeroText from "@/components/AboutHero/Aboutherotext";
import AboutBento from "@/components/AboutHero/Aboutbento";
import HowItWorks from "@/components/HowItWorks/HowItWorks";
import { getDictionary, Locale } from "../../dictionaries";

interface PageProps {
  params: Promise<{ lang: Locale }>;
}

export default async function AboutPage({ params }: PageProps) {
  const { lang } = await params;
  const dict = await getDictionary(lang);

  return (
    <>
      <AboutHeroText dict={dict.AboutPage.hero} />
      <AboutBento dict={dict.AboutPage.bento} />
      <HowItWorks dict={dict.AboutPage.how_it_works} />
    </>
  );
}