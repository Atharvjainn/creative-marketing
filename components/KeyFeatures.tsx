import Image from "next/image";
import { getPayloadClient } from "@/lib/payload";
import Reveal from "./animations/Reveal";

const defaultKeyFeatures = [
  {
    number: "01",
    label: "FEATURE 1",
    title: "Simplify complex workflows.",
    description:
      "Our AI automates repetitive tasks across marketing departments, reducing manual effort and increasing productivity.",
    image:
      "https://files.peachworlds.com/website/ef3f779a-8b6a-4bd8-bcb9-0b77d639001a/chatgpt-image-jun-15-2026-08-59-34-pm.webp",
    imageLeft: false,
    button: {
      label: "Get Started",
      url: "#",
    },
  },
  {
    number: "02",
    label: "FEATURE 2",
    title: "Unlock actionable business intelligence.",
    description:
      "Our AI provides deep insights, turning data into actionable strategies for improved campaign performance.",
    image:
      "https://files.peachworlds.com/website/351c33a9-2727-4ead-96ba-0e84a1dfccfd/chatgpt-image-jun-15-2026-09-04-22-pm.webp",
    imageLeft: true,
    button: {
      label: "Get Started",
      url: "#",
    },
  },
  {
    number: "03",
    label: "FEATURE 3",
    title: "Connect your favourite tools.",
    description:
      "Our platform seamlessly integrates with your existing marketing stack, enhancing your current tools.",
    image:
      "https://files.peachworlds.com/website/969dfc0e-13eb-475b-8459-6d8e44a15e0a/chatgpt-image-jun-15-2026-09-05-41-pm.webp",
    imageLeft: false,
    button: {
      label: "Get Started",
      url: "#",
    },
  },
];

