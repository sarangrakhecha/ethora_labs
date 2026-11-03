import Hero from "@/components/Hero";
import Approach from "@/components/Approach";
import Capabilities from "@/components/Capabilities";
import ProblemFirst from "@/components/ProblemFirst";
import ProductsShowcase from "@/components/ProductsShowcase";
import HomeContactCta from "@/components/HomeContactCta";
import About from "@/components/About";

export default function Home() {
  return (
    <>
      <Hero />
      <Approach />
      <Capabilities />
      <ProblemFirst />
      <ProductsShowcase />
      <About />
      <HomeContactCta />
    </>
  );
}
