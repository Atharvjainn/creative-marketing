"use client";

import { useEffect, useState } from "react";

interface HeaderClientProps {
  brandName: string;
  navigation: Array<{ label: string; url: string }>;
  cta: { label: string; url: string };
}

export default function HeaderClient({
  brandName,
  navigation,
  cta,
}: HeaderClientProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
      style={{
        background: scrolled ? "rgba(0,0,0,0.85)" : "transparent",
        backdropFilter: scrolled ? "blur(12px)" : "none",
        WebkitBackdropFilter: scrolled ? "blur(12px)" : "none",
      }}
    >
      <div
        className="max-w-[1400px] w-full flex items-center justify-between"
        style={{
          marginLeft: "auto",
          marginRight: "auto",
          paddingLeft: "24px",
          paddingRight: "24px",
          paddingTop: "16px",
          paddingBottom: "16px",
        }}
      >
        {/* Logo */}
        <a href="#" className="text-white text-[15px] font-medium tracking-tight">
          {brandName}
        </a>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8">
          {navigation.map((item) => (
            <a
              key={item.label}
              href={item.url}
              className="text-white/90 text-[14px] hover:text-white transition-colors"
            >
              {item.label}
            </a>
          ))}
          <a
            href={cta.url}
            className="flex items-center gap-2 bg-black text-white px-5 py-2.5 rounded-full text-[14px] font-medium hover:bg-neutral-900 transition-colors"
          >
            {cta.label}
            <span className="w-5 h-5 rounded-full bg-white flex items-center justify-center text-black text-xs font-bold">
              ›
            </span>
          </a>
        </nav>

        {/* Mobile hamburger */}
        <button
          className="md:hidden text-white p-2"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          <div className="w-6 h-0.5 bg-white mb-1.5 transition-all" />
          <div className="w-6 h-0.5 bg-white mb-1.5 transition-all" />
          <div className="w-6 h-0.5 bg-white transition-all" />
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="md:hidden bg-black/95 backdrop-blur-lg px-6 py-6 flex flex-col gap-4">
          {navigation.map((item) => (
            <a
              key={item.label}
              href={item.url}
              className="text-white text-[16px]"
              onClick={() => setMobileOpen(false)}
            >
              {item.label}
            </a>
          ))}
          <a
            href={cta.url}
            className="inline-flex items-center gap-2 bg-white text-black px-5 py-2.5 rounded-full text-[14px] font-medium w-fit"
            onClick={() => setMobileOpen(false)}
          >
            {cta.label} ›
          </a>
        </div>
      )}
    </header>
  );
}
