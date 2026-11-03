import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Approach from "@/components/Approach";
import Capabilities from "@/components/Capabilities";
import ProblemFirst from "@/components/ProblemFirst";
import About from "@/components/About";
import Insights from "@/components/Insights";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Header />
      <main id="main">
        <Hero />
        <Approach />
        <Capabilities />
        <ProblemFirst />
        <About />
        <Insights />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
