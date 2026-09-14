"use client";

const plans = [
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
    cta: "Sign Up",
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
    cta: "Contact Sales",
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
    cta: "Contact Sales",
  },
];

export default function Pricing() {
  return (
    <section id="pricing" className="bg-black py-24 md:py-32">
      <div className="max-w-[1400px] mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <p className="section-label text-white/40 mb-4">PRICING</p>
          <h2
            className="text-white font-medium"
            style={{ fontSize: "clamp(36px, 5vw, 64px)", lineHeight: 1.05 }}
          >
            Flexible plans for every team.
          </h2>
        </div>

        {/* Pricing cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className="rounded-2xl p-8 flex flex-col"
              style={{
                background: plan.highlight ? "#111" : "#080808",
                border: plan.highlight ? "1px solid rgba(255,255,255,0.15)" : "1px solid rgba(255,255,255,0.06)",
              }}
            >
              {/* Plan name */}
              <h3 className="text-white text-[22px] font-medium mb-1">{plan.name}</h3>
              <p className="text-white/50 text-[13px] leading-relaxed mb-6">{plan.tagline}</p>

              {/* Divider */}
              {plan.highlight && <div className="h-px bg-white/15 mb-6" />}

              {/* Price */}
              <div className="flex items-end gap-1 mb-8">
                <span
                  className="text-white font-medium"
                  style={{ fontSize: "clamp(42px, 5vw, 64px)", lineHeight: 1 }}
                >
                  {plan.price}
                </span>
                <span className="text-white/50 text-[16px] mb-2">{plan.period}</span>
              </div>

              {/* Features */}
              <ul className="flex flex-col gap-3 mb-10 flex-1">
                {plan.features.map((feat) => (
                  <li key={feat} className="flex items-center gap-3 text-white/70 text-[14px]">
                    {plan.highlight && (
                      <span
                        className="w-4 h-4 rounded-full flex items-center justify-center shrink-0 text-[10px]"
                        style={{ background: "rgba(255,255,255,0.15)", color: "#fff" }}
                      >
                        ✦
                      </span>
                    )}
                    {feat}
                  </li>
                ))}
              </ul>

              {/* CTA */}
              <a
                href="#"
                className="w-full flex items-center justify-center gap-2 py-3.5 rounded-full text-[14px] font-medium transition-all duration-200"
                style={
                  plan.highlight
                    ? { background: "#fff", color: "#000" }
                    : { background: "rgba(255,255,255,0.06)", color: "#fff", border: "1px solid rgba(255,255,255,0.1)" }
                }
              >
                {plan.cta}
                <span
                  className="w-5 h-5 rounded-full flex items-center justify-center text-xs"
                  style={plan.highlight ? { background: "#000", color: "#fff" } : { background: "rgba(255,255,255,0.15)", color: "#fff" }}
                >
                  ›
                </span>
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
