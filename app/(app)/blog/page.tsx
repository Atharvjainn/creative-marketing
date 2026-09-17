import Header from "@/components/Header";
import { getPayloadClient } from "@/lib/payload";
import BlogListClient, { BlogItem } from "@/components/blog/BlogListClient";
import Reveal from "@/components/animations/Reveal";
import type { Metadata } from "next";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Journal & Insights — AI Marketing Strategies",
  description:
    "Explore in-depth articles, case studies, and strategic playbooks on AI marketing, automation, generative design, and high-growth agency workflows.",
};

export default async function BlogListPage() {
  const payload = await getPayloadClient().catch((err) => {
    console.error("Failed to initialize Payload client on blog page:", err);
    return null;
  });

  const [blogsRes, categoriesRes] = await Promise.all([
    payload
      ? payload
          .find({
            collection: "blogs",
            sort: "-createdAt",
            depth: 2,
            limit: 50,
          })
          .catch((err) => {
            console.error("Error loading blogs:", err);
            return { docs: [] };
          })
      : { docs: [] },
    payload
      ? payload
          .find({
            collection: "categories",
            depth: 1,
            limit: 20,
          })
          .catch((err) => {
            console.error("Error loading categories:", err);
            return { docs: [] };
          })
      : { docs: [] },
  ]);

  const rawBlogs = blogsRes.docs || [];
  const rawCategories = categoriesRes.docs || [];

  const categoryNames = rawCategories
    .map((c) => (typeof c.name === "string" ? c.name : ""))
    .filter(Boolean);

  // Cast blogs cleanly
  const formattedBlogs: BlogItem[] = rawBlogs.map((b) => {
    let catTitle = "AI Marketing";
    if (typeof b.category === "object" && b.category) {
      catTitle =
        (b.category as { name?: string; title?: string }).name ||
        (b.category as { name?: string; title?: string }).title ||
        "General";
    }

    return {
      id: b.id,
      title: b.title,
      slug: b.slug,
      excerpt: b.excerpt,
      readTime: b.readTime || "5 min read",
      publishedDate: b.publishedDate || b.createdAt,
      author: b.author,
      category: { title: catTitle },
      featuredImage: b.featuredImage,
      tags: b.tags,
    };
  });

  // Extract unique category names from both collection and blogs
  const dynamicCategories = Array.from(
    new Set([
      ...categoryNames,
      ...formattedBlogs
        .map((b) =>
          typeof b.category === "object" && b.category?.title
            ? b.category.title
            : ""
        )
        .filter(Boolean),
    ])
  );

  return (
    <main className="min-h-screen bg-[#070100] text-white selection:bg-orange-500/30 selection:text-white">
      <Header />

      {/* Atmospheric Background Ambient Glows */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[900px] h-[500px] bg-gradient-to-b from-orange-600/15 via-orange-950/10 to-transparent blur-[140px] rounded-full" />
        <div className="absolute top-[40%] -left-40 w-[600px] h-[600px] bg-orange-950/15 blur-[160px] rounded-full" />
      </div>

      <div className="relative z-10 max-w-[1360px] mx-auto px-6 sm:px-10 pt-36 md:pt-44 pb-28">
        {/* Header Eyebrow & Hero Section */}
        <div className="text-center max-w-3xl mx-auto mb-16 md:mb-20">
          <Reveal direction="down" delay={50}>
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/[0.06] border border-white/15 backdrop-blur-xl mb-6 shadow-lg shadow-orange-950/40">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-[12px] font-medium tracking-wide text-white/90">
                Agency Intelligence & Dispatch
              </span>
            </div>
          </Reveal>

          <Reveal direction="up" delay={150}>
            <h1
              className="text-white font-medium leading-[1.05] tracking-tight text-balance mb-6"
              style={{ fontSize: "clamp(40px, 5.5vw, 72px)" }}
            >
              Insights, Trends &<br className="hidden sm:inline" /> AI Strategies.
            </h1>
          </Reveal>

          <Reveal direction="up" delay={250}>
            <p className="text-white/70 text-base md:text-lg leading-relaxed text-balance">
              Explore perspectives on autonomous marketing pipelines, generative campaign architectures, and high-leverage growth frameworks.
            </p>
          </Reveal>
        </div>

        {/* Dynamic Client Blog List with Category Filters */}
        <BlogListClient
          initialBlogs={formattedBlogs}
          categories={dynamicCategories}
        />
      </div>
    </main>
  );
}