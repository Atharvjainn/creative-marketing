"use client";

import Image from "next/image";

const testimonials = [
  {
    name: "John Doe",
    role: "CEO, GLOBAL RETAIL",
    quote:
      "Their AI solutions are a game-changer. We've seen significant improvements in campaign performance and ROI.",
    avatar: "https://files.peachworlds.com/website/42433906-b42e-4dad-828e-47c2f49421ed/image-1927.png",
  },
  {
    name: "Celine Doe",
    role: "CMO, TECH INNOVATORS",
    quote:
      "The insights provided by their platform have revolutionized our marketing strategy and execution.",
    avatar: "https://files.peachworlds.com/website/113e5d9e-e7ef-42e3-992c-2879e23c124a/image-1928.png",
  },
  {
    name: "Mike Doe",
    role: "MARKETING DIRECTOR, HEALTHCO",
    quote:
      "Their expertise in AI marketing is unmatched. We highly recommend their services for future-proofing your brand.",
    avatar: "https://files.peachworlds.com/website/63e6528c-e0ba-42d3-82ef-ae20187abb80/image-1929.png",
  },
];

export default function Testimonials() {
  return (
    <section className="bg-black py-24 md:py-32">
      <div className="max-w-[1400px] mx-auto px-6">
        {/* Header */}
        <div className="mb-16">
          <p className="section-label text-white/40 mb-4">TESTIMONIALS</p>
          <h2
            className="text-white font-medium"
            style={{ fontSize: "clamp(36px, 5vw, 64px)", lineHeight: 1.05 }}
          >
            What our clients say.
          </h2>
        </div>

        {/* Testimonial cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {testimonials.map((t) => (
            <div
              key={t.name}
              className="rounded-2xl p-7 flex flex-col gap-6"
              style={{
                background: "#0a0a0a",
                border: "1px solid rgba(255,255,255,0.07)",
              }}
            >
              {/* Avatar + name */}
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full overflow-hidden bg-neutral-800 shrink-0">
                  <Image
                    src={t.avatar}
                    alt={t.name}
                    width={48}
                    height={48}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.currentTarget.style.display = "none";
                    }}
                  />
                </div>
                <div>
                  <p className="text-white text-[15px] font-medium">{t.name}</p>
                  <p className="text-white/40 text-[11px] tracking-wide mt-0.5">{t.role}</p>
                </div>
              </div>

              {/* Quote */}
              <p className="text-white/70 text-[15px] leading-relaxed">
                &ldquo;{t.quote}&rdquo;
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
