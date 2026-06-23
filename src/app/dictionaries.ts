import "server-only";

export type Locale = "en" | "de" | "fr" | "it";

const loaders = {
  en: {
    Hero: () => import("../dictionaries/en/Hero.json").then((m) => m.default),
    Navbar: () => import("../dictionaries/en/Navbar.json").then((m) => m.default),
    Footer: () => import("../dictionaries/en/Footer.json").then((m) => m.default),
    Tours: () => import("../dictionaries/en/Tours.json").then((m) => m.default),
    Whyus: () => import("../dictionaries/en/Whyus.json").then((m) => m.default),
    Reviews: () => import("../dictionaries/en/Reviews.json").then((m) => m.default),
    VideoDay: () => import("../dictionaries/en/VideoDay.json").then((m) => m.default),
    PlanTourCTA: () => import("../dictionaries/en/PlanTourCTA.json").then((m) => m.default),
    AboutPage: () => import("../dictionaries/en/AboutPage.json").then((m) => m.default),
  },
  de: {
    Hero: () => import("../dictionaries/de/Hero.json").then((m) => m.default),
    Navbar: () => import("../dictionaries/de/Navbar.json").then((m) => m.default),
    Footer: () => import("../dictionaries/de/Footer.json").then((m) => m.default),
    Tours: () => import("../dictionaries/de/Tours.json").then((m) => m.default),
    Whyus: () => import("../dictionaries/de/Whyus.json").then((m) => m.default),
    Reviews: () => import("../dictionaries/de/Reviews.json").then((m) => m.default),
    VideoDay: () => import("../dictionaries/de/VideoDay.json").then((m) => m.default),
    PlanTourCTA: () => import("../dictionaries/de/PlanTourCTA.json").then((m) => m.default),
    AboutPage: () => import("../dictionaries/de/AboutPage.json").then((m) => m.default),
  },
  fr: {
    Hero: () => import("../dictionaries/fr/Hero.json").then((m) => m.default),
    Navbar: () => import("../dictionaries/fr/Navbar.json").then((m) => m.default),
    Footer: () => import("../dictionaries/fr/Footer.json").then((m) => m.default),
    Tours: () => import("../dictionaries/fr/Tours.json").then((m) => m.default),
    Whyus: () => import("../dictionaries/fr/Whyus.json").then((m) => m.default),
    Reviews: () => import("../dictionaries/fr/Reviews.json").then((m) => m.default),
    VideoDay: () => import("../dictionaries/fr/VideoDay.json").then((m) => m.default),
    PlanTourCTA: () => import("../dictionaries/fr/PlanTourCTA.json").then((m) => m.default),
    AboutPage: () => import("../dictionaries/fr/AboutPage.json").then((m) => m.default),
  },
  it: {
    Hero: () => import("../dictionaries/it/Hero.json").then((m) => m.default),
    Navbar: () => import("../dictionaries/it/Navbar.json").then((m) => m.default),
    Footer: () => import("../dictionaries/it/Footer.json").then((m) => m.default),
    Tours: () => import("../dictionaries/it/Tours.json").then((m) => m.default),
    Whyus: () => import("../dictionaries/it/Whyus.json").then((m) => m.default),
    Reviews: () => import("../dictionaries/it/Reviews.json").then((m) => m.default),
    VideoDay: () => import("../dictionaries/it/VideoDay.json").then((m) => m.default),
    PlanTourCTA: () => import("../dictionaries/it/PlanTourCTA.json").then((m) => m.default),
    AboutPage: () => import("../dictionaries/it/AboutPage.json").then((m) => m.default),
  },
};

export const getDictionary = async (locale: Locale) => {
  const currentLoader = loaders[locale] || loaders.en;
  const [
    heroData,
    navbarData,
    footerData,
    toursData,
    whyusData,
    reviewsData,
    videoDayData,
    planTourCTAData,
    aboutPageData,
  ] = await Promise.all([
    currentLoader.Hero(),
    currentLoader.Navbar(),
    currentLoader.Footer(),
    currentLoader.Tours(),
    currentLoader.Whyus(),
    currentLoader.Reviews(),
    currentLoader.VideoDay(),
    currentLoader.PlanTourCTA(),
    currentLoader.AboutPage(),
  ]);

  return {
    Hero: heroData,
    Navbar: navbarData,
    Footer: footerData,
    Tours: toursData,
    Whyus: whyusData,
    Reviews: reviewsData,
    VideoDay: videoDayData,
    PlanTourCTA: planTourCTAData,
    AboutPage: aboutPageData,
  };
};