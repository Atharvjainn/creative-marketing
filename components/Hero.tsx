"use client";

import Image from "next/image";

const avatars = [
  "https://files.peachworlds.com/website/ffb41913-0004-4a71-b48c-757fe7c42dfb/4.png",
  "https://files.peachworlds.com/website/19adf321-fa4e-4000-adb7-40e6caa44c8f/1.png",
  "https://files.peachworlds.com/website/3f7de391-28d0-48c8-b3da-e17e8c1eb83b/3.png",
  "https://files.peachworlds.com/website/88da0e8e-95c6-450d-9654-ce846fe84905/2.png",
];

export default function Hero() {
  return (
    <section className="relative min-h-screen flex flex-col overflow-hidden">
      {/* Warm orange gradient background — matches original */}
      <div
        className="absolute inset-0"
        style={{
          background: "radial-gradient(ellipse at 62% 0%, #C84510 0%, #9B2E06 28%, #4A1000 58%, #0E0200 85%)",
        }}
      />

      {/* Additional warmth layer */}
      <div
        className="absolute inset-0"
        style={{
          background: "linear-gradient(160deg, transparent 30%, rgba(10,2,0,0.7) 100%)",
        }}
      />

      {/* Disc image — right side (closest static image to original 3D coin render) */}
      <div
        className="absolute inset-y-0 right-[-5%] w-[70%] md:w-[65%]"
        style={{
          backgroundImage: `url(https://files.peachworlds.com/website/ef3f779a-8b6a-4bd8-bcb9-0b77d639001a/chatgpt-image-jun-15-2026-08-59-34-pm.webp)`,
          backgroundSize: "cover",
          backgroundPosition: "center left",
          opacity: 0.95,
        }}
      />

      {/* Fade edge — left side for text readability */}
      <div
        className="absolute inset-0"
        style={{
          background: "linear-gradient(to right, rgba(12,2,0,0.78) 0%, rgba(12,2,0,0.35) 42%, transparent 65%)",
        }}
      />

      {/* Fade edge — bottom */}
      <div
        className="absolute inset-0"
        style={{
          background: "linear-gradient(to top, rgba(8,1,0,0.65) 0%, transparent 40%)",
        }}
      />

      {/* Content */}
      <div className="relative z-10 flex flex-col justify-end min-h-screen max-w-[1400px] w-full" style={{ marginLeft: "auto", marginRight: "auto", paddingLeft: "24px", paddingRight: "24px", paddingBottom: "96px" }}>
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-8">
          {/* Left: headline */}
          <div className="max-w-[620px]">
            <h1
              className="text-white font-medium leading-none"
              style={{ fontSize: "clamp(48px, 5vw, 76px)", lineHeight: 1 }}
            >
              Elevate your<br />marketing with<br />AI Solutions.
            </h1>
            <div className="mt-5">
              <p className="text-white/80 text-[14px] mb-3">Trusted by 10k+ businesses</p>
              <div className="flex items-center">
                {avatars.map((src, i) => (
                  <div
                    key={i}
                    className="w-9 h-9 rounded-full overflow-hidden border-2 border-white/20 bg-neutral-700 shrink-0"
                    style={{ marginLeft: i > 0 ? "-10px" : 0, zIndex: avatars.length - i }}
                  >
                    <Image src={src} alt={`user ${i + 1}`} width={36} height={36} className="w-full h-full object-cover" />
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right: description + CTA */}
          <div className="max-w-[400px]">
            <p className="text-white/80 text-[15px] mb-6 leading-relaxed">
              Discover how our AI-driven strategies transform your marketing, delivering unparalleled results and efficiency.
            </p>
            <div className="flex items-center gap-3">
              <a
                href="#"
                className="flex items-center gap-2 bg-white text-black px-6 py-3 rounded-full text-[14px] font-medium hover:bg-neutral-100 transition-colors"
              >
                Get Started
                <span className="w-5 h-5 rounded-full bg-black flex items-center justify-center text-white text-xs">›</span>
              </a>
              <a
                href="#solutions"
                className="flex items-center gap-2 bg-white/15 text-white px-6 py-3 rounded-full text-[14px] font-medium hover:bg-white/25 transition-colors backdrop-blur-sm"
              >
                Discover More
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
