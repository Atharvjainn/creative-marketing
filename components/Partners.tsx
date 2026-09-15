import Image from "next/image";
import { getPayloadClient } from "@/lib/payload";

// Default fallback partners
const defaultPartners = [
  { name: "Nike", logo: "https://files.peachworlds.com/website/ef176200-9fc8-4993-a8ed-9e115e358e0d/div-framer-1lv732o-4.svg" },
  { name: "Google", logo: "https://files.peachworlds.com/website/dda6621d-87d4-4186-a589-a317ee748bdd/div-framer-1lv732o-.svg" },
  { name: "Prada", logo: "https://files.peachworlds.com/website/b85b9617-562e-4310-9ec1-2d921e5695aa/prada-logo-1.svg" },
  { name: "Sony", logo: "https://files.peachworlds.com/website/6b19f880-28a4-4c21-9175-0b69892a26be/div-framer-1lv732o-2.svg" },
  { name: "Disney", logo: "https://files.peachworlds.com/website/ec0e419c-385f-4bb8-8fa0-68e7e7aa632a/disney-wordmark-1.svg" },
  { name: "Apple Music", logo: "https://files.peachworlds.com/website/4dc9cbb1-b0f6-4aed-b56d-7f963c500f65/div-framer-1lv732o-3.svg" },
  { name: "AMG", logo: "https://files.peachworlds.com/website/6e395dd3-7cab-4143-9682-1b4723dbb21e/div-framer-1lv732o-5.svg" },
  { name: "AMG 2", logo: "https://files.peachworlds.com/website/6e395dd3-7cab-4143-9682-1b4723dbb21e/div-framer-1lv732o-5.svg" },
];

export default async function Partners() {
  // Fetch the "Partners" global directly from Payload with depth 2
  const data = await getPayloadClient()
    .then((payload) => payload.findGlobal({ slug: "partners", depth: 2 }))
    .catch((err) => {
      console.error("Failed to load 'partners' global from Payload:", err);
      return null;
    });

  if (data?.enabled === false) return null;

  const eyebrow = data?.eyebrow || "OUR PARTNERS";
  const heading = data?.heading || "Collaborating with\nleading brands worldwide.";

  const partners =
    data?.partners && data.partners.length > 0
      ? data.partners
          .map((p) => {
            let logoUrl = "";
            if (typeof p.logo === "object" && p.logo && "url" in p.logo && typeof p.logo.url === "string") {
              logoUrl = p.logo.url;
            }
            return {
              name: p.name || "",
              logo: logoUrl || defaultPartners[0].logo,
            };
          })
          .filter((p) => p.name && p.logo)
      : defaultPartners;

  // Duplicate the partner array to create a seamless infinite marquee loop
  const marqueeItems = [...partners, ...partners];

  const bgImage =
    typeof data?.backgroundImage === "object" &&
    data.backgroundImage &&
    "url" in data.backgroundImage &&
    typeof data.backgroundImage.url === "string"
      ? data.backgroundImage.url
      : "https://files.peachworlds.com/website/ef3f779a-8b6a-4bd8-bcb9-0b77d639001a/chatgpt-image-jun-15-2026-08-59-34-pm.webp";

  return (
    <section id="partners" className="relative overflow-hidden py-24 md:py-32">
      <div className="relative z-10 max-w-[1400px] mx-auto px-6 md:px-12">
        <div className="text-center mb-14">
          <p className="section-label text-orange-400/90 mb-3">{eyebrow}</p>
          <h2
            className="text-white font-medium whitespace-pre-line tracking-tight"
            style={{ fontSize: "clamp(32px, 4.5vw, 56px)", lineHeight: 1.1 }}
          >
            {heading}
          </h2>
        </div>

        {/* Continuous Infinite Marquee with edge-fade mask */}
        <div className="marquee-container py-4">
          <div className="marquee-content gap-4 pr-4">
            {marqueeItems.map((partner, index) => (
              <div
                key={`${partner.name}-${index}`}
                className="w-36 h-28 md:w-44 md:h-32 rounded-2xl flex items-center justify-center p-6 shrink-0 transition-all duration-300 hover:scale-105 hover:bg-black/40 cursor-pointer"
                style={{
                  background: "rgba(100, 55, 25, 0.45)",
                  backdropFilter: "blur(12px)",
                  WebkitBackdropFilter: "blur(12px)",
                  border: "1px solid rgba(255,255,255,0.15)",
                }}
              >
                <Image
                  src={partner.logo}
                  alt={partner.name}
                  width={120}
                  height={60}
                  className="object-contain max-h-9 w-auto opacity-90 hover:opacity-100 transition-opacity"
                  style={{ filter: "brightness(0) invert(1)" }}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