export default async function KeyFeatures() {
  const data = await getPayloadClient()
    .then((payload) =>
      payload.findGlobal({
        slug: "key-features",
        depth: 2,
      }),
    )
    .catch((err) => {
      console.error(
        "Failed to load 'key-features' global from Payload:",
        err,
      );

      return null;
    });

  if (data?.enabled === false) return null;

  const eyebrow = data?.eyebrow || "ABOUT OUR PLATFORM";

  const heading = data?.heading || "Key Features";

  const description =
    data?.description ||
    "Learn more about the innovative functionalities that drive our Creative Marketing Solutions.";

  const items =
    data?.items && data.items.length > 0
      ? data.items.map((feature, i) => {
        let imageUrl = "";

        if (
          typeof feature.image === "object" &&
          feature.image &&
          "url" in feature.image &&
          typeof feature.image.url === "string"
        ) {
          imageUrl = feature.image.url;
        }

        const defaultItem =
          defaultKeyFeatures[i % defaultKeyFeatures.length];

        const isLeft =
          feature.imageLeft !== undefined &&
            feature.imageLeft !== null
            ? Boolean(feature.imageLeft)
            : i % 2 === 1;

        return {
          number: feature.number || `0${i + 1}`,
          label: feature.label || `FEATURE ${i + 1}`,
          title: feature.title || defaultItem.title,
          description:
            feature.description || defaultItem.description,
          image: imageUrl || defaultItem.image,
          imageLeft: isLeft,
          button: {
            label: feature.button?.label || "Get Started",
            url: feature.button?.url || "#",
          },
        };
      })
      : defaultKeyFeatures;

  return (
    <section
      id="ai-power"
      className="relative bg-black"
    >
      {/* ============================= */}
      {/* SECTION HEADER */}
      {/* ============================= */}

      <div className="max-w-[1400px] mx-auto px-6 pt-24 pb-16">
        <Reveal
          direction="up"
          delay={50}
        >
          <p className="section-label text-orange-400 mb-4">
            {eyebrow}
          </p>
        </Reveal>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-20 items-end">
          {/* Heading */}
          <Reveal
            direction="up"
            delay={150}
          >
            <h2
              className="
                text-white
                font-medium
                tracking-tight
                leading-[1.03]
                whitespace-pre-line
              "
              style={{
                fontSize: "clamp(44px, 6vw, 80px)",
              }}
            >
              {heading}
            </h2>
          </Reveal>

          {/* Description */}
          <Reveal
            direction="up"
            delay={250}
          >
            <p className="text-white/60 text-[16px] md:text-[17px] leading-relaxed max-w-[500px] md:ml-auto">
              {description}
            </p>
          </Reveal>
        </div>
      </div>

      {/* ============================= */}
      {/* FEATURE CARDS */}
      {/* ============================= */}

      <div>
        {items.map((feature, i) => (
          <div
            key={`${feature.number}-${i}`}
            className="relative border-t border-white/10 overflow-hidden"
            style={{
              background:
                i % 2 === 0
                  ? "#000000"
                  : "#080201",
            }}
          >
            <div className="max-w-[1400px] mx-auto px-6 py-16 md:py-24">
              <div
                className={`
                  grid
                  grid-cols-1
                  md:grid-cols-2
                  gap-10
                  md:gap-16
                  items-center
                  ${feature.imageLeft
                    ? "md:[&>*:first-child]:order-2 md:[&>*:last-child]:order-1"
                    : ""
                  }
                `}
              >
                {/* ============================= */}
                {/* TEXT CONTENT */}
                {/* ============================= */}

                <Reveal
                  direction={
                    feature.imageLeft
                      ? "left"
                      : "right"
                  }
                  duration={800}
                >
                  <div className="max-w-[560px]">
                    {/* Label */}
                    <p className="text-white/50 text-[12px] tracking-[0.28em] font-medium mb-6">
                      {feature.label}
                    </p>

                    {/* Title */}
                    <h3
                      className="
                        text-white
                        font-medium
                        tracking-[-0.035em]
                        leading-[1.05]
                        mb-6
                        max-w-[540px]
                      "
                      style={{
                        fontSize:
                          "clamp(36px, 4vw, 58px)",
                      }}
                    >
                      {feature.title}
                    </h3>

                    {/* Description */}
                    <p className="text-white/60 text-[16px] md:text-[17px] leading-[1.55] max-w-[480px] mb-8">
                      {feature.description}
                    </p>

                    {/* CTA */}
                    <a
                      href={
                        feature.button?.url ||
                        "#"
                      }
                      className="
                        group
                        inline-flex
                        items-center
                        gap-3
                        text-white
                        text-[14px]
                        font-medium
                      "
                    >
                      {feature.button?.label ||
                        "Get Started"}

                      <span
                        className="
                          flex
                          items-center
                          justify-center
                          w-8
                          h-8
                          rounded-full
                          bg-white
                          text-black
                          text-[16px]
                          leading-none
                          transition-transform
                          duration-300
                          group-hover:translate-x-1
                        "
                      >
                        →
                      </span>
                    </a>
                  </div>
                </Reveal>

                {/* ============================= */}
                {/* IMAGE */}
                {/* ============================= */}

                <Reveal
                  direction="zoom"
                  delay={150}
                  duration={800}
                >
                  <div className="relative group">
                    {/* Feature number */}
                    <div className="absolute top-5 left-5 z-10 text-white/80 text-[14px] font-medium">
                      {feature.number}
                    </div>

                    {/* Image container */}
                    <div
                      className="
                        relative
                        overflow-hidden
                        rounded-[22px]
                        border
                        border-white/10
                        bg-neutral-900
                      "
                    >
                      <Image
                        src={feature.image}
                        alt={feature.title}
                        width={900}
                        height={650}
                        priority={i === 0}
                        className="
                          block
                          w-full
                          h-auto
                          object-cover
                          transition-transform
                          duration-700
                          ease-out
                          group-hover:scale-[1.03]
                        "
                      />
                    </div>
                  </div>
                </Reveal>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}