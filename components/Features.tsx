import Image from "next/image";
import { getPayloadClient } from "@/lib/payload";

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

  const eyebrow = data?.eyebrow || "FEATURES";
  const heading = data?.heading || "The future of marketing is here.";
  const description =
    data?.description ||
    "Explore the core benefits that make our AI platform essential for modern marketing success.";

  const items =
    data?.items && data.items.length > 0
      ? data.items
        .map((item, index) => {
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

  return (
    <section id="features" className="bg-black py-24 md:py-32">
      <div className="max-w-[1400px] mx-auto px-6">
        {/* Section header */}
        <div className="mb-16">
          <p className="section-label text-white/50 mb-4">{eyebrow}</p>
          <h2
            className="text-white font-medium mb-6 whitespace-pre-line"
            style={{ fontSize: "clamp(36px, 5vw, 64px)", lineHeight: 1.05 }}
          >
            {heading}
          </h2>
          <p className="text-white/60 text-[15px] max-w-[520px] leading-relaxed">
            {description}
          </p>
        </div>

        {/* Feature cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {items.map((feature, index) => (
            <div
              key={`${feature.title}-${index}`}
              className="group rounded-2xl overflow-hidden relative"
              style={{ background: "#0a0a0a", border: "1px solid rgba(255,255,255,0.06)" }}
            >
              {/* Image */}
              <div className="aspect-square overflow-hidden">
                <Image
                  src={feature.image}
                  alt={feature.title}
                  width={600}
                  height={600}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>

              {/* Text */}
              <div className="p-6">
                <h3 className="text-white text-[20px] font-medium mb-2">{feature.title}</h3>
                <p className="text-white/50 text-[14px] leading-relaxed">{feature.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
