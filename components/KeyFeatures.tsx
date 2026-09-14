import Image from "next/image";
import { getPayloadClient } from "@/lib/payload";
import Reveal from "./animations/Reveal";

const defaultKeyFeatures = [
  {
    number: "01",
    label: "FEATURE 1",
    title: "Simplify complex workflows.",
    description:
      "Our AI automates repetitive tasks across marketing departments, reducing manual effort and increasing productivity.",
    image: "https://files.peachworlds.com/website/ef3f779a-8b6a-4bd8-bcb9-0b77d639001a/chatgpt-image-jun-15-2026-08-59-34-pm.webp",
    imageLeft: false,
    button: { label: "Get Started", url: "#" },
  },
  {
    number: "02",
    label: "FEATURE 2",
    title: "Unlock actionable business intelligence.",
    description:
      "Our AI provides deep insights, turning data into actionable strategies for improved campaign performance.",
    image: "https://files.peachworlds.com/website/351c33a9-2727-4ead-96ba-0e84a1dfccfd/chatgpt-image-jun-15-2026-09-04-22-pm.webp",
    imageLeft: true,
    button: { label: "Get Started", url: "#" },
  },
  {
    number: "03",
    label: "FEATURE 3",
    title: "Connect your favourite tools.",
    description:
      "Our platform seamlessly integrates with your existing marketing stack, enhancing your current tools.",
    image: "https://files.peachworlds.com/website/969dfc0e-13eb-475b-8459-6d8e44a15e0a/chatgpt-image-jun-15-2026-09-05-41-pm.webp",
    imageLeft: false,
    button: { label: "Get Started", url: "#" },
  },
];

export default async function KeyFeatures() {
  // Fetch the "KeyFeatures" global directly from Payload
  const data = await getPayloadClient()
    .then((payload) => payload.findGlobal({ slug: "key-features" }))
    .catch((err) => {
      console.error("Failed to load 'key-features' global from Payload:", err);
      return null;
    });

  if (data?.enabled === false) return null;
  const animDir = (data?.animationDirection as "up" | "down" | "left" | "right" | "zoom" | "none") || "up";

  const eyebrow = data?.eyebrow || "ABOUT OUR PLATFORM";
  const heading = data?.heading || "Key Features";
  const description =
    data?.description ||
    "Learn more about the innovative functionalities that drive our Creative Marketing Solutions.";

  const items =
    data?.items && data.items.length > 0
      ? data.items.map((feature, i) => {
          let imageUrl = "";
          if (typeof feature.image === "object" && feature.image && "url" in feature.image && typeof feature.image.url === "string") {
            imageUrl = feature.image.url;
          }
          const defaultItem = defaultKeyFeatures[i % defaultKeyFeatures.length];
          // Auto-alternate image position if not explicitly set
          const isLeft = feature.imageLeft !== undefined && feature.imageLeft !== null
            ? Boolean(feature.imageLeft)
            : i % 2 === 1;

          return {
            number: feature.number || `0${i + 1}`,
            label: feature.label || `FEATURE ${i + 1}`,
            title: feature.title || defaultItem.title,
            description: feature.description || defaultItem.description,
            image: imageUrl || defaultItem.image,
            imageLeft: isLeft,
            button: {
              label: feature.button?.label || "Get Started",
              url: feature.button?.url || "#",
            },
          };
        })
      : defaultKeyFeatures;

  return (
    <section id="ai-power" className="bg-black relative">
      {/* Section heading */}
      <div className="max-w-[1400px] mx-auto px-6 pt-24 pb-16">
        <Reveal direction="up" delay={50}>
          <p className="section-label text-orange-400 mb-3">{eyebrow}</p>
        </Reveal>
        <Reveal direction="up" delay={150}>
          <h2
            className="text-white font-medium whitespace-pre-line tracking-tight leading-[1.03]"
            style={{ fontSize: "clamp(44px, 6vw, 80px)" }}
          >
            {heading}
          </h2>
        </Reveal>
        <Reveal direction="up" delay={250}>
          <p className="text-white/60 text-[16px] mt-4 max-w-[480px] leading-relaxed">
            {description}
          </p>
        </Reveal>
      </div>

      {/* Feature items with auto-alternating layout */}
      {items.map((feature, i) => (
        <div
          key={`${feature.number}-${i}`}
          className="border-t border-white/10 relative overflow-hidden"
          style={{ background: i % 2 === 0 ? "#000000" : "#080201" }}
        >
          <div className="max-w-[1400px] mx-auto px-6 py-20 md:py-28">
            <div
              className={`grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20 items-center ${
                feature.imageLeft ? "md:[&>*:first-child]:order-2 md:[&>*:last-child]:order-1" : ""
              }`}
            >
              {/* Text */}
              <Reveal direction={feature.imageLeft ? "left" : "right"} duration={800}>
                <div>
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-orange-400 text-xs font-mono mb-5">
                    <span className="w-1.5 h-1.5 rounded-full bg-orange-500" />
                    {feature.label}
                  </div>

                  <h3
                    className="text-white font-medium mb-5 whitespace-pre-line tracking-tight text-balance leading-[1.08]"
                    style={{ fontSize: "clamp(30px, 4vw, 52px)" }}
                  >
                    {feature.title}
                  </h3>
                  <p className="text-white/65 text-[16px] leading-relaxed mb-8 max-w-[440px]">
                    {feature.description}
                  </p>
                  <a
                    href={feature.button?.url || "#"}
                    className="group inline-flex items-center gap-2.5 text-white text-[14px] font-semibold hover:text-orange-300 transition-colors"
                  >
                    {feature.button?.label || "Get Started"}
                    <span className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-white text-xs transition-all duration-200 group-hover:bg-orange-500 group-hover:text-black group-hover:translate-x-1">
                      ›
                    </span>
                  </a>
                </div>
              </Reveal>

              {/* Image */}
              <Reveal direction="zoom" delay={150} duration={800}>
                <div className="relative group">
                  {/* Feature number badge */}
                  <div className="absolute top-5 left-5 z-10 w-11 h-11 rounded-full bg-black/70 backdrop-blur-md border border-white/20 flex items-center justify-center text-white text-[13px] font-mono font-bold shadow-lg">
                    {feature.number}
                  </div>

                  <div className="rounded-3xl overflow-hidden border border-white/10 shadow-2xl shadow-orange-950/20 bg-neutral-900">
                    <Image
                      src={feature.image}
                      alt={feature.title}
                      width={800}
                      height={600}
                      className="w-full h-auto object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                    />
                  </div>
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      ))}
    </section>
  );
}
