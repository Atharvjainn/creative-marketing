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
import FrameCanvas from "@/components/animations/FrameCanvas";

export const dynamic = "force-dynamic";

export default function Home() {
  return (
    <main>
      <Header />

      {/* Hero, Solutions, and Partners with Lenis + GSAP ScrollTrigger Canvas Sequence */}
      <div id="canvas-scroll-container" className="relative">
        <FrameCanvas
          totalFrames={166}
          frameFolder="/frames_final"
          triggerSelector="#canvas-scroll-container"
          enableBlurFocus={true}
          blurAmount={3.5}
        />
        <div className="relative z-10">
          <Hero />

          {/* Cinematic Canvas Showcase Spacer: allows the background 3D frame animation to play with full unobstructed view */}
          <div className="min-h-[70vh] md:min-h-[100vh] flex items-center justify-center pointer-events-none" />

          <Solutions />
          <Partners />
        </div>
      </div>

      {/* Intermediary Feature Highlights */}
      <Features />
      <KeyFeatures />

      {/* Middle Frame Sequence: Business Solutions & Benefits */}
      <div id="middle-canvas-scroll-container" className="relative">
        <FrameCanvas
          totalFrames={135}
          frameFolder="/frames_middle"
          filePrefix="frame"
          triggerSelector="#middle-canvas-scroll-container"
        />
        <div className="relative z-10">
          <BusinessSolutions />

          {/* Cinematic Middle Spacer: provides clear runway for the 3D animation to play unobstructed */}
          <div className="min-h-[50vh] md:min-h-[80vh] flex items-center justify-center pointer-events-none" />

          <Benefits />
        </div>
      </div>

      {/* Subsequent Website Sections */}
      <Testimonials />
      <Pricing />

      {/* Footer Frame Sequence: CTA & Footer */}
      <div id="footer-canvas-scroll-container" className="relative min-h-[250vh] md:min-h-[280vh]">
        <FrameCanvas
          totalFrames={104}
          frameFolder="/frames_footer"
          filePrefix="frame"
          digits={8}
          triggerSelector="#footer-canvas-scroll-container"
          startTrigger="top center"
          endTrigger="bottom bottom"
        />
        <div className="sticky top-0 min-h-screen flex items-center justify-center relative z-10">
          <CTA />
        </div>
      </div>
    </main>
  );
}
