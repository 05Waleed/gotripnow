import "server-only";

export type Locale = "en" | "de" | "fr" | "it";

const loaders = {
  en: {
    Hero: () => import("../dictionaries/en/Hero.json").then((m) => m.default),
    Navbar: () => import("../dictionaries/en/Navbar.json").then((m) => m.default),
    Footer: () => import("../dictionaries/en/Footer.json").then((m) => m.default),
  },
  de: {
    Hero: () => import("../dictionaries/de/Hero.json").then((m) => m.default),
    Navbar: () => import("../dictionaries/de/Navbar.json").then((m) => m.default),
    Footer: () => import("../dictionaries/de/Footer.json").then((m) => m.default),
  },
  fr: {
    Hero: () => import("../dictionaries/fr/Hero.json").then((m) => m.default),
    Navbar: () => import("../dictionaries/fr/Navbar.json").then((m) => m.default),
    Footer: () => import("../dictionaries/fr/Footer.json").then((m) => m.default),
  },
  it: {
    Hero: () => import("../dictionaries/it/Hero.json").then((m) => m.default),
    Navbar: () => import("../dictionaries/it/Navbar.json").then((m) => m.default),
    Footer: () => import("../dictionaries/it/Footer.json").then((m) => m.default),
  },
};

export const getDictionary = async (locale: Locale) => {
  const currentLoader = loaders[locale] || loaders.en;

  const [heroData, navbarData, footerData] = await Promise.all([
    currentLoader.Hero(),
    currentLoader.Navbar(),
    currentLoader.Footer(),
  ]);

  return {
    Hero: heroData,
    Navbar: navbarData,
    Footer: footerData,
  };
};