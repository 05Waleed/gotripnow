import TourHero from "@/components/TourHero/TourHero";
import TourSection from "@/components/TourSection/TourSection";
import { TourData } from "@/components/TourCard/TourCard";
import PlanTourCTA from "@/components/PlanTourCTA/PlanTourCTA";
import { getDictionary, Locale } from "../../dictionaries";

interface PageProps {
  params: Promise<{ lang: Locale }>;
}

export default async function Page({ params }: PageProps) {
  const { lang } = await params;
  const dict = await getDictionary(lang);

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
      <TourHero dict={dict.Hero} />
      {Object.entries(toursByCity).map(([city, tours]) => {
        const template = dict.Tours.ui.sectionTitle || "Tours in {city}";
        const sectionUi = {
          ...dict.Tours.ui,
          sectionTitle: template.replace("{city}", city),
        };
        return (
          <TourSection
            key={city}
            ui={sectionUi}
            tours={tours}
            layout="grid"
          />
        );
      })}
      <PlanTourCTA dict={dict.PlanTourCTA} />
    </>
  );
}