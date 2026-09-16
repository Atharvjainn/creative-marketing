"use client";

import { useState } from "react";

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
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-transparent transition-colors duration-300">
      <div className="max-w-[1400px] w-full mx-auto flex items-center justify-between px-6 py-5">
        {/* Logo */}
        <a
          href="#"
          className="
            text-white
            text-[22px]
            font-medium
            tracking-[-0.03em]
            leading-none
            hover:opacity-90
            transition-opacity
          "
        >
          {brandName}
        </a>

        {/* Desktop Navigation */}
        <nav
          className="
            hidden md:flex
            items-center
            rounded-[18px]
            overflow-hidden
            bg-white/[0.12]
            backdrop-blur-sm
            border border-white/[0.0]
          "
        >
          {navigation.map((item) => (
            <a
              key={item.label}
              href={item.url}
              className="
                px-6
                py-4
                text-white
                text-[14px]
                font-normal
                whitespace-nowrap
                transition-colors
                duration-300
                hover:bg-white/[0.08]
              "
            >
              {item.label}
            </a>
          ))}

          {/* CTA */}
          <a
            href={cta.url}
            className="
              group
              flex
              items-center
              gap-3
              mr-1
              my-1
              px-6
              py-3
              rounded-[14px]
              bg-black
              text-white
              text-[14px]
              font-medium
              whitespace-nowrap
              transition-transform
              duration-300
              hover:scale-[0.98]
            "
          >
            <span>{cta.label}</span>

            <span
              className="
                flex
                items-center
                justify-center
                w-6
                h-6
                rounded-full
                bg-white
                text-black
                text-[15px]
                leading-none
                transition-transform
                duration-300
                group-hover:translate-x-0.5
              "
            >
              →
            </span>
          </a>
        </nav>

        {/* Mobile Hamburger */}
        <button
          className="
            md:hidden
            text-white
            p-2
            rounded-lg
            hover:bg-white/10
            transition-colors
          "
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
          aria-expanded={mobileOpen}
        >
          <div
            className={`w-6 h-0.5 bg-white transition-all duration-300 ${mobileOpen
              ? "rotate-45 translate-y-2"
              : "mb-1.5"
              }`}
          />

          <div
            className={`w-6 h-0.5 bg-white transition-all duration-300 ${mobileOpen
              ? "opacity-0"
              : "mb-1.5"
              }`}
          />

          <div
            className={`w-6 h-0.5 bg-white transition-all duration-300 ${mobileOpen
              ? "-rotate-45 -translate-y-2"
              : ""
              }`}
          />
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div
          className="
            md:hidden
            bg-black/95
            backdrop-blur-2xl
            border-b
            border-white/10
            px-6
            py-8
            flex
            flex-col
            gap-5
          "
        >
          {navigation.map((item) => (
            <a
              key={item.label}
              href={item.url}
              className="
                text-white/90
                hover:text-white
                text-[16px]
                font-medium
                transition-colors
              "
              onClick={() => setMobileOpen(false)}
            >
              {item.label}
            </a>
          ))}

          <div className="pt-4 border-t border-white/10">
            <a
              href={cta.url}
              className="
                inline-flex
                items-center
                justify-center
                gap-2
                bg-white
                text-black
                px-6
                py-3
                rounded-full
                text-[14px]
                font-medium
                w-full
              "
              onClick={() => setMobileOpen(false)}
            >
              {cta.label}
              <span>→</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
}