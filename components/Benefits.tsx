"use client";

const stats = [
  { value: "+48%", label: "Conversion Boost" },
  { value: "-21%", label: "Cost Reduction" },
  { value: "10K+", label: "Happy Clients" },
  { value: "21+", label: "Years of Expertise" },
];

export default function Benefits() {
  return (
    <section className="relative overflow-hidden py-20 md:py-28">
      {/* Warm orange gradient background */}
      <div
        className="absolute inset-0"
        style={{
          background: "radial-gradient(ellipse at 55% 50%, #C04010 0%, #8B2A06 35%, #3D0E00 65%, #0D0100 100%)",
        }}
      />

      {/* Disc image overlay - center */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `url(https://files.peachworlds.com/website/969dfc0e-13eb-475b-8459-6d8e44a15e0a/chatgpt-image-jun-15-2026-09-05-41-pm.webp)`,
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
            <p className="section-label text-white/60 mb-6">BENEFITS</p>
            <h2
              className="text-white font-medium leading-tight"
              style={{ fontSize: "clamp(32px, 4vw, 56px)" }}
            >
              Efficient. Scalable.<br />
              Innovative.<br />
              Welcome to Creative<br />
              Marketing Agency.
            </h2>
          </div>

          {/* Right stats - first card white (active), rest dark */}
          <div className="grid grid-cols-1 gap-3">
            {stats.map((stat, index) => (
              <div
                key={stat.label}
                className="rounded-2xl px-8 py-6"
                style={
                  index === 0
                    ? { background: "#FFFFFF", border: "none" }
                    : {
                        background: "rgba(50, 14, 2, 0.7)",
                        backdropFilter: "blur(12px)",
                        border: "1px solid rgba(255,255,255,0.07)",
                      }
                }
              >
                <p
                  className={`font-medium mb-1 ${index === 0 ? "text-black" : "text-white"}`}
                  style={{ fontSize: "clamp(36px, 4.5vw, 60px)", lineHeight: 1.05 }}
                >
                  {stat.value}
                </p>
                <p className={`text-[14px] ${index === 0 ? "text-black/60" : "text-white/55"}`}>
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
