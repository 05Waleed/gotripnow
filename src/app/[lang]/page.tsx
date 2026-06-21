import Hero from "@/components/Hero/Hero";
import TourSection from "@/components/TourSection/TourSection";
import CitiesShortcut from "@/components/CitiesShortcut/CitiesShortcut";
import { getDictionary, Locale } from "../dictionaries";
import { TourData } from "@/components/TourCard/TourCard";

interface PageProps {
  params: Promise<{ lang: Locale }>;
}

export default async function Page({ params }: PageProps) {
  const { lang } = await params;
  const dict = await getDictionary(lang);

  // Group tours by city directly out of the shared file
  const toursByCity = dict.Tours.tours.reduce<Record<string, TourData[]>>(
    (acc, tour) => {
      if (!acc[tour.city]) acc[tour.city] = [];
      acc[tour.city].push(tour as TourData);
      return acc;
    },
    {}
  );

  return (
    <>
      <Hero dict={dict.Hero} />

      {/* Pass the consolidated citiesShortcut block down */}
      <CitiesShortcut dict={dict.Tours.citiesShortcut} />

      {Object.entries(toursByCity).map(([city, tours]) => {
        const template = dict.Tours.ui.sectionTitle || "Tours in {city}";
        const sectionUi = {
          ...dict.Tours.ui,
          sectionTitle: template.replace("{city}", city)
        };

        return (
          <TourSection
            key={city}
            ui={sectionUi}
            tours={tours}
          />
        );
      })}
    </>
  );
}