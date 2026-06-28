import Hero from "@/components/Hero/Hero";
import TourSection from "@/components/Tour/TourSection/TourSection";
import CitiesShortcut from "@/components/CitiesShortcut/CitiesShortcut";
import { getDictionary, Locale } from "../dictionaries";
import { TourData } from "@/components/Tour/TourCard/TourCard";
import Whyus from "@/components/Whyus/Whyus";
import Reviews from "@/components/Reviews/Reviews";
import VideoDay from "@/components/VideoDay/VideoDay";
import PlanTourCTA from "@/components/PlanTourCTA/PlanTourCTA";

interface PageProps {
  params: Promise<{ lang: Locale }>;
}

function shapeTour(tour: any, durationLabels: Record<string, string>): TourData {
  return {
    id: tour.id,
    name: tour.name,
    city: tour.city,
    duration: tour.duration,
    durationLabel: durationLabels[tour.duration] ?? tour.duration,
    price: tour.price,
    rating: tour.rating,
    reviewCount: tour.reviewCount,
    seasons: tour.seasons,
    is_highlight: tour.is_highlight ?? false,
    notes: tour.notes ?? "",
    imageUrl: tour.imageUrl ?? "/assets/city-img-1.jpg",
  };
}

export default async function Page({ params }: PageProps) {
  const { lang } = await params;
  const dict = await getDictionary(lang);

  const durationOptions = dict.Tours.TourHero.search.duration.options;
  const durationLabels: Record<string, string> = {
    halfDay: durationOptions.halfDay.label,
    fullDay: durationOptions.fullDay.label,
    twoDays: durationOptions.twoDays.label,
  };

  const allRawCategories: any[] = dict.Tours.tours || [];

  // Group by season category, deduplicated within each group
  const sections = allRawCategories
    .map((cat) => {
      const seen = new Set<string>();
      const tours: TourData[] = [];
      for (const tour of cat.destinations ?? []) {
        if (seen.has(tour.id)) continue;
        seen.add(tour.id);
        tours.push(shapeTour(tour, durationLabels));
      }
      return { title: `${cat.category} Tours`, tours };
    })
    .filter((s) => s.tours.length > 0);

  return (
    <>
      {/* redirectTo sends search results to the tours page */}
      <Hero dict={dict.Hero} redirectTo={`/${lang}/tours`} />
      <CitiesShortcut dict={dict.Tours.citiesShortcut} />

      {sections.map(({ title, tours }) => (
        <TourSection
          key={title}
          ui={{ ...dict.Tours.ui, sectionTitle: title }}
          tours={tours}
        />
      ))}

      <VideoDay dict={dict.VideoDay} youtubeId="lzCdg7zfCY0" />
      <Whyus dict={dict.Whyus} />
      <Reviews dict={dict.Reviews} />
      <PlanTourCTA dict={dict.PlanTourCTA} />
    </>
  );
}