"use client";

import Image from "next/image";

export default function Solutions() {
  return (
    <section id="solutions" className="relative overflow-hidden">
      {/* Orange gradient background — same warmth as hero continuation */}
      <div
        className="absolute inset-0"
        style={{
          background: "radial-gradient(ellipse at 60% 0%, #C84510 0%, #9B2E06 28%, #4A1000 58%, #0E0200 100%)",
        }}
      />

      {/* Disc photo overlay — full section */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `url(https://files.peachworlds.com/website/ef3f779a-8b6a-4bd8-bcb9-0b77d639001a/chatgpt-image-jun-15-2026-08-59-34-pm.webp)`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          opacity: 0.85,
        }}
      />

      {/* Frosted glass CARD — constrained width, rounded corners, matches original */}
      <div className="relative z-10 max-w-[1400px] mx-auto px-6 pt-16 md:pt-20">
        <div
          style={{
            background: "rgba(28, 10, 3, 0.65)",
            backdropFilter: "blur(20px)",
            WebkitBackdropFilter: "blur(20px)",
            borderRadius: "20px",
            border: "1px solid rgba(255,255,255,0.07)",
          }}
        >
          <div className="px-8 md:px-12 py-16 md:py-24">
            <p className="section-label text-white/70 mb-5">SOLUTIONS</p>
            <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-10">
              <h2
                className="text-white font-medium"
                style={{ fontSize: "clamp(36px, 5vw, 64px)", lineHeight: 1.05 }}
              >
                Streamline complex<br />marketing tasks.
              </h2>
              <p className="text-white/75 text-[15px] max-w-[380px] leading-relaxed">
                Automate routine marketing tasks, freeing up your team to focus on strategy and creativity, boosting overall output.
              </p>
            </div>
            <div className="flex items-center gap-3">
              <a
                href="#"
                className="flex items-center gap-2 bg-white text-black px-6 py-3 rounded-full text-[14px] font-medium hover:bg-neutral-100 transition-colors"
              >
                Get Started
                <span className="w-5 h-5 rounded-full bg-black flex items-center justify-center text-white text-xs">›</span>
              </a>
              <a
                href="#"
                className="flex items-center gap-2 text-white px-6 py-3 rounded-full text-[14px] font-medium hover:bg-white/10 transition-colors border border-white/20"
                style={{ background: "rgba(80,40,20,0.5)" }}
              >
                View Demo
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Dashboard mockup */}
      <div className="relative z-10 max-w-[1400px] mx-auto px-6 pb-16 md:pb-24 mt-10">
        <div className="rounded-2xl overflow-hidden border border-white/10 shadow-2xl">
          <Image
            src="https://files.peachworlds.com/website/2f46c3a8-f9be-44cf-b56b-5a631f4fa3f7/dash.png"
            alt="Marketing Dashboard"
            width={1280}
            height={720}
            className="w-full h-auto object-cover"
            priority
          />
        </div>
      </div>
    </section>
  );
}
