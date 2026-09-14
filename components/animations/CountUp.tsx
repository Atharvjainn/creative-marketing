"use client";

import React, { useEffect, useRef, useState } from "react";

interface CountUpProps {
  value: string;
  duration?: number;
  className?: string;
  style?: React.CSSProperties;
}

export default function CountUp({
  value,
  duration = 1600,
  className = "",
  style,
}: CountUpProps) {
  const [displayValue, setDisplayValue] = useState("0");
  const [hasAnimated, setHasAnimated] = useState(false);
  const elementRef = useRef<HTMLSpanElement>(null);

  // Parse prefix, number, decimal places, and suffix
  // Examples: "+48%" -> prefix: "+", num: 48, suffix: "%"
  // "-21%" -> prefix: "-", num: 21, suffix: "%"
  // "10K+" -> prefix: "", num: 10, suffix: "K+"
  // "21+" -> prefix: "", num: 21, suffix: "+"
  const parseValue = (raw: string) => {
    const match = raw.match(/^([^0-9.-]*)([0-9,.]+)(.*)$/);
    if (!match) {
      return { prefix: "", targetNum: null, suffix: raw, decimals: 0 };
    }
    const prefix = match[1] || "";
    const numStr = match[2].replace(/,/g, "");
    const targetNum = parseFloat(numStr);
    const suffix = match[3] || "";
    const decimals = numStr.includes(".") ? numStr.split(".")[1].length : 0;
    return { prefix, targetNum, suffix, decimals };
  };

  useEffect(() => {
    const { prefix, targetNum, suffix, decimals } = parseValue(value);

    if (targetNum === null || isNaN(targetNum)) {
      setDisplayValue(value);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasAnimated) {
            setHasAnimated(true);

            const startTime = performance.now();
            const startVal = 0;

            const animate = (currentTime: number) => {
              const elapsed = currentTime - startTime;
              const progress = Math.min(elapsed / duration, 1);

              // Ease out quart: 1 - (1 - x)^4
              const easeProgress = 1 - Math.pow(1 - progress, 4);
              const currentNum = startVal + (targetNum - startVal) * easeProgress;

              const formatted =
                decimals > 0
                  ? currentNum.toFixed(decimals)
                  : Math.round(currentNum).toString();

              setDisplayValue(`${prefix}${formatted}${suffix}`);

              if (progress < 1) {
                requestAnimationFrame(animate);
              } else {
                setDisplayValue(value);
              }
            };

            requestAnimationFrame(animate);
            if (elementRef.current) {
              observer.unobserve(elementRef.current);
            }
          }
        });
      },
      { threshold: 0.2 }
    );

    const currentEl = elementRef.current;
    if (currentEl) {
      observer.observe(currentEl);
    }

    return () => {
      if (currentEl) {
        observer.unobserve(currentEl);
      }
    };
  }, [value, duration, hasAnimated]);

  return (
    <span ref={elementRef} className={className} style={style}>
      {hasAnimated ? displayValue : value}
    </span>
  );
}
