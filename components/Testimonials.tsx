import Image from "next/image";
import { getPayloadClient } from "@/lib/payload";
import Reveal from "./animations/Reveal";
import SpotlightCard from "./animations/SpotlightCard";

const defaultTestimonials = [
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

export default async function Testimonials() {
  // Fetch the "Testimonials" global directly from Payload with depth 2
  const data = await getPayloadClient()
    .then((payload) => payload.findGlobal({ slug: "testimonials", depth: 2 }))
    .catch((err) => {
      console.error("Failed to load 'testimonials' global from Payload:", err);
      return null;
    });

  if (data?.enabled === false) return null;
  const animDir = (data?.animationDirection as "up" | "down" | "left" | "right" | "zoom" | "none") || "up";

  const eyebrow = data?.eyebrow || "TESTIMONIALS";
  const heading = data?.heading || "What our clients say.";

  const items =
    data?.items && data.items.length > 0
      ? data.items.map((t, index) => {
          let avatarUrl = "";
          if (typeof t.avatar === "object" && t.avatar && "url" in t.avatar && typeof t.avatar.url === "string") {
            avatarUrl = t.avatar.url;
          }
          const defaultItem = defaultTestimonials[index % defaultTestimonials.length];
          return {
            name: t.name || defaultItem.name,
            role: t.role || defaultItem.role,
            quote: t.quote || defaultItem.quote,
            avatar: avatarUrl || defaultItem.avatar,
          };
        })
      : defaultTestimonials;

  // Dynamic grid configuration based on total reviews
  const gridClass =
    items.length === 1
      ? "max-w-2xl mx-auto"
      : items.length === 2
      ? "grid grid-cols-1 md:grid-cols-2 max-w-4xl mx-auto gap-6"
      : items.length === 3
      ? "grid grid-cols-1 md:grid-cols-3 gap-6"
      : items.length === 4
      ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5"
      : "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6";

  return (
    <section className="bg-black py-24 md:py-32 relative">
      <div className="max-w-[1400px] mx-auto px-6">
        {/* Header */}
        <div className="mb-16">
          <Reveal direction="up" delay={50}>
            <p className="section-label text-white/40 mb-4">{eyebrow}</p>
          </Reveal>
          <Reveal direction="up" delay={150}>
            <h2
              className="text-white font-medium whitespace-pre-line"
              style={{ fontSize: "clamp(36px, 5vw, 64px)", lineHeight: 1.05 }}
            >
              {heading}
            </h2>
          </Reveal>
        </div>

        {/* Adaptive Testimonial cards */}
        <div className={gridClass}>
          {items.map((t, index) => (
            <Reveal
              key={`${t.name}-${index}`}
              direction="up"
              delay={100 + index * 90}
              duration={700}
              className="h-full"
            >
              <SpotlightCard
                className="rounded-2xl p-7 flex flex-col justify-between gap-6 transition-all duration-300 hover:border-white/20 hover:-translate-y-1 group relative bg-neutral-950/80 h-full"
                style={{
                  border: "1px solid rgba(255,255,255,0.08)",
                }}
              >
                <div className="flex flex-col gap-4">
                  {/* 5-star rating */}
                  <div className="flex items-center gap-1 text-amber-400 text-[13px] tracking-wider">
                    {"★".repeat(5)}
                  </div>

                  {/* Quote */}
                  <p className="text-white/80 text-[15px] leading-relaxed font-normal">
                    &ldquo;{t.quote}&rdquo;
                  </p>
                </div>

                {/* Avatar + name */}
                <div className="flex items-center gap-3.5 pt-4 border-t border-white/5">
                  <div className="w-11 h-11 rounded-full overflow-hidden bg-neutral-800 shrink-0 ring-1 ring-white/10 group-hover:ring-orange-500/30 transition-all">
                    <Image
                      src={t.avatar}
                      alt={t.name}
                      width={44}
                      height={44}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <div className="flex items-center gap-1.5">
                      <p className="text-white text-[14px] font-medium">{t.name}</p>
                      <span className="inline-flex items-center text-orange-400 text-[11px]" title="Verified Client">
                        ✓
                      </span>
                    </div>
                    <p className="text-white/40 text-[11px] tracking-wide mt-0.5 uppercase">{t.role}</p>
                  </div>
                </div>
              </SpotlightCard>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
