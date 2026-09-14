"use client";

export default function CTA() {
  return (
    <section className="relative overflow-hidden" style={{ minHeight: "90vh" }}>
      {/* Full background: disc/petri dish image — warm peach/cream tones match original CTA */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `url(https://files.peachworlds.com/website/ef3f779a-8b6a-4bd8-bcb9-0b77d639001a/chatgpt-image-jun-15-2026-08-59-34-pm.webp)`,
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
      <div className="relative z-10 h-full flex flex-col justify-between" style={{ minHeight: "90vh" }}>
        {/* CTA text */}
        <div className="max-w-[1320px] mx-auto w-full" style={{ paddingLeft: "48px", paddingRight: "48px", paddingTop: "160px" }}>
          <h2
            className="text-white font-medium mb-10"
            style={{ fontSize: "clamp(40px, 6vw, 80px)", lineHeight: 1 }}
          >
            Grow with us.<br />
            Start your journey today.
          </h2>
          <div className="flex items-center gap-3">
            <a
              href="#"
              className="flex items-center gap-2 bg-black text-white px-7 py-3.5 rounded-full text-[14px] font-medium hover:bg-neutral-900 transition-colors"
            >
              Get Started
              <span className="w-5 h-5 rounded-full bg-white flex items-center justify-center text-black text-xs font-bold">›</span>
            </a>
            <a
              href="#"
              className="flex items-center gap-2 bg-white/15 text-white px-7 py-3.5 rounded-full text-[14px] font-medium hover:bg-white/25 transition-colors backdrop-blur-sm"
            >
              Learn More
            </a>
          </div>
        </div>

        {/* Footer - at bottom of CTA section */}
        <div className="max-w-[1320px] mx-auto w-full" style={{ paddingLeft: "48px", paddingRight: "48px", paddingBottom: "56px" }}>
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-8">
            {/* Brand */}
            <div>
              <p className="text-white font-semibold text-[18px] mb-1">Creative Marketing Agency</p>
              <p className="text-white/55 text-[14px]">contact@creativemarketing.com</p>
            </div>

            {/* Menu + Socials */}
            <div className="flex gap-16">
              <div>
                <p className="text-white/40 text-[11px] font-medium tracking-widest uppercase mb-3">Menu</p>
                <ul className="flex flex-col gap-2">
                  {["Solutions", "Features", "AI Power", "Pricing"].map((item) => (
                    <li key={item}>
                      <a href="#" className="text-white/75 text-[14px] hover:text-white transition-colors">{item}</a>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <p className="text-white/40 text-[11px] font-medium tracking-widest uppercase mb-3">Socials</p>
                <ul className="flex flex-col gap-2">
                  {["Instagram", "Linkedin", "X"].map((item) => (
                    <li key={item}>
                      <a href="#" className="text-white/75 text-[14px] hover:text-white transition-colors">{item}</a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          <div className="border-t border-white/10 mt-8 pt-6">
            <p className="text-white/35 text-[12px]">© 2024 Creative Marketing Agency. All rights reserved.</p>
          </div>
        </div>
      </div>
    </section>
  );
}
