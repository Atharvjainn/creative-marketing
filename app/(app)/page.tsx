import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Solutions from "@/components/Solutions";
import Partners from "@/components/Partners";
import Features from "@/components/Features";
import KeyFeatures from "@/components/KeyFeatures";
import BusinessSolutions from "@/components/BusinessSolutions";
import Benefits from "@/components/Benefits";
import Testimonials from "@/components/Testimonials";
import Pricing from "@/components/Pricing";
import CTA from "@/components/CTA";

export const dynamic = "force-dynamic";

export default function Home() {
  return (
    <main>
      <Header />
      <Hero />
      <Solutions />
      <Partners />
      <Features />
      <KeyFeatures />
      <BusinessSolutions />
      <Benefits />
      <Testimonials />
      <Pricing />
      <CTA />
    </main>
  );
}
