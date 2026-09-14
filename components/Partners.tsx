"use client";

import Image from "next/image";

// URL-to-logo confirmed by visual inspection: dda6621d=Google, 6b19f880=Sony, ef176200=Nike
const partners = [
  { name: "Nike", logo: "https://files.peachworlds.com/website/ef176200-9fc8-4993-a8ed-9e115e358e0d/div-framer-1lv732o-4.svg" },
  { name: "Google", logo: "https://files.peachworlds.com/website/dda6621d-87d4-4186-a589-a317ee748bdd/div-framer-1lv732o-.svg" },
  { name: "Prada", logo: "https://files.peachworlds.com/website/b85b9617-562e-4310-9ec1-2d921e5695aa/prada-logo-1.svg" },
  { name: "Sony", logo: "https://files.peachworlds.com/website/6b19f880-28a4-4c21-9175-0b69892a26be/div-framer-1lv732o-2.svg" },
  { name: "Disney", logo: "https://files.peachworlds.com/website/ec0e419c-385f-4bb8-8fa0-68e7e7aa632a/disney-wordmark-1.svg" },
  { name: "Apple Music", logo: "https://files.peachworlds.com/website/4dc9cbb1-b0f6-4aed-b56d-7f963c500f65/div-framer-1lv732o-3.svg" },
  { name: "AMG", logo: "https://files.peachworlds.com/website/6e395dd3-7cab-4143-9682-1b4723dbb21e/div-framer-1lv732o-5.svg" },
  { name: "AMG 2", logo: "https://files.peachworlds.com/website/6e395dd3-7cab-4143-9682-1b4723dbb21e/div-framer-1lv732o-5.svg" },
];

export default function Partners() {
  return (
    <section className="relative overflow-hidden py-20 md:py-28">
      {/* Uniform light peach base — disc overlay creates the orange glow on right */}
      <div
        className="absolute inset-0"
        style={{ background: "#EEC0B0" }}
      />

      {/* Disc image — right half, no blend mode, creates orange right side */}
      <div
        className="absolute inset-y-0 right-0 w-[55%]"
        style={{
          backgroundImage: `url(https://files.peachworlds.com/website/ef3f779a-8b6a-4bd8-bcb9-0b77d639001a/chatgpt-image-jun-15-2026-08-59-34-pm.webp)`,
          backgroundSize: "cover",
          backgroundPosition: "center left",
          opacity: 0.9,
        }}
      />

      {/* Bright lens-flare glow on left — matches original's disc light reflection */}
      <div
        className="absolute inset-0"
        style={{
          background: "radial-gradient(ellipse at 20% 40%, rgba(255,240,220,0.55) 0%, transparent 50%)",
        }}
      />

      <div className="relative z-10 max-w-[1400px] mx-auto px-8 md:px-12">
        <div className="text-center mb-12">
          <p className="section-label text-white/80 mb-4">OUR PARTNERS</p>
          <h2
            className="text-white font-medium"
            style={{ fontSize: "clamp(32px, 4.5vw, 60px)", lineHeight: 1.1 }}
          >
            Collaborating with<br />leading brands worldwide.
          </h2>
        </div>

        {/* Single horizontal row of logo tiles */}
        <div className="grid grid-cols-4 md:grid-cols-8 gap-3">
          {partners.map((partner) => (
            <div
              key={partner.name}
              className="aspect-square rounded-2xl flex items-center justify-center p-4 transition-all duration-300 hover:scale-105"
              style={{
                background: "rgba(100, 55, 25, 0.45)",
                backdropFilter: "blur(8px)",
                WebkitBackdropFilter: "blur(8px)",
                border: "1px solid rgba(255,255,255,0.10)",
              }}
            >
              <Image
                src={partner.logo}
                alt={partner.name}
                width={100}
                height={50}
                className="object-contain max-h-8 w-auto"
                style={{ filter: "brightness(0) invert(1)" }}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
