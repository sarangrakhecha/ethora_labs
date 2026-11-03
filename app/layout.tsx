import type { Metadata, Viewport } from "next";
import { DM_Sans, Instrument_Serif } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const serif = Instrument_Serif({ subsets: ["latin"], weight: "400", style: ["normal", "italic"], variable: "--font-instrument-serif", display: "swap" });
const sans = DM_Sans({ subsets: ["latin"], variable: "--font-dm-sans", display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL("https://ethoralabs.co"),
  title: "Ethora Labs | Software Engineering, Quality & IT Consulting",
  description: "Engineering-led IT consulting: custom software development, quality engineering, test automation and CI/CD. Ethora Labs helps teams build software that works, scales and lasts.",
  icons: { icon: "/favicon.svg" },
  openGraph: {
    title: "Ethora Labs | Software Engineering, Quality & IT Consulting",
    description: "Engineering-led IT consulting: custom software development, quality engineering, test automation and CI/CD.",
    url: "https://ethoralabs.co", siteName: "Ethora Labs", type: "website", locale: "en_IN",
    images: [{ url: "/og.png", width: 1200, height: 630, alt: "Ethora Labs — Built on Principles. Driven by Possibility." }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Ethora Labs | Software Engineering, Quality & IT Consulting",
    description: "Engineering-led IT consulting: custom software development, quality engineering, test automation and CI/CD.",
    images: ["/og.png"],
  },
};
export const viewport: Viewport = { themeColor: "#101C2A" };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${serif.variable} ${sans.variable}`}>
      <head>
        {/* Enables scroll-reveal only when JS runs, so content is never hidden without it. */}
        <script dangerouslySetInnerHTML={{ __html: "document.documentElement.classList.add('js')" }} />
      </head>
      <body>
        <Header />
        <main id="main">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
