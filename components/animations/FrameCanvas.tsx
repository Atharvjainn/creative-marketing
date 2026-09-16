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
  filePrefix?: string;
  digits?: number;
  triggerSelector?: string;
  startTrigger?: string;
  endTrigger?: string;
  parallaxStartY?: number;
  parallaxEndY?: number;
  scaleStart?: number;
  scaleEnd?: number;
  enableBlurFocus?: boolean;
  blurAmount?: number;
}

export default function FrameCanvas({
  totalFrames = 166,
  frameFolder = "/frames_final",
  filePrefix = "frame-",
  digits = 4,
  triggerSelector = "#canvas-scroll-container",
  startTrigger = "top top",
  endTrigger = "bottom bottom",
  parallaxStartY = 0,
  parallaxEndY = 8,
  scaleStart = 1.0,
  scaleEnd = 1.06,
  enableBlurFocus = false,
  blurAmount = 3.5,
}: FrameCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const imagesRef = useRef<HTMLImageElement[]>([]);
  const lastDrawnFrameRef = useRef<number>(0);
  const [initialFrameLoaded, setInitialFrameLoaded] = useState(false);

  const getFramePath = (index: number) => {
    const frameNum = String(index + 1).padStart(digits, "0");
    return `${frameFolder}/${filePrefix}${frameNum}.jpg`;
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
      ScrollTrigger.refresh();
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

    if (canvasRef.current && enableBlurFocus) {
      gsap.set(canvasRef.current, { filter: `blur(${blurAmount}px)` });
    }

    if (triggerEl) {
      // Scrub frames across start and end boundaries with instant bidirectional response
      scrollTriggerInstance = ScrollTrigger.create({
        trigger: triggerEl,
        start: startTrigger,
        end: endTrigger,
        scrub: true,
        onUpdate: (self) => {
          const targetIndex = Math.round(self.progress * (totalFrames - 1));
          renderFrame(targetIndex);

          // Clear blur as soon as user scrolls down
          if (enableBlurFocus && canvasRef.current && self.progress > 0.02) {
            gsap.to(canvasRef.current, {
              filter: "blur(0px)",
              duration: 0.4,
              ease: "power2.out",
              overwrite: "auto",
            });
          }
        },
      });

      // Subtle luxury parallax depth motion as you scroll down
      if (canvasRef.current) {
        parallaxTween = gsap.fromTo(
          canvasRef.current,
          {
            yPercent: parallaxStartY,
            scale: scaleStart,
          },
          {
            yPercent: parallaxEndY,
            scale: scaleEnd,
            ease: "none",
            scrollTrigger: {
              trigger: triggerEl,
              start: startTrigger,
              end: endTrigger,
              scrub: 1,
            },
          }
        );
      }
    }

    // 6. Disc Blur Focus on Hover (Hero section only)
    let handlePointerMove: ((e: MouseEvent) => void) | null = null;

    if (enableBlurFocus && canvasRef.current) {
      handlePointerMove = (e: MouseEvent) => {
        const cx = window.innerWidth / 2;
        const cy = window.innerHeight / 2;
        const normX = (e.clientX - cx) / cx; // -1 to +1
        const normY = (e.clientY - cy) / cy; // -1 to +1
        const dist = Math.sqrt(normX * normX + normY * normY);

        const currentProgress = scrollTriggerInstance?.progress || 0;
        if (currentProgress < 0.03) {
          if (dist < 0.75) {
            gsap.to(canvasRef.current, {
              filter: "blur(0px)",
              duration: 0.5,
              ease: "power2.out",
              overwrite: "auto",
            });
          } else {
            gsap.to(canvasRef.current, {
              filter: `blur(${blurAmount}px)`,
              duration: 0.8,
              ease: "power2.out",
              overwrite: "auto",
            });
          }
        }
      };

      window.addEventListener("mousemove", handlePointerMove, { passive: true });
    }

    return () => {
      isDestroyed = true;
      window.removeEventListener("resize", handleResize);
      if (handlePointerMove) {
        window.removeEventListener("mousemove", handlePointerMove);
      }
      if (scrollTriggerInstance) {
        scrollTriggerInstance.kill();
      }
      if (parallaxTween) {
        parallaxTween.scrollTrigger?.kill();
        parallaxTween.kill();
      }
    };
  }, [
    totalFrames,
    frameFolder,
    filePrefix,
    digits,
    triggerSelector,
    startTrigger,
    endTrigger,
    parallaxStartY,
    parallaxEndY,
    scaleStart,
    scaleEnd,
    enableBlurFocus,
    blurAmount,
  ]);

  return (
    <div className="absolute inset-0 pointer-events-none z-0">
      <div className="sticky top-0 left-0 w-full h-screen overflow-hidden pointer-events-none">
        {/* 2D Canvas */}
        <canvas
          ref={canvasRef}
          style={
            enableBlurFocus
              ? { filter: `blur(${blurAmount}px)` }
              : undefined
          }
          className="w-full h-full object-cover will-change-[transform,filter]"
        />
      </div>
    </div>
  );
}
