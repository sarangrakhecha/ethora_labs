import type { Metadata, Viewport } from "next";
import { DM_Sans, Instrument_Serif } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const serif = Instrument_Serif({ subsets: ["latin"], weight: "400", style: ["normal", "italic"], variable: "--font-instrument-serif", display: "swap" });
const sans = DM_Sans({ subsets: ["latin"], variable: "--font-dm-sans", display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL("https://ethoralabs.co"),
  title: "Ethora Labs | Engineering-led technology consultancy",
  description: "Ethora Labs is an engineering-led technology consultancy that designs, builds, tests, and improves software, with a focus on quality, reliability, and lasting value.",
  icons: { icon: "/favicon.svg" },
  openGraph: { title: "Ethora Labs", description: "Built on Principles. Driven by Possibility.", url: "https://ethoralabs.co", siteName: "Ethora Labs", type: "website" },
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
