import Image from "next/image";
import { getPayloadClient } from "@/lib/payload";
import Reveal from "./animations/Reveal";
import SpotlightCard from "./animations/SpotlightCard";

const defaultFeatures = [
  {
    title: "AI Campaigns",
    description: "Deploy intelligent, targeted marketing campaigns.",
    image: "https://files.peachworlds.com/website/8056b15c-2739-49df-8a3a-131691083dc5/chatgpt-image-jun-15-2026-08-50-45-pm.webp",
  },
  {
    title: "Performance Analytics",
    description: "Gain deep insights with advanced data analysis.",
    image: "https://files.peachworlds.com/website/c209c201-370c-4e3e-ac83-3599e528f690/chatgpt-image-jun-15-2026-08-53-36-pm.webp",
  },
  {
    title: "Content Generation",
    description: "Automate engaging content creation.",
    image: "https://files.peachworlds.com/website/353a19a2-d02a-4005-aa0a-2d07eb23d24a/chatgpt-image-jun-15-2026-08-52-37-pm.webp",
  },
];

export default async function Features() {
  // Fetch the "Features" global directly from Payload
  const data = await getPayloadClient()
    .then((payload) => payload.findGlobal({ slug: "features", depth: 2 }))
    .catch((err) => {
      console.error("Failed to load 'features' global from Payload:", err);
      return null;
    });

  if (data?.enabled === false) return null;
  const animDir = (data?.animationDirection as "up" | "down" | "left" | "right" | "zoom" | "none") || "up";

  const eyebrow = data?.eyebrow || "FEATURES";
  const heading = data?.heading || "The future of marketing is here.";
  const description =
    data?.description ||
    "Explore the core benefits that make our AI platform essential for modern marketing success.";

  const items =
    data?.items && data.items.length > 0
      ? data.items.map((item, index) => {
          let imageUrl = "";
          if (typeof item.image === "object" && item.image && "url" in item.image && typeof item.image.url === "string") {
            imageUrl = item.image.url;
          }
          return {
            title: item.title || `Feature ${index + 1}`,
            description: item.description || "",
            image: imageUrl || defaultFeatures[index % defaultFeatures.length].image,
          };
        })
      : defaultFeatures;

  // Auto-adjust layout based on exact number of cards
  const gridClass =
    items.length === 1
      ? "max-w-xl mx-auto"
      : items.length === 2
      ? "grid grid-cols-1 md:grid-cols-2 max-w-4xl mx-auto gap-6"
      : items.length === 3
      ? "grid grid-cols-1 md:grid-cols-3 gap-5"
      : items.length === 4
      ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5"
      : "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6";

  return (
    <section id="features" className="bg-black py-24 md:py-32 relative">
      {/* Subtle background ambient light */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-orange-600/10 blur-[140px] pointer-events-none rounded-full" />

      <div className="max-w-[1400px] mx-auto px-6 relative z-10">
        {/* Section header */}
        <div className="mb-16">
          <Reveal direction="up" delay={50}>
            <p className="section-label text-orange-400 mb-4">{eyebrow}</p>
          </Reveal>
          <Reveal direction="up" delay={150}>
            <h2
              className="text-white font-medium mb-6 whitespace-pre-line tracking-tight leading-[1.05]"
              style={{ fontSize: "clamp(36px, 5vw, 64px)" }}
            >
              {heading}
            </h2>
          </Reveal>
          <Reveal direction="up" delay={250}>
            <p className="text-white/65 text-[16px] max-w-[540px] leading-relaxed">
              {description}
            </p>
          </Reveal>
        </div>

        {/* Dynamic adaptive feature cards grid */}
        <div className={gridClass}>
          {items.map((feature, index) => (
            <Reveal
              key={`${feature.title}-${index}`}
              direction="up"
              delay={150 + index * 100}
              duration={700}
              className="h-full"
            >
              <SpotlightCard
                className="group rounded-3xl overflow-hidden relative transition-all duration-300 hover:border-orange-500/40 hover:shadow-2xl hover:shadow-orange-950/30 flex flex-col justify-between h-full"
                style={{
                  background: "linear-gradient(180deg, #110502 0%, #070100 100%)",
                  border: "1px solid rgba(255,255,255,0.08)",
                }}
              >
                {/* Image with zoom effect */}
                <div className="aspect-square overflow-hidden relative bg-neutral-900">
                  <Image
                    src={feature.image}
                    alt={feature.title}
                    width={600}
                    height={600}
                    className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent" />
                  <span className="absolute top-4 right-4 px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/15 text-[11px] font-mono text-white/70">
                    0{index + 1}
                  </span>
                </div>

                {/* Text content */}
                <div className="p-7">
                  <h3 className="text-white text-[20px] font-semibold mb-2.5 tracking-tight group-hover:text-orange-300 transition-colors">
                    {feature.title}
                  </h3>
                  <p className="text-white/60 text-[14px] leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </SpotlightCard>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
