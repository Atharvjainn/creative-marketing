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
    <section className="relative overflow-hidden py-20 md:py-28">
      {/* Warm orange gradient background */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at 55% 50%, #C04010 0%, #8B2A06 35%, #3D0E00 65%, #0D0100 100%)",
        }}
      />

      {/* Disc image overlay - center */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `url(${bgImage})`,
          backgroundSize: "65%",
          backgroundPosition: "62% center",
          backgroundRepeat: "no-repeat",
          opacity: 0.4,
        }}
      />

      <div className="relative z-10 max-w-[1320px] mx-auto px-8 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left text */}
          <div>
            <Reveal direction="up" delay={50}>
              <p className="section-label text-white/60 mb-6">{eyebrow}</p>
            </Reveal>
            <Reveal direction="up" delay={150}>
              <h2
                className="text-white font-medium leading-tight whitespace-pre-line"
                style={{ fontSize: "clamp(32px, 4vw, 56px)" }}
              >
                {heading}
              </h2>
            </Reveal>
          </div>

          {/* Right stats - dynamic layout based on item count */}
          <div
            className={
              stats.length === 1
                ? "flex flex-col max-w-md ml-auto"
                : stats.length === 2
                ? "grid grid-cols-1 sm:grid-cols-2 gap-4"
                : stats.length >= 4
                ? "grid grid-cols-1 sm:grid-cols-2 gap-4"
                : "grid grid-cols-1 gap-3.5"
            }
          >
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
                    className="rounded-2xl px-8 py-7 transition-all duration-300 hover:scale-[1.02] group relative overflow-hidden"
                    style={
                      isFirst
                        ? {
                            background: "#FFFFFF",
                            boxShadow: "0 20px 40px -15px rgba(0,0,0,0.3)",
                          }
                        : {
                            background: "rgba(45, 12, 2, 0.65)",
                            backdropFilter: "blur(16px)",
                            WebkitBackdropFilter: "blur(16px)",
                            border: "1px solid rgba(255,255,255,0.1)",
                          }
                    }
                  >
                    <div className="flex items-baseline justify-between gap-2 mb-1.5">
                      <p
                        className={`font-semibold tracking-tight ${
                          isFirst ? "text-neutral-950" : "text-white"
                        }`}
                        style={{ fontSize: "clamp(34px, 4vw, 56px)", lineHeight: 1.05 }}
                      >
                        <CountUp value={stat.value} duration={1600} />
                      </p>
                      <span
                        className={`w-2 h-2 rounded-full ${
                          isFirst ? "bg-orange-600" : "bg-orange-400/80 group-hover:bg-orange-300"
                        } transition-colors`}
                      />
                    </div>
                    <p
                      className={`text-[14px] font-medium ${
                        isFirst ? "text-neutral-600" : "text-white/60 group-hover:text-white/80"
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
