import type { Metadata } from "next";
import { PT_Sans } from "next/font/google";
import "../globals.css";
import Navbar from "@/components/Navbar/Navbar";
import Footer from "@/components/Footer/Footer";
import { getDictionary, Locale } from "../dictionaries";

const ptSans = PT_Sans({
  weight: ["400", "700"],
  subsets: ["latin"],
  variable: "--font-pt-sans",
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
  params: Promise<{ lang: Locale }>; // Use your strict type here
}>) {
  const { lang } = await params;
  const dict = await getDictionary(lang); // Fetch global translations here

  return (
    <html lang={lang} className={`${ptSans.variable}`}>
      <body className="antialiased flex flex-col min-h-screen">
        {/* Pass the Navbar dict to your navbar */}
        <Navbar dict={dict.Navbar} />
        
        <main className="flex-grow">
          {children}
        </main>
        
        {/* Pass Footer dict here once you make a Footer.json */}
        <Footer dict={dict.Footer}/>
      </body>
    </html>
  );
}