import { getPayloadClient } from "@/lib/payload";
import Reveal from "./animations/Reveal";

const defaultMenuLinks = [
  { label: "Solutions", url: "#solutions" },
  { label: "Features", url: "#features" },
  { label: "AI Power", url: "#ai-power" },
  { label: "Pricing", url: "#pricing" },
];

const defaultSocialLinks = [
  { label: "Instagram", url: "#" },
  { label: "Linkedin", url: "#" },
  { label: "X", url: "#" },
];

export default async function CTA() {
  const payload = await getPayloadClient().catch((err) => {
    console.error("Failed to initialize Payload client:", err);
    return null;
  });

  // Fetch both CTA and Footer globals concurrently from Payload
  const [ctaData, footerData] = await Promise.all([
    payload
      ? payload.findGlobal({ slug: "cta", depth: 2 }).catch((err) => {
        console.error("Failed to load 'cta' global from Payload:", err);
        return null;
      })
      : null,
    payload
      ? payload.findGlobal({ slug: "footer", depth: 2 }).catch((err) => {
        console.error("Failed to load 'footer' global from Payload:", err);
        return null;
      })
      : null,
  ]);

  const animDir = (ctaData?.animationDirection as "up" | "down" | "left" | "right" | "zoom" | "none") || "up";

  const heading =
    ctaData?.heading || "Grow with us.\nStart your journey today.";

  const primaryButton = ctaData?.primaryButton || {
    label: "Get Started",
    url: "#",
  };

  const secondaryButton = ctaData?.secondaryButton || {
    label: "Learn More",
    url: "#",
  };

  const bgImage =
    typeof ctaData?.backgroundImage === "object" &&
    ctaData.backgroundImage &&
    "url" in ctaData.backgroundImage &&
    typeof ctaData.backgroundImage.url === "string"
      ? ctaData.backgroundImage.url
      : "https://files.peachworlds.com/website/ef3f779a-8b6a-4bd8-bcb9-0b77d639001a/chatgpt-image-jun-15-2026-08-59-34-pm.webp";

  // Dynamic Footer Data from 'footer' CMS Global
  const brandName = footerData?.brandName || "Creative Marketing Agency";
  const email =
    footerData?.email || ctaData?.email || "contact@creativemarketing.com";
  const copyright =
    footerData?.copyright ||
    `© ${new Date().getFullYear()} Creative Marketing Agency. All rights reserved.`;

  const menuLinks =
    footerData?.menuLinks && footerData.menuLinks.length > 0
      ? footerData.menuLinks.map((item) => ({
        label: item.label,
        url: item.url || "#",
      }))
      : defaultMenuLinks;

  const socialLinks =
    footerData?.socialLinks && footerData.socialLinks.length > 0
      ? footerData.socialLinks.map((item) => ({
        label: item.label,
        url: item.url || "#",
      }))
      : defaultSocialLinks;

  return (
    <section className="relative overflow-hidden" style={{ minHeight: "90vh" }}>
      {/* Full background: disc/petri dish image — warm peach/cream tones match original CTA */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `url(${bgImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />

      {/* Warm peach overlay — lightens the image to match original's soft warm tone */}
      <div
        className="absolute inset-0"
        style={{ background: "rgba(240, 190, 160, 0.25)" }}
      />

      {/* Left dark scrim for text readability */}
      <div
        className="absolute inset-0"
        style={{ background: "linear-gradient(to right, rgba(10,3,0,0.45) 0%, transparent 60%)" }}
      />

      {/* Content - vertically spread: text at top, footer at bottom */}
      <div className="relative z-10 h-full flex flex-col justify-between" style={{ minHeight: ctaData?.enabled === false ? "auto" : "90vh" }}>
        {/* CTA text (can be hidden from CMS) */}
        {ctaData?.enabled !== false && (
          <div className="max-w-[1320px] mx-auto w-full px-6 sm:px-12 pt-28 sm:pt-40">
            <Reveal direction={animDir} delay={50}>
              <h2
                className="text-white font-medium mb-10 whitespace-pre-line tracking-tight drop-shadow-md"
                style={{ fontSize: "clamp(40px, 6vw, 80px)", lineHeight: 1 }}
              >
                {heading}
              </h2>
            </Reveal>
            <Reveal direction={animDir} delay={150}>
              <div className="flex flex-wrap items-center gap-4">
                <a
                  href={primaryButton.url}
                  className="group flex items-center gap-3 bg-white text-black px-8 py-4 rounded-full text-[14px] font-semibold hover:bg-neutral-100 hover:shadow-xl hover:shadow-black/30 transition-all duration-300"
                >
                  {primaryButton.label}
                  <span className="w-5 h-5 rounded-full bg-black flex items-center justify-center text-white text-xs font-bold transition-transform duration-300 group-hover:translate-x-1">
                    ›
                  </span>
                </a>
                <a
                  href={secondaryButton.url}
                  className="flex items-center gap-2 bg-black/40 text-white border border-white/20 px-8 py-4 rounded-full text-[14px] font-medium hover:bg-black/60 hover:border-white/40 transition-all duration-300 backdrop-blur-md"
                >
                  {secondaryButton.label}
                </a>
              </div>
            </Reveal>
          </div>
        )}

        {/* Footer - at bottom of CTA section */}
        <div className={`max-w-[1320px] mx-auto w-full px-6 sm:px-12 pb-12 sm:pb-14 ${ctaData?.enabled === false ? "pt-12" : "pt-20"}`}>
          <Reveal direction="up" delay={100}>
            <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-10">
              {/* Brand + Status Indicator */}
              <div className="flex flex-col gap-3">
                <div>
                  <p className="text-white font-bold text-[20px] tracking-tight mb-1">{brandName}</p>
                  <a
                    href={`mailto:${email}`}
                    className="text-white/60 text-[14px] hover:text-white transition-colors"
                  >
                    {email}
                  </a>
                </div>

                {/* Status pill badge */}
                {/* <div className="inline-flex items-center gap-2 w-fit px-3 py-1.5 rounded-full bg-black/40 border border-white/10 backdrop-blur-md">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  <span className="text-[12px] text-white/70 font-medium">All systems operational</span>
                </div> */}
              </div>

              {/* Menu + Socials */}
              <div className="flex gap-16 sm:gap-24">
                <div>
                  <p className="text-white/40 text-[11px] font-semibold tracking-widest uppercase mb-4">Menu</p>
                  <ul className="flex flex-col gap-2.5">
                    {menuLinks.map((item) => (
                      <li key={item.label}>
                        <a
                          href={item.url}
                          className="text-white/75 text-[14px] hover:text-white hover:translate-x-0.5 inline-block transition-all duration-200"
                        >
                          {item.label}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <p className="text-white/40 text-[11px] font-semibold tracking-widest uppercase mb-4">Socials</p>
                  <ul className="flex flex-col gap-2.5">
                    {socialLinks.map((item) => (
                      <li key={item.label}>
                        <a
                          href={item.url}
                          className="text-white/75 text-[14px] hover:text-white hover:translate-x-0.5 inline-block transition-all duration-200"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          {item.label}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            <div className="border-t border-white/10 mt-10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
              <p className="text-white/40 text-[12px]">{copyright}</p>
              <p className="text-white/25 text-[11px] uppercase tracking-wider font-mono">
                Crafted for Modern Marketing
              </p>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
