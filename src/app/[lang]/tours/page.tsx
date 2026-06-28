import TourHero from "@/components/Tour/TourHero/TourHero";
import TourSection from "@/components/Tour/TourSection/TourSection";
import { TourData } from "@/components/Tour/TourCard/TourCard";
import PlanTourCTA from "@/components/PlanTourCTA/PlanTourCTA";
import { getDictionary, Locale } from "../../dictionaries";

interface PageProps {
  params: Promise<{ lang: Locale }>;
  searchParams: Promise<{ season?: string; type?: string }>;
}

// Shapes a raw tour object into the TourData interface
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

export default async function Page({ params, searchParams }: PageProps) {
  const { lang } = await params;
  const { season, type } = await searchParams;
  const dict = await getDictionary(lang);

  const durationOptions = dict.Tours.TourHero.search.duration.options;
  const durationLabels: Record<string, string> = {
    halfDay: durationOptions.halfDay.label,
    fullDay: durationOptions.fullDay.label,
    twoDays: durationOptions.twoDays.label,
  };

  const allRawCategories: any[] = dict.Tours.tours || [];

  // Build section groups — each with a title and list of tours
  let sections: { title: string; tours: TourData[] }[] = [];

  if (season) {
    // ── FILTERED by season ──────────────────────────────────────────────
    // Find the matching category from JSON to get its season label
    const matchedCategory = allRawCategories.find(
      (cat) => cat.category.toLowerCase() === season.toLowerCase()
    );
    const sectionTitle = matchedCategory
      ? `${matchedCategory.category} Tours`   // e.g. "Winter Tours"
      : `${season} Tours`;

    // Collect unique tours that match the season (and optionally type)
    const seen = new Set<string>();
    const tours: TourData[] = [];

    for (const cat of allRawCategories) {
      for (const tour of cat.destinations ?? []) {
        if (seen.has(tour.id)) continue;

        const matchesSeason = tour.seasons?.some(
          (s: string) => s.toLowerCase() === season.toLowerCase()
        );
        const matchesType = type
          ? tour.duration?.toLowerCase() === type.toLowerCase()
          : true;

        if (matchesSeason && matchesType) {
          seen.add(tour.id);
          tours.push(shapeTour(tour, durationLabels));
        }
      }
    }

    sections = [{ title: sectionTitle, tours }];
  } else {
    // ── NO season filter — group by season category from JSON ───────────
    // Respect the order defined in the JSON (Year-round, Winter, Spring…)
    for (const cat of allRawCategories) {
      const seen = new Set<string>();
      const tours: TourData[] = [];

      for (const tour of cat.destinations ?? []) {
        if (seen.has(tour.id)) continue;

        const matchesType = type
          ? tour.duration?.toLowerCase() === type.toLowerCase()
          : true;

        if (matchesType) {
          seen.add(tour.id);
          tours.push(shapeTour(tour, durationLabels));
        }
      }

      if (tours.length > 0) {
        // "Year-round" → "Year-round Tours", "Winter" → "Winter Tours"
        sections.push({
          title: `${cat.category} Tours`,
          tours,
        });
      }
    }
  }

  // Remove any sections that ended up empty
  sections = sections.filter((s) => s.tours.length > 0);

  return (
    <>
      <TourHero dict={dict.Tours.TourHero} />

      {sections.length === 0 ? (
        <div
          className="no-results-message"
          style={{ textAlign: "center", padding: "4rem 1rem" }}
        >
          <p>No tours match your search. Try a different season or duration!</p>
        </div>
      ) : (
        sections.map(({ title, tours }) => (
          <TourSection
            key={title}
            ui={{ ...dict.Tours.ui, sectionTitle: title }}
            tours={tours}
            layout="grid"
          />
        ))
      )}

      <PlanTourCTA dict={dict.PlanTourCTA} />
    </>
  );
}