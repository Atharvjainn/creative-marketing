import Image from "next/image";
import { getPayloadClient } from "@/lib/payload";

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
          return {
            number: feature.number || `0${i + 1}`,
            label: feature.label || `FEATURE ${i + 1}`,
            title: feature.title || defaultItem.title,
            description: feature.description || defaultItem.description,
            image: imageUrl || defaultItem.image,
            imageLeft: Boolean(feature.imageLeft),
            button: {
              label: feature.button?.label || "Get Started",
              url: feature.button?.url || "#",
            },
          };
        })
      : defaultKeyFeatures;

  return (
    <section id="ai-power" className="bg-black">
      {/* Section heading */}
      <div className="max-w-[1400px] mx-auto px-6 pt-24 pb-12">
        <p className="section-label text-white/40 mb-3">{eyebrow}</p>
        <h2
          className="text-white font-medium whitespace-pre-line"
          style={{ fontSize: "clamp(48px, 6vw, 80px)", lineHeight: 1 }}
        >
          {heading}
        </h2>
        <p className="text-white/50 text-[15px] mt-4 max-w-[440px] leading-relaxed">
          {description}
        </p>
      </div>

      {/* Feature items */}
      {items.map((feature, i) => (
        <div
          key={`${feature.number}-${i}`}
          className="border-t border-white/10"
          style={{ background: i % 2 === 0 ? "#000" : "#050505" }}
        >
          <div className="max-w-[1400px] mx-auto px-6 py-20 md:py-28">
            <div
              className={`grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20 items-center ${
                feature.imageLeft ? "md:[&>*:first-child]:order-2 md:[&>*:last-child]:order-1" : ""
              }`}
            >
              {/* Text */}
              <div>
                <p className="section-label text-white/40 mb-4">{feature.label}</p>
                <h3
                  className="text-white font-medium mb-5 whitespace-pre-line"
                  style={{ fontSize: "clamp(28px, 4vw, 52px)", lineHeight: 1.05 }}
                >
                  {feature.title}
                </h3>
                <p className="text-white/55 text-[15px] leading-relaxed mb-8 max-w-[400px]">
                  {feature.description}
                </p>
                <a
                  href={feature.button?.url || "#"}
                  className="inline-flex items-center gap-2 text-white text-[14px] font-medium group"
                >
                  {feature.button?.label || "Get Started"}
                  <span className="w-7 h-7 rounded-full bg-white/10 flex items-center justify-center text-white text-xs transition-all group-hover:bg-white/20">
                    ›
                  </span>
                </a>
              </div>

              {/* Image */}
              <div className="relative">
                {/* Feature number */}
                <span
                  className="absolute top-4 left-4 z-10 text-white/30 text-[13px] font-medium"
                  style={{ fontVariantNumeric: "tabular-nums" }}
                >
                  {feature.number}
                </span>
                <div className="rounded-2xl overflow-hidden">
                  <Image
                    src={feature.image}
                    alt={feature.title}
                    width={800}
                    height={600}
                    className="w-full h-auto object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </section>
  );
}
