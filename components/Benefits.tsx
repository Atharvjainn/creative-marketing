import { getPayloadClient } from "@/lib/payload";
import Reveal from "./animations/Reveal";
import CountUp from "./animations/CountUp";

const defaultStats = [
  { value: "+48%", label: "Conversion Boost" },
  { value: "-21%", label: "Cost Reduction" },
  { value: "10K+", label: "Happy Clients" },
  { value: "21+", label: "Years of Expertise" },
];

export default async function Benefits() {
  // Fetch the "Benefits" global directly from Payload with depth 2
  const data = await getPayloadClient()
    .then((payload) => payload.findGlobal({ slug: "benefits", depth: 2 }))
    .catch((err) => {
      console.error("Failed to load 'benefits' global from Payload:", err);
      return null;
    });

  if (data?.enabled === false) return null;
  const animDir = (data?.animationDirection as "up" | "down" | "left" | "right" | "zoom" | "none") || "up";

  const eyebrow = data?.eyebrow || "BENEFITS";
  const heading =
    data?.heading ||
    "Efficient. Scalable.\nInnovative.\nWelcome to Creative\nMarketing Agency.";

  const stats =
    data?.stats && data.stats.length > 0
      ? data.stats.map((s, index) => ({
          value: s.value || defaultStats[index % defaultStats.length].value,
          label: s.label || defaultStats[index % defaultStats.length].label,
        }))
      : defaultStats;

  const bgImage =
    typeof data?.backgroundImage === "object" &&
    data.backgroundImage &&
    "url" in data.backgroundImage &&
    typeof data.backgroundImage.url === "string"
      ? data.backgroundImage.url
      : "https://files.peachworlds.com/website/969dfc0e-13eb-475b-8459-6d8e44a15e0a/chatgpt-image-jun-15-2026-09-05-41-pm.webp";

  return (
    <section id="benefits" className="relative py-24 md:py-36">
      <div className="relative z-10 max-w-[1320px] mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-20 items-start">
          {/* Left sticky heading column */}
          <div className="lg:sticky lg:top-28 lg:self-start">
            <Reveal direction="up" delay={50}>
              <p className="section-label text-orange-400 mb-4">{eyebrow}</p>
            </Reveal>
            <Reveal direction="up" delay={150}>
              <h2
                className="text-white font-medium leading-tight whitespace-pre-line tracking-tight"
                style={{ fontSize: "clamp(32px, 4vw, 56px)" }}
              >
                {heading}
              </h2>
            </Reveal>
          </div>

          {/* Right vertical scrolling benefit stat cards */}
          <div className="flex flex-col gap-6 md:gap-8">
            {stats.map((stat, index) => {
              const isFirst = index === 0;
              return (
                <Reveal
                  key={`${stat.label}-${index}`}
                  direction="up"
                  delay={100 + index * 90}
                  duration={700}
                >
                  <div
                    className="rounded-3xl p-8 md:p-10 transition-all duration-300 hover:scale-[1.01] hover:border-orange-500/30 group relative overflow-hidden shadow-2xl"
                    style={
                      isFirst
                        ? {
                            background: "#FFFFFF",
                            boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.5)",
                          }
                        : {
                            background: "rgba(30, 10, 3, 0.65)",
                            backdropFilter: "blur(20px)",
                            WebkitBackdropFilter: "blur(20px)",
                            border: "1px solid rgba(255,255,255,0.12)",
                          }
                    }
                  >
                    <div className="flex items-baseline justify-between gap-4 mb-3">
                      <p
                        className={`font-semibold tracking-tight ${
                          isFirst ? "text-neutral-950" : "text-white"
                        }`}
                        style={{ fontSize: "clamp(38px, 4.5vw, 64px)", lineHeight: 1.05 }}
                      >
                        <CountUp value={stat.value} duration={1600} />
                      </p>
                      <span
                        className={`w-3 h-3 rounded-full ${
                          isFirst ? "bg-orange-600" : "bg-orange-400/80 group-hover:bg-orange-300"
                        } transition-colors`}
                      />
                    </div>
                    <p
                      className={`text-[16px] md:text-[18px] font-medium leading-relaxed ${
                        isFirst ? "text-neutral-700" : "text-white/70 group-hover:text-white/90"
                      } transition-colors`}
                    >
                      {stat.label}
                    </p>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
