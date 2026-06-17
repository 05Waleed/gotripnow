import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "../globals.css";
import Navbar from "@/components/Navbar/Navbar";
import Footer from "@/components/Footer/Footer";
import { getDictionary, Locale } from "../dictionaries";

// Configured Montserrat cleanly with your required light weights
const montserrat = Montserrat({
  weight: ["100", "200", "300", "400", "700"],
  subsets: ["latin"],
  variable: "--font-montserrat",
});

export const metadata: Metadata = {
  title: "GoTripNow",
  description: "Book your next trip",
};

export default async function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ lang: string }>; 
}>) {
  const resolvedParams = await params;
  const lang = resolvedParams.lang as Locale;

  const dict = await getDictionary(lang);

  return (
    <html lang={lang} className={`${montserrat.variable}`}>
      <body className="antialiased flex flex-col min-h-screen">
        <Navbar dict={dict.Navbar} />

        <main className="flex-grow">
          {children}
        </main>

        <Footer dict={dict.Footer} />
      </body>
    </html>
  );
}