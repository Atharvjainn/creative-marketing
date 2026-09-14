import Image from "next/image";
import { getPayloadClient } from "@/lib/payload";
import Reveal from "./animations/Reveal";

export default async function Solutions() {
  // Fetch the "Solutions" global directly from Payload
  const data = await getPayloadClient()
    .then((payload) => payload.findGlobal({ slug: "solutions" }))
    .catch((err) => {
      console.error("Failed to load 'solutions' global from Payload:", err);
      return null;
    });

  if (data?.enabled === false) return null;
  const animDir = (data?.animationDirection as "up" | "down" | "left" | "right" | "zoom" | "none") || "up";

  const eyebrow = data?.eyebrow || "SOLUTIONS";
  const heading = data?.heading || "Streamline complex\nmarketing tasks.";

  const description =
    data?.description ||
    "Automate routine marketing tasks, freeing up your team to focus on strategy and creativity, boosting overall output.";

  const primaryButton = data?.primaryButton || {
    label: "Get Started",
    url: "#",
  };

  const secondaryButton = data?.secondaryButton || {
    label: "View Demo",
    url: "#",
  };

  const bgImage =
    typeof data?.backgroundImage === "object" &&
    data.backgroundImage &&
    "url" in data.backgroundImage &&
    typeof data.backgroundImage.url === "string"
      ? data.backgroundImage.url
      : "https://files.peachworlds.com/website/ef3f779a-8b6a-4bd8-bcb9-0b77d639001a/chatgpt-image-jun-15-2026-08-59-34-pm.webp";

  const dashImage =
    typeof data?.dashboardImage === "object" &&
    data.dashboardImage &&
    "url" in data.dashboardImage &&
    typeof data.dashboardImage.url === "string"
      ? data.dashboardImage.url
      : "https://files.peachworlds.com/website/2f46c3a8-f9be-44cf-b56b-5a631f4fa3f7/dash.png";

  return (
    <section id="solutions" className="relative overflow-hidden pt-12">
      {/* Orange gradient background */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at 60% 0%, #C84510 0%, #9B2E06 28%, #4A1000 58%, #0E0200 100%)",
        }}
      />

      {/* Disc photo overlay */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `url(${bgImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          opacity: 0.85,
        }}
      />

      {/* Frosted glass card */}
      <div className="relative z-10 max-w-[1400px] mx-auto px-6 pt-16 md:pt-20">
        <Reveal direction="up" duration={800}>
          <div
            className="rounded-3xl border border-white/10 shadow-2xl relative overflow-hidden transition-all duration-300 hover:border-white/20"
            style={{
              background: "rgba(28, 10, 3, 0.70)",
              backdropFilter: "blur(24px)",
              WebkitBackdropFilter: "blur(24px)",
            }}
          >
            {/* Subtle top ambient line */}
            <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-orange-500/50 to-transparent" />

            <div className="px-8 md:px-14 py-16 md:py-24">
              <p className="section-label text-orange-400/90 mb-5">
                {eyebrow}
              </p>

              <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-8 mb-10">
                <h2
                  className="text-white font-medium whitespace-pre-line text-balance tracking-tight leading-[1.05]"
                  style={{ fontSize: "clamp(36px, 5vw, 64px)" }}
                >
                  {heading}
                </h2>

                <p className="text-white/80 text-[16px] max-w-[420px] leading-relaxed">
                  {description}
                </p>
              </div>

              {/* Buttons */}
              <div className="flex items-center gap-3.5">
                <a
                  href={primaryButton.url}
                  className="group flex items-center gap-2 bg-white text-black px-7 py-3.5 rounded-full text-[14px] font-semibold hover:bg-neutral-100 hover:shadow-xl hover:shadow-orange-500/20 transition-all duration-200"
                >
                  {primaryButton.label}
                  <span className="w-5 h-5 rounded-full bg-black flex items-center justify-center text-white text-xs font-bold transition-transform duration-200 group-hover:translate-x-0.5">
                    ›
                  </span>
                </a>

                <a
                  href={secondaryButton.url}
                  className="flex items-center gap-2 text-white px-7 py-3.5 rounded-full text-[14px] font-medium hover:bg-white/15 transition-all duration-200 border border-white/20 backdrop-blur-md"
                  style={{
                    background: "rgba(80,40,20,0.45)",
                  }}
                >
                  {secondaryButton.label}
                </a>
              </div>
            </div>
          </div>
        </Reveal>
      </div>

      {/* Dashboard mockup with macOS Browser Window Frame */}
      <div className="relative z-10 max-w-[1400px] mx-auto px-6 pb-20 md:pb-28 mt-12">
        <Reveal direction="zoom" delay={200} duration={900}>
          <div className="relative rounded-2xl overflow-hidden border border-white/15 bg-black/80 shadow-2xl shadow-orange-950/50 group hover:border-orange-500/30 transition-all duration-500">
            {/* macOS window titlebar */}
            <div className="flex items-center gap-2 px-4 py-3 bg-neutral-900/90 border-b border-white/10">
              <span className="w-3 h-3 rounded-full bg-[#FF5F56] inline-block shadow-sm" />
              <span className="w-3 h-3 rounded-full bg-[#FFBD2E] inline-block shadow-sm" />
              <span className="w-3 h-3 rounded-full bg-[#27C93F] inline-block shadow-sm" />
              <div className="mx-auto w-1/3 max-w-xs h-5 rounded-md bg-white/5 border border-white/10 flex items-center justify-center text-[11px] text-white/40 font-mono">
                creativemarketing.ai/dashboard
              </div>
            </div>

            <div className="overflow-hidden">
              <Image
                src={dashImage}
                alt="Marketing Dashboard"
                width={1280}
                height={720}
                className="w-full h-auto object-cover group-hover:scale-[1.01] transition-transform duration-500"
                priority
              />
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}