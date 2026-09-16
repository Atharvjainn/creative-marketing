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
    <section id="features" className="bg-black mx-auto w-full py-24 md:py-32 relative">
      {/* Subtle background ambient light */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-orange-600/10 blur-[140px] pointer-events-none rounded-full" />

      <div className="max-w-[1400px] mx-auto px-6 relative z-10">
        {/* Section header */}
        <div className="mb-16 flex flex-col items-center text-center">
          <Reveal direction="up" delay={50}>
            <p className="section-label text-white mb-4">{eyebrow}</p>
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
            <p className="text-white text-[16px] max-w-[540px] leading-relaxed">
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
                className="
    group
    relative
    overflow-hidden
    flex
    flex-col
    h-full
    rounded-[14px]
    transition-all
    duration-500
    hover:border-orange-500/20
    hover:shadow-[0_20px_60px_rgba(30,10,0,0.35)]
  "
                style={{
                  background: "#0d0904",
                  border: "1px solid rgba(255,255,255,0.06)",
                }}
              >
                {/* Image */}
                <div
                  className="
      relative
      w-full
      aspect-square
      overflow-hidden
      bg-[#080706]
    "
                >
                  <Image
                    src={feature.image}
                    alt={feature.title}
                    width={700}
                    height={700}
                    className="
        w-full
        h-full
        object-cover
        transition-transform
        duration-700
        ease-out
        group-hover:scale-[1.035]
      "
                  />

                  {/* Very subtle image overlay */}
                  <div
                    className="
        absolute
        inset-0
        bg-gradient-to-t
        from-black/30
        via-transparent
        to-transparent
        pointer-events-none
      "
                  />

                  {/* Number */}
                  <span
                    className="
        absolute
        top-5
        left-5
        text-white/55
        text-[13px]
        font-medium
        tracking-wide
      "
                  >
                    0{index + 1}
                  </span>
                </div>

                {/* Content */}
                <div className="px-7 pt-7 pb-8">
                  <h3
                    className="
        text-white
        font-medium
        tracking-[-0.025em]
        leading-[1.1]
        mb-3
      "
                    style={{
                      fontSize: "clamp(24px, 2.2vw, 30px)",
                    }}
                  >
                    {feature.title}
                  </h3>

                  <p
                    className="
        text-white/55
        text-[14px]
        md:text-[15px]
        leading-[1.5]
        max-w-[400px]
      "
                  >
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
