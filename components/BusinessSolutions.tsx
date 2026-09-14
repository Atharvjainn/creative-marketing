import Image from "next/image";
import { getPayloadClient } from "@/lib/payload";
import Reveal from "./animations/Reveal";
import SpotlightCard from "./animations/SpotlightCard";

const defaultSolutions = [
  {
    title: "AI-Driven Ad Campaigns",
    description: "We craft compelling brand identities that resonate. From defining your voice and values to designing memorable logos and brand systems.",
    image: "https://files.peachworlds.com/website/517ad5b6-138b-4098-990f-894804952f29/saas-vector-1-1.png",
  },
  {
    title: "Marketing Departments",
    description: "We craft compelling brand identities that resonate. From defining your voice and values to designing memorable logos and brand systems.",
    image: "https://files.peachworlds.com/website/90285b6e-091c-4e52-885c-50c57065609f/group.png",
  },
  {
    title: "Cross-Functional\nCollaboration",
    description: "We craft compelling brand identities that resonate. From defining your voice and values to designing memorable logos and brand systems.",
    image: "https://files.peachworlds.com/website/109417e2-2c9d-4c68-bb84-6aa737bc26a8/frame.png",
  },
  {
    title: "Small to Large Businesses",
    description: "We craft compelling brand identities that resonate. From defining your voice and values to designing memorable logos and brand systems.",
    image: "https://files.peachworlds.com/website/109417e2-2c9d-4c68-bb84-6aa737bc26a8/frame.png",
  },
];

export default async function BusinessSolutions() {
  // Fetch the "BusinessSolutions" global directly from Payload
  const data = await getPayloadClient()
    .then((payload) => payload.findGlobal({ slug: "business-solutions" }))
    .catch((err) => {
      console.error("Failed to load 'business-solutions' global from Payload:", err);
      return null;
    });

  if (data?.enabled === false) return null;
  const animDir = (data?.animationDirection as "up" | "down" | "left" | "right" | "zoom" | "none") || "up";

  const eyebrow = data?.eyebrow || "SOLUTIONS";
  const heading = data?.heading || "Tailored for all\nbusiness sizes.";
  const description =
    data?.description ||
    "Discover how our AI-powered solutions can specifically benefit your marketing challenges and goals.";

  const items =
    data?.items && data.items.length > 0
      ? data.items.map((sol, i) => {
          let imageUrl = "";
          if (typeof sol.image === "object" && sol.image && "url" in sol.image && typeof sol.image.url === "string") {
            imageUrl = sol.image.url;
          }
          const defaultItem = defaultSolutions[i % defaultSolutions.length];
          return {
            title: sol.title || defaultItem.title,
            description: sol.description || defaultItem.description,
            image: imageUrl || defaultItem.image,
          };
        })
      : defaultSolutions;

  return (
    <section className="relative overflow-hidden py-24 md:py-36">
      {/* Warm orange gradient background */}
      <div
        className="absolute inset-0"
        style={{
          background: "radial-gradient(ellipse at 40% 50%, #C04010 0%, #8B2A06 35%, #3D0E00 65%, #0D0100 100%)",
        }}
      />

      {/* Abstract disc overlay left side */}
      <div
        className="absolute inset-y-0 left-0 w-[55%]"
        style={{
          backgroundImage: `url(https://files.peachworlds.com/website/351c33a9-2727-4ead-96ba-0e84a1dfccfd/chatgpt-image-jun-15-2026-09-04-22-pm.webp)`,
          backgroundSize: "cover",
          backgroundPosition: "right center",
          opacity: 0.45,
        }}
      />

      <div className="relative z-10 max-w-[1320px] mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-20 items-start">
          {/* Left sticky text */}
          <div className="lg:sticky lg:top-32">
            <Reveal direction="up" delay={50}>
              <p className="section-label text-orange-400 mb-4">{eyebrow}</p>
            </Reveal>
            <Reveal direction="up" delay={150}>
              <h2
                className="text-white font-medium mb-6 whitespace-pre-line tracking-tight leading-[1.05]"
                style={{ fontSize: "clamp(36px, 4.5vw, 56px)" }}
              >
                {heading}
              </h2>
            </Reveal>
            <Reveal direction="up" delay={250}>
              <p className="text-white/70 text-[16px] leading-relaxed max-w-[380px]">
                {description}
              </p>
            </Reveal>
          </div>

          {/* Right scrolling adaptive cards */}
          <div className="flex flex-col gap-6">
            {items.map((sol, i) => (
              <Reveal
                key={`${sol.title}-${i}`}
                direction="up"
                delay={100 + i * 80}
                duration={700}
              >
                <SpotlightCard
                  className="group rounded-3xl p-7 md:p-9 transition-all duration-300 hover:border-orange-500/40 hover:shadow-2xl hover:shadow-orange-950/40"
                  style={{
                    background: "rgba(35, 10, 2, 0.70)",
                    backdropFilter: "blur(20px)",
                    WebkitBackdropFilter: "blur(20px)",
                    border: "1px solid rgba(255,255,255,0.08)",
                  }}
                >
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-xs font-mono text-orange-400 bg-orange-950/70 border border-orange-800/40 px-3 py-1 rounded-full">
                      0{i + 1}
                    </span>
                  </div>

                  <h3 className="text-white text-[22px] md:text-[26px] font-semibold mb-3 whitespace-pre-line tracking-tight group-hover:text-orange-300 transition-colors">
                    {sol.title}
                  </h3>
                  <p className="text-white/65 text-[15px] leading-relaxed mb-6">
                    {sol.description}
                  </p>
                  <div className="rounded-2xl overflow-hidden bg-black/40 border border-white/5 aspect-video relative">
                    <Image
                      src={sol.image}
                      alt={sol.title.replace('\n', ' ')}
                      width={600}
                      height={340}
                      className="w-full h-full object-cover opacity-85 transition-transform duration-700 ease-out group-hover:scale-105"
                    />
                  </div>
                </SpotlightCard>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
