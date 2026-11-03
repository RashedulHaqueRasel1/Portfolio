import type { Metadata, Viewport } from "next";
import { Inter, Instrument_Serif, JetBrains_Mono } from "next/font/google";
import SmoothScroll from "@/components/SmoothScroll";
import Preloader from "@/components/Preloader";
import Navbar from "@/components/Navbar/Navbar";
import RisingLines from "@/components/RisingLines";
import ScrollProgress from "@/components/ui/ScrollProgress";
import { SITE } from "@/lib/site";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const instrument = Instrument_Serif({
  variable: "--font-instrument",
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
});

const mono = JetBrains_Mono({
  variable: "--font-jetbrains",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: `${SITE.name} — ${SITE.role}`,
    template: `%s — ${SITE.shortName}`,
  },
  description: SITE.description,
  keywords: [
    "Rashedul Haque Rasel",
    "Frontend Developer",
    "Full Stack Developer",
    "MERN Stack",
    "React",
    "Next.js",
    "TypeScript",
    "Portfolio",
    "Bangladesh",
  ],
  authors: [{ name: SITE.name }],
  openGraph: {
    type: "website",
    title: `${SITE.name} — ${SITE.role}`,
    description: SITE.description,
    siteName: SITE.name,
    images: [{ url: "/images/Rashedul_Haque_Rasel.png", alt: SITE.name }],
  },
  twitter: {
    card: "summary_large_image",
    title: `${SITE.name} — ${SITE.role}`,
    description: SITE.description,
    images: ["/images/Rashedul_Haque_Rasel.png"],
  },
};

export const viewport: Viewport = {
  themeColor: "#0b0b0c",
  colorScheme: "dark",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${inter.variable} ${instrument.variable} ${mono.variable}`}>
      <body suppressHydrationWarning>
        <SmoothScroll>
          <Preloader />
          <ScrollProgress />
          <RisingLines />
          <Navbar />
          {children}
        </SmoothScroll>
      </body>
    </html>
  );
}
