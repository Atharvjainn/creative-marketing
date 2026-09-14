"use client";

import Image from "next/image";

const solutions = [
  {
    title: "AI-Driven Ad Campaigns",
    description: "We craft compelling brand identities that resonate. From defining your voice and values to designing memorable logos and brand systems.",
    image: "https://files.peachworlds.com/website/517ad5b6-138b-4098-990f-894804952f29/saas-vector-1-1.png",
  },
  {
    title: "Marketing Departments",
    description: "We craft compelling brand identities that resonate. From defining your voice and values to designing memorable logos and brand systems.",
    image: "https://files.peachworlds.com/website/90285b6e-091c-4e52-885c-50c57065609f/group.png",
  },
  {
    title: "Cross-Functional\nCollaboration",
    description: "We craft compelling brand identities that resonate. From defining your voice and values to designing memorable logos and brand systems.",
    image: "https://files.peachworlds.com/website/109417e2-2c9d-4c68-bb84-6aa737bc26a8/frame.png",
  },
  {
    title: "Small to Large Businesses",
    description: "We craft compelling brand identities that resonate. From defining your voice and values to designing memorable logos and brand systems.",
    image: "https://files.peachworlds.com/website/109417e2-2c9d-4c68-bb84-6aa737bc26a8/frame.png",
  },
];

export default function BusinessSolutions() {
  return (
    <section className="relative overflow-hidden py-20 md:py-32">
      {/* Warm orange gradient */}
      <div
        className="absolute inset-0"
        style={{
          background: "radial-gradient(ellipse at 40% 50%, #C04010 0%, #8B2A06 35%, #3D0E00 65%, #0D0100 100%)",
        }}
      />

      {/* Abstract disc overlay left side */}
      <div
        className="absolute inset-y-0 left-0 w-[55%]"
        style={{
          backgroundImage: `url(https://files.peachworlds.com/website/351c33a9-2727-4ead-96ba-0e84a1dfccfd/chatgpt-image-jun-15-2026-09-04-22-pm.webp)`,
          backgroundSize: "cover",
          backgroundPosition: "right center",
          opacity: 0.45,
        }}
      />

      <div className="relative z-10 max-w-[1320px] mx-auto px-8 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-20 items-start">
          {/* Left sticky text */}
          <div className="lg:sticky lg:top-28">
            <p className="section-label text-white/60 mb-4">SOLUTIONS</p>
            <h2
              className="text-white font-medium mb-5"
              style={{ fontSize: "clamp(36px, 4.5vw, 56px)", lineHeight: 1.05 }}
            >
              Tailored for all<br />business sizes.
            </h2>
            <p className="text-white/65 text-[15px] leading-relaxed max-w-[340px]">
              Discover how our AI-powered solutions can specifically benefit your marketing challenges and goals.
            </p>
          </div>

          {/* Right scrolling cards */}
          <div className="flex flex-col gap-4">
            {solutions.map((sol, i) => (
              <div
                key={i}
                className="rounded-2xl p-6 md:p-8"
                style={{
                  background: "rgba(60, 18, 2, 0.65)",
                  backdropFilter: "blur(12px)",
                  border: "1px solid rgba(255,255,255,0.08)",
                }}
              >
                <h3 className="text-white text-[20px] md:text-[24px] font-medium mb-3 whitespace-pre-line">
                  {sol.title}
                </h3>
                <p className="text-white/60 text-[14px] leading-relaxed mb-5">
                  {sol.description}
                </p>
                <div className="rounded-xl overflow-hidden bg-black/30 aspect-video">
                  <Image
                    src={sol.image}
                    alt={sol.title.replace('\n', ' ')}
                    width={600}
                    height={340}
                    className="w-full h-full object-cover opacity-80"
                    onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
