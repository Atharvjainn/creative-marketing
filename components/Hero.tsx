import Image from "next/image";
import { getPayloadClient } from "@/lib/payload";
import Reveal from "./animations/Reveal";

const defaultAvatars = [
  "https://files.peachworlds.com/website/ffb41913-0004-4a71-b48c-757fe7c42dfb/4.png",
  "https://files.peachworlds.com/website/19adf321-fa4e-4000-adb7-40e6caa44c8f/1.png",
  "https://files.peachworlds.com/website/3f7de391-28d0-48c8-b3da-e17e8c1eb83b/3.png",
  "https://files.peachworlds.com/website/88da0e8e-95c6-450d-9654-ce846fe84905/2.png",
];

export default async function Hero() {
  // Fetch the "Hero" global directly from Payload with depth 2 for populated media
  const data = await getPayloadClient()
    .then((payload) => payload.findGlobal({ slug: "hero", depth: 2 }))
    .catch((err) => {
      console.error("Failed to load 'hero' global from Payload:", err);
      return null;
    });

  if (data?.enabled === false) return null;
  const animDir = (data?.animationDirection as "up" | "down" | "left" | "right" | "zoom" | "none") || "up";

  const heading = data?.heading || "Elevate your\nmarketing with\nAI Solutions.";
  const trustText = data?.trustText || "Trusted by 10,000+ businesses worldwide";
  const description =
    data?.description ||
    "Discover how our AI-driven strategies transform your marketing, delivering unparalleled results and efficiency.";

  const primaryButton = data?.primaryButton || {
    label: "Get Started",
    url: "#",
  };

  const secondaryButton = data?.secondaryButton || {
    label: "Discover More",
    url: "#solutions",
  };

  const rawAvatars =
    data?.avatars && data.avatars.length > 0
      ? data.avatars
        .map((a) => {
          if (typeof a.image === "object" && a.image && "url" in a.image && typeof a.image.url === "string") {
            return a.image.url;
          }
          return "";
        })
        .filter(Boolean)
      : defaultAvatars;

  const displayAvatars = rawAvatars.slice(0, 5);
  const extraCount = rawAvatars.length > 5 ? rawAvatars.length - 5 : 0;

  let customBgUrl: string | null = null;
  const rawBg = data?.backgroundImage as unknown;
  if (
    typeof rawBg === "object" &&
    rawBg !== null &&
    "url" in rawBg &&
    typeof (rawBg as { url: unknown }).url === "string"
  ) {
    customBgUrl = (rawBg as { url: string }).url;
  } else if (typeof rawBg === "string" && rawBg.trim().length > 0) {
    customBgUrl = rawBg.trim();
  }

  const defaultDiscImage =
    "https://files.peachworlds.com/website/ef3f779a-8b6a-4bd8-bcb9-0b77d639001a/chatgpt-image-jun-15-2026-08-59-34-pm.webp";

  return (
    <section id="hero" className="relative min-h-screen flex flex-col justify-end">
      {/* Content */}
      <div
        className="relative z-10 max-w-[1400px] w-full mx-auto px-6 pb-20 md:pb-28 pt-36"
      >
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-10">
          {/* Left: badge + headline + social proof */}
          <div className="max-w-[660px]">
            {/* Pill Badge */}
            {/* <Reveal direction="down" delay={50} duration={600}>
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 border border-white/15 backdrop-blur-md mb-6 shadow-lg shadow-orange-950/40">
                <span className="w-2 h-2 rounded-full bg-emerald-400" />
                <span className="text-[12px] font-medium tracking-wide text-white/90">
                  Next-Gen AI Marketing Engine
                </span>
              </div>
            </Reveal> */}

            <Reveal direction="up" delay={150} duration={800}>
              <h1
                className="text-white font-medium leading-[1.03] tracking-tight whitespace-pre-line text-balance"
                style={{ fontSize: "clamp(44px, 5.5vw, 76px)" }}
              >
                {heading}
              </h1>
            </Reveal>

            {/* Social proof stack */}
            <Reveal direction="up" delay={300} duration={800}>
              <div className="mt-8 flex flex-wrap items-center gap-4">
                <div className="flex items-center">
                  {displayAvatars.map((src, i) => (
                    <div
                      key={i}
                      className="w-10 h-10 rounded-full overflow-hidden border-2 border-orange-900/60 bg-neutral-800 shrink-0 shadow-md hover:scale-110 hover:z-20 transition-transform duration-200"
                      style={{
                        marginLeft: i > 0 ? "-12px" : 0,
                        zIndex: displayAvatars.length - i,
                      }}
                    >
                      <Image
                        src={src}
                        alt={`user ${i + 1}`}
                        width={40}
                        height={40}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  ))}
                  {extraCount > 0 && (
                    <div
                      className="w-10 h-10 rounded-full flex items-center justify-center bg-orange-950/90 border-2 border-white/20 text-white text-[12px] font-bold shrink-0"
                      style={{ marginLeft: "-12px", zIndex: 0 }}
                    >
                      +{extraCount}
                    </div>
                  )}
                </div>

                <div>
                  <div className="flex items-center gap-1 text-amber-400 text-xs">
                    {"★".repeat(5)}
                    <span className="text-white text-xs font-semibold ml-1">4.9/5</span>
                  </div>
                  <p className="text-white/70 text-[13px] tracking-tight">{trustText}</p>
                </div>
              </div>
            </Reveal>
          </div>

          {/* Right: description + CTAs */}
          <div className="max-w-[420px]">
            <Reveal direction="up" delay={350} duration={800}>
              <p className="text-white/80 text-[16px] mb-8 leading-relaxed">
                {description}
              </p>
              <div className="flex items-center gap-3.5">
                <a
                  href={primaryButton.url}
                  className="group flex items-center gap-2.5 bg-white text-black px-7 py-3.5 rounded-full text-[14px] font-semibold hover:bg-neutral-100 hover:shadow-xl hover:shadow-orange-500/25 hover:-translate-y-0.5 transition-all duration-200"
                >
                  {primaryButton.label}
                  <span className="w-5 h-5 rounded-full bg-black flex items-center justify-center text-white text-xs transition-transform duration-200 group-hover:translate-x-1">
                    ›
                  </span>
                </a>
                <a
                  href={secondaryButton.url}
                  className="flex items-center gap-2 bg-white/10 text-white px-7 py-3.5 rounded-full text-[14px] font-medium hover:bg-white/20 hover:-translate-y-0.5 border border-white/15 transition-all duration-200 backdrop-blur-md"
                >
                  {secondaryButton.label}
                </a>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
