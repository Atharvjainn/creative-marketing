"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface FrameCanvasProps {
  totalFrames?: number;
  frameFolder?: string;
  triggerSelector?: string;
}

export default function FrameCanvas({
  totalFrames = 166,
  frameFolder = "/frames_final",
  triggerSelector = "#canvas-scroll-container",
}: FrameCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const imagesRef = useRef<HTMLImageElement[]>([]);
  const lastDrawnFrameRef = useRef<number>(0);
  const [initialFrameLoaded, setInitialFrameLoaded] = useState(false);

  const getFramePath = (index: number) => {
    const frameNum = String(index + 1).padStart(4, "0");
    return `${frameFolder}/frame-${frameNum}.jpg`;
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    let isDestroyed = false;

    // Helper: Draw image with cover aspect ratio
    const drawImageCover = (img: HTMLImageElement) => {
      if (!canvas || !ctx || !img || !img.complete || img.naturalWidth === 0) return;

      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const width = canvas.clientWidth;
      const height = canvas.clientHeight;

      if (canvas.width !== width * dpr || canvas.height !== height * dpr) {
        canvas.width = width * dpr;
        canvas.height = height * dpr;
      }

      ctx.save();
      ctx.scale(dpr, dpr);

      const imgRatio = img.naturalWidth / img.naturalHeight;
      const canvasRatio = width / height;

      let renderW = width;
      let renderH = height;
      let offsetX = 0;
      let offsetY = 0;

      if (canvasRatio > imgRatio) {
        renderH = width / imgRatio;
        offsetY = (height - renderH) / 2;
      } else {
        renderW = height * imgRatio;
        offsetX = (width - renderW) / 2;
      }

      ctx.clearRect(0, 0, width, height);
      ctx.drawImage(img, offsetX, offsetY, renderW, renderH);
      ctx.restore();
    };

    const renderFrame = (index: number) => {
      const clampedIndex = Math.max(0, Math.min(totalFrames - 1, index));
      const targetImg = imagesRef.current[clampedIndex];

      if (targetImg && targetImg.complete && targetImg.naturalWidth > 0) {
        lastDrawnFrameRef.current = clampedIndex;
        drawImageCover(targetImg);
      } else {
        // Fallback to closest available frame to prevent blank screen
        const fallbackImg = imagesRef.current[lastDrawnFrameRef.current];
        if (fallbackImg && fallbackImg.complete && fallbackImg.naturalWidth > 0) {
          drawImageCover(fallbackImg);
        }
      }
    };

    // 1. Initialize image cache array
    imagesRef.current = new Array(totalFrames);

    // 2. Load Frame 0 immediately for instant render
    const firstImg = new Image();
    firstImg.src = getFramePath(0);
    firstImg.onload = () => {
      if (isDestroyed) return;
      imagesRef.current[0] = firstImg;
      setInitialFrameLoaded(true);
      drawImageCover(firstImg);
    };
    imagesRef.current[0] = firstImg;

    // 3. Preload remaining frames in batches
    for (let i = 1; i < totalFrames; i++) {
      const img = new Image();
      img.src = getFramePath(i);
      img.onload = () => {
        if (isDestroyed) return;
        imagesRef.current[i] = img;
      };
      imagesRef.current[i] = img;
    }

    // 4. Handle Window Resize
    const handleResize = () => {
      const currentImg =
        imagesRef.current[lastDrawnFrameRef.current] || imagesRef.current[0];
      if (currentImg && currentImg.complete && currentImg.naturalWidth > 0) {
        drawImageCover(currentImg);
      }
    };

    window.addEventListener("resize", handleResize);

    // 5. Setup GSAP ScrollTrigger for frame scrubbing and parallax depth
    const triggerEl = document.querySelector(triggerSelector);
    let scrollTriggerInstance: ScrollTrigger | null = null;
    let parallaxTween: gsap.core.Tween | null = null;

    if (triggerEl) {
      // Scrub frames 0 -> 165, reaching 100% when Partners is fully visible on screen
      scrollTriggerInstance = ScrollTrigger.create({
        trigger: triggerEl,
        start: "top top",
        end: "bottom bottom", // Finishes animation when Partners section is fully visible in the viewport
        scrub: 0.5,
        onUpdate: (self) => {
          const targetIndex = Math.round(self.progress * (totalFrames - 1));
          renderFrame(targetIndex);
        },
      });

      // Subtle luxury parallax depth motion as you scroll down
      if (canvasRef.current) {
        parallaxTween = gsap.to(canvasRef.current, {
          yPercent: 8,
          scale: 1.06,
          ease: "none",
          scrollTrigger: {
            trigger: triggerEl,
            start: "top top",
            end: "bottom bottom",
            scrub: 1,
          },
        });
      }
    }

    return () => {
      isDestroyed = true;
      window.removeEventListener("resize", handleResize);
      if (scrollTriggerInstance) {
        scrollTriggerInstance.kill();
      }
      if (parallaxTween) {
        parallaxTween.scrollTrigger?.kill();
        parallaxTween.kill();
      }
    };
  }, [totalFrames, frameFolder, triggerSelector]);

  return (
    <div className="absolute inset-0 pointer-events-none z-0">
      <div className="sticky top-0 left-0 w-full h-screen overflow-hidden pointer-events-none">
        {/* 2D Canvas */}
        <canvas
          ref={canvasRef}
          className={`w-full h-full object-cover transition-opacity duration-700 ${
            initialFrameLoaded ? "opacity-100" : "opacity-0"
          }`}
        />
      </div>
    </div>
  );
}
