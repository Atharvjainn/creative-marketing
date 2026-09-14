import { getPayloadClient } from "@/lib/payload";

export const dynamic = "force-dynamic";

const defaultMenuLinks = [
  { label: "Solutions", href: "#solutions" },
  { label: "Features", href: "#features" },
  { label: "AI Power", href: "#ai-power" },
  { label: "Pricing", href: "#pricing" },
];

const defaultSocialLinks = [
  { label: "Instagram", href: "#" },
  { label: "Linkedin", href: "#" },
  { label: "X", href: "#" },
];

const defaultBackground =
  "https://files.peachworlds.com/website/f96c624b-bb2a-4550-96f0-2160a4a3aefd/e5bcb98aa3f21374519b14503ffcccc7.jpg";

export default async function Footer() {
  // Fetch the Footer global from Payload
  const data = await getPayloadClient()
    .then((payload) =>
      payload.findGlobal({
        slug: "footer",
        depth: 2,
        overrideAccess: true,
      })
    )
    .catch((err) => {
      console.error("Failed to load 'footer' global from Payload:", err);
      return null;
    });

  const brandName =
    data?.brandName || "Creative Marketing Agency";

  const email =
    data?.email || "contact@creativemarketing.com";

  const copyright =
    data?.copyright ||
    `© ${new Date().getFullYear()} Creative Marketing Agency. All rights reserved.`;

  const menuLinks =
    data?.menuLinks && data.menuLinks.length > 0
      ? data.menuLinks.map((item) => ({
        label: item.label,
        href: item.url || "#",
      }))
      : defaultMenuLinks;

  const socialLinks =
    data?.socialLinks && data.socialLinks.length > 0
      ? data.socialLinks.map((item) => ({
        label: item.label,
        href: item.url || "#",
      }))
      : defaultSocialLinks;

  // Get background image from Payload Media
  const backgroundImage =
    typeof data?.backgroundImage === "object" &&
      data.backgroundImage !== null &&
      "url" in data.backgroundImage &&
      typeof data.backgroundImage.url === "string"
      ? data.backgroundImage.url
      : defaultBackground;

  return (
    <footer
      className="relative overflow-hidden py-16 md:py-20"
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center bottom",
      }}
    >
      {/* Overlay */}
      <div
        className="absolute inset-0"
        style={{
          background: "rgba(30,8,0,0.55)",
        }}
      />

      <div className="relative z-10 max-w-[1400px] mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">

          {/* Brand */}
          <div>
            <p className="text-white text-[15px] font-medium mb-2">
              {brandName}
            </p>

            <a
              href={`mailto:${email}`}
              className="text-white/50 text-[14px] hover:text-white/80 transition-colors"
            >
              {email}
            </a>
          </div>

          {/* Menu */}
          <div>
            <p className="text-white/40 text-[12px] font-medium tracking-widest uppercase mb-4">
              Menu
            </p>

            <ul className="flex flex-col gap-2.5">
              {menuLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-white/70 text-[14px] hover:text-white transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Socials */}
          <div>
            <p className="text-white/40 text-[12px] font-medium tracking-widest uppercase mb-4">
              Socials
            </p>

            <ul className="flex flex-col gap-2.5">
              {socialLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-white/70 text-[14px] hover:text-white transition-colors"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-6 border-t border-white/10">
          <p className="text-white/30 text-[12px]">
            {copyright}
          </p>
        </div>
      </div>
    </footer>
  );
}