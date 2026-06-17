import Hero from "@/components/Hero/Hero";
import { getDictionary, Locale } from "../dictionaries";

interface PageProps {
  params: Promise<{ lang: Locale }>;
}

export default async function Page({ params }: PageProps) {
  const { lang } = await params;
  const dict = await getDictionary(lang);

  return (
    <>
      <Hero dict={dict.Hero} />
    </>
  );
}