import { getPayloadClient } from "@/lib/payload";
import Reveal from "./animations/Reveal";
import SpotlightCard from "./animations/SpotlightCard";

const defaultPlans = [
  {
    name: "Starter",
    tagline: "Ideal for individual marketers or small teams.",
    price: "$199",
    period: "/mo",
    highlight: false,
    features: [
      "Up to 2 users",
      "Basic AI campaign tools",
      "Task creation & management",
      "Real-time reporting",
    ],
    cta: { label: "Sign Up", url: "#" },
  },
  {
    name: "Professional",
    tagline: "Perfect for growing teams needing advanced features.",
    price: "$499",
    period: "/mo",
    highlight: true,
    features: [
      "Up to 10 users",
      "Advanced AI campaign tools",
      "Real-time reporting",
      "AI content suggestions",
    ],
    cta: { label: "Contact Sales", url: "#" },
  },
  {
    name: "Enterprise",
    tagline: "Designed for large teams and corporations.",
    price: "$899",
    period: "/mo",
    highlight: false,
    features: [
      "Unlimited Users",
      "Custom AI solutions",
      "Dedicated account manager",
      "Priority support",
    ],
    cta: { label: "Contact Sales", url: "#" },
  },
];

export default async function Pricing() {
  // Fetch the "Pricing" global directly from Payload with depth 2
  const data = await getPayloadClient()
    .then((payload) => payload.findGlobal({ slug: "pricing", depth: 2 }))
    .catch((err) => {
      console.error("Failed to load 'pricing' global from Payload:", err);
      return null;
    });

  if (data?.enabled === false) return null;
  const animDir = (data?.animationDirection as "up" | "down" | "left" | "right" | "zoom" | "none") || "up";

  const eyebrow = data?.eyebrow || "PRICING";
  const heading = data?.heading || "Flexible plans for every team.";

  const plans =
    data?.plans && data.plans.length > 0
      ? data.plans.map((p, index) => {
          const defaultPlan = defaultPlans[index % defaultPlans.length];
          const featuresList =
            p.features && p.features.length > 0
              ? p.features.map((f) => f.feature).filter(Boolean)
              : defaultPlan.features;

          return {
            name: p.name || defaultPlan.name,
            tagline: p.tagline || defaultPlan.tagline,
            price: p.price || defaultPlan.price,
            period: p.period || defaultPlan.period,
            highlight: Boolean(p.highlight),
            features: featuresList,
            cta: {
              label: p.cta?.label || defaultPlan.cta.label,
              url: p.cta?.url || defaultPlan.cta.url,
            },
          };
        })
      : defaultPlans;

  // Dynamic grid configuration based on plan count
  const gridClass =
    plans.length === 1
      ? "max-w-lg mx-auto"
      : plans.length === 2
      ? "grid grid-cols-1 md:grid-cols-2 max-w-4xl mx-auto gap-6"
      : plans.length === 3
      ? "grid grid-cols-1 md:grid-cols-3 gap-6"
      : plans.length === 4
      ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5"
      : "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6";

  return (
    <section id="pricing" className="bg-black py-24 md:py-32 relative">
      <div className="max-w-[1400px] mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <Reveal direction="up" delay={50}>
            <p className="section-label text-white/40 mb-4">{eyebrow}</p>
          </Reveal>
          <Reveal direction="up" delay={150}>
            <h2
              className="text-white font-medium whitespace-pre-line"
              style={{ fontSize: "clamp(36px, 5vw, 64px)", lineHeight: 1.05 }}
            >
              {heading}
            </h2>
          </Reveal>
        </div>

        {/* Dynamic Pricing cards */}
        <div className={gridClass}>
          {plans.map((plan, index) => (
            <Reveal
              key={plan.name}
              direction="up"
              delay={100 + index * 90}
              duration={700}
              className="h-full"
            >
              <SpotlightCard
                className={`rounded-3xl p-8 flex flex-col justify-between relative transition-all duration-300 h-full ${
                  plan.highlight
                    ? "bg-gradient-to-b from-neutral-900 via-neutral-950 to-neutral-950 border border-orange-500/40 shadow-2xl shadow-orange-950/20 lg:-translate-y-2"
                    : "bg-neutral-950/70 border border-white/8 hover:border-white/20 hover:-translate-y-1"
                }`}
                spotlightColor={plan.highlight ? "rgba(249, 115, 22, 0.16)" : "rgba(255, 255, 255, 0.05)"}
              >
                <div>
                  {/* Highlight Popular Badge */}
                  {plan.highlight && (
                    <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-gradient-to-r from-orange-600 to-amber-500 text-white text-[11px] font-semibold tracking-wider uppercase px-3.5 py-1 rounded-full shadow-lg shadow-orange-950/50">
                      Most Popular
                    </div>
                  )}

                  {/* Plan name */}
                  <h3 className="text-white text-[22px] font-medium mb-1.5">{plan.name}</h3>
                  <p className="text-white/50 text-[13px] leading-relaxed mb-6 min-h-[38px]">{plan.tagline}</p>

                  {/* Divider */}
                  <div className={`h-px mb-6 ${plan.highlight ? "bg-orange-500/20" : "bg-white/8"}`} />

                  {/* Price */}
                  <div className="flex items-baseline gap-1.5 mb-8">
                    <span
                      className="text-white font-semibold tracking-tight"
                      style={{ fontSize: "clamp(42px, 4.5vw, 60px)", lineHeight: 1 }}
                    >
                      {plan.price}
                    </span>
                    <span className="text-white/40 text-[15px]">{plan.period}</span>
                  </div>

                  {/* Features */}
                  <ul className="flex flex-col gap-3.5 mb-10">
                    {plan.features.map((feat) => (
                      <li key={feat} className="flex items-start gap-3 text-white/75 text-[14px]">
                        <span
                          className={`w-4 h-4 rounded-full flex items-center justify-center shrink-0 mt-0.5 text-[10px] ${
                            plan.highlight
                              ? "bg-orange-500/20 text-orange-400"
                              : "bg-white/10 text-white/70"
                          }`}
                        >
                          <svg width="10" height="8" viewBox="0 0 10 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M1 4L3.5 6.5L9 1" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                        </span>
                        <span className="leading-snug">{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* CTA */}
                <a
                  href={plan.cta.url}
                  className={`w-full flex items-center justify-center gap-2.5 py-3.5 rounded-full text-[14px] font-medium transition-all duration-300 mt-auto ${
                    plan.highlight
                      ? "bg-white text-black hover:bg-neutral-200 hover:shadow-lg hover:shadow-white/10"
                      : "bg-white/5 text-white border border-white/10 hover:bg-white/10 hover:border-white/20"
                  }`}
                >
                  {plan.cta.label}
                  <span
                    className={`w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold transition-transform group-hover:translate-x-0.5 ${
                      plan.highlight ? "bg-black text-white" : "bg-white/15 text-white"
                    }`}
                  >
                    ›
                  </span>
                </a>
              </SpotlightCard>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
