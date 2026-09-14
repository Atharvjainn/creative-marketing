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
        background: scrolled ? "rgba(10, 2, 0, 0.88)" : "transparent",
        backdropFilter: scrolled ? "blur(16px)" : "none",
        WebkitBackdropFilter: scrolled ? "blur(16px)" : "none",
        borderBottom: scrolled
          ? "1px solid rgba(255, 255, 255, 0.08)"
          : "1px solid transparent",
      }}
    >
      <div
        className="max-w-[1400px] w-full flex items-center justify-between mx-auto px-6 py-4"
      >
        {/* Logo */}
        <a
          href="#"
          className="text-white text-[15px] font-semibold tracking-tight hover:opacity-90 transition-opacity flex items-center gap-2"
        >
          <span className="w-2 h-2 rounded-full bg-orange-500 animate-pulse" />
          {brandName}
        </a>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8">
          {navigation.map((item) => (
            <a
              key={item.label}
              href={item.url}
              className="text-white/80 text-[14px] hover:text-white transition-all duration-200 relative group py-1"
            >
              {item.label}
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-orange-500 transition-all duration-200 group-hover:w-full" />
            </a>
          ))}
          <a
            href={cta.url}
            className="group flex items-center gap-2 bg-white text-black px-5 py-2.5 rounded-full text-[14px] font-medium hover:bg-neutral-100 hover:shadow-lg hover:shadow-orange-500/10 transition-all duration-200"
          >
            {cta.label}
            <span className="w-5 h-5 rounded-full bg-black flex items-center justify-center text-white text-xs font-bold transition-transform duration-200 group-hover:translate-x-0.5">
              ›
            </span>
          </a>
        </nav>

        {/* Mobile hamburger */}
        <button
          className="md:hidden text-white p-2 rounded-lg hover:bg-white/10 transition-colors"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
          aria-expanded={mobileOpen}
        >
          <div
            className={`w-6 h-0.5 bg-white transition-all duration-300 ${
              mobileOpen ? "rotate-45 translate-y-2" : "mb-1.5"
            }`}
          />
          <div
            className={`w-6 h-0.5 bg-white transition-all duration-300 ${
              mobileOpen ? "opacity-0" : "mb-1.5"
            }`}
          />
          <div
            className={`w-6 h-0.5 bg-white transition-all duration-300 ${
              mobileOpen ? "-rotate-45 -translate-y-2" : ""
            }`}
          />
        </button>
      </div>

      {/* Mobile Menu Drawer */}
      {mobileOpen && (
        <div className="md:hidden bg-black/95 backdrop-blur-2xl border-b border-white/10 px-6 py-8 flex flex-col gap-5 animate-fadeInUp">
          {navigation.map((item) => (
            <a
              key={item.label}
              href={item.url}
              className="text-white/90 hover:text-white text-[17px] font-medium transition-colors"
              onClick={() => setMobileOpen(false)}
            >
              {item.label}
            </a>
          ))}
          <div className="pt-4 border-t border-white/10">
            <a
              href={cta.url}
              className="inline-flex items-center justify-center gap-2 bg-white text-black px-6 py-3 rounded-full text-[15px] font-medium w-full shadow-lg shadow-orange-500/10"
              onClick={() => setMobileOpen(false)}
            >
              {cta.label} ›
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
