"use client";

const menuLinks = [
  { label: "Solutions", href: "#solutions" },
  { label: "Features", href: "#features" },
  { label: "AI Power", href: "#ai-power" },
  { label: "Pricing", href: "#pricing" },
];

const socialLinks = [
  { label: "Instagram", href: "#" },
  { label: "Linkedin", href: "#" },
  { label: "X", href: "#" },
];

export default function Footer() {
  return (
    <footer
      className="relative overflow-hidden py-16 md:py-20"
      style={{
        backgroundImage: `url(https://files.peachworlds.com/website/f96c624b-bb2a-4550-96f0-2160a4a3aefd/e5bcb98aa3f21374519b14503ffcccc7.jpg)`,
        backgroundSize: "cover",
        backgroundPosition: "center bottom",
      }}
    >
      <div className="absolute inset-0" style={{ background: "rgba(30,8,0,0.55)" }} />

      <div className="relative z-10 max-w-[1400px] mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {/* Brand */}
          <div>
            <p className="text-white text-[15px] font-medium mb-2">Creative Marketing Agency</p>
            <a
              href="mailto:contact@creativemarketing.com"
              className="text-white/50 text-[14px] hover:text-white/80 transition-colors"
            >
              contact@creativemarketing.com
            </a>
          </div>

          {/* Menu */}
          <div>
            <p className="text-white/40 text-[12px] font-medium tracking-widest uppercase mb-4">Menu</p>
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
            <p className="text-white/40 text-[12px] font-medium tracking-widest uppercase mb-4">Socials</p>
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
            © {new Date().getFullYear()} Creative Marketing Agency. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
