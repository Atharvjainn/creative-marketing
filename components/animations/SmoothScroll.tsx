"use client";

import { useEffect } from "react";
import { ReactLenis, useLenis } from "lenis/react";
import "lenis/dist/lenis.css";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

function ScrollTriggerSync() {
  useLenis(() => {
    ScrollTrigger.update();
  });

  useEffect(() => {
    ScrollTrigger.refresh();
  }, []);

  return null;
}

interface SmoothScrollProps {
  children: React.ReactNode;
}

export default function SmoothScroll({ children }: SmoothScrollProps) {
  return (
    <ReactLenis
      root
      options={{
        lerp: 0.1,
        duration: 1.2,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        orientation: "vertical",
        gestureOrientation: "vertical",
        smoothWheel: true,
        touchMultiplier: 1.8,
        wheelMultiplier: 1,
        infinite: false,
      }}
    >
      <ScrollTriggerSync />
      {children}
    </ReactLenis>
  );
}
