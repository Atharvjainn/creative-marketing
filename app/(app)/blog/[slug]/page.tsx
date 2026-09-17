import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import Header from "@/components/Header";
import { getPayloadClient } from "@/lib/payload";
import { RichText } from "@payloadcms/richtext-lexical/react";
import BlogShareButtons from "@/components/blog/BlogShareButtons";
import Reveal from "@/components/animations/Reveal";
import type { Metadata } from "next";

export const dynamic = "force-dynamic";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const payload = await getPayloadClient().catch(() => null);

  if (!payload) return { title: "Article — Creative Marketing" };

  const { docs } = await payload
    .find({
      collection: "blogs",
      where: {
        slug: { equals: slug },
      },
      depth: 1,
      limit: 1,
    })
    .catch(() => ({ docs: [] }));

  const blog = docs[0];
  if (!blog) return { title: "Article Not Found — Creative Marketing" };

  let ogUrl = "";
  if (typeof blog.featuredImage === "object" && blog.featuredImage && "url" in blog.featuredImage) {
    ogUrl = (blog.featuredImage as { url?: string }).url || "";
  }

  return {
    title: `${blog.title} — Creative Marketing Journal`,
    description: blog.excerpt || "Read our latest article on AI marketing strategies.",
    openGraph: {
      title: blog.title,
      description: blog.excerpt || "",
      type: "article",
      images: ogUrl ? [{ url: ogUrl }] : [],
    },
  };
}

export default async function BlogDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const payload = await getPayloadClient().catch((err) => {
    console.error("Payload init error on blog detail:", err);
    return null;
  });

  if (!payload) {
    return notFound();
  }

  const { docs } = await payload.find({
    collection: "blogs",
    where: {
      slug: { equals: slug },
    },
    depth: 2,
    limit: 1,
  });

  const blog = docs[0];
  if (!blog) {
    return notFound();
  }

  // Fetch related articles for the bottom section
  const { docs: relatedDocs } = await payload
    .find({
      collection: "blogs",
      where: {
        slug: { not_equals: slug },
      },
      sort: "-createdAt",
      depth: 2,
      limit: 3,
    })
    .catch(() => ({ docs: [] }));

  const featuredImage =
    typeof blog.featuredImage === "object" && blog.featuredImage
      ? (blog.featuredImage as { url?: string }).url
      : null;

  const authorName: string =
    (typeof blog.author === "object" && blog.author
      ? (blog.author as { name?: string }).name
      : null) || "Editorial Team";

  let categoryName = "AI Marketing";
  if (typeof blog.category === "object" && blog.category) {
    categoryName = (blog.category as { name?: string; title?: string }).name || (blog.category as { name?: string; title?: string }).title || "Insights";
  }

  const formattedDate = blog.publishedDate
    ? new Date(blog.publishedDate).toLocaleDateString("en-US", {
        month: "long",
        day: "numeric",
        year: "numeric",
      })
    : "Recently Published";

  return (
    <main className="min-h-screen bg-[#070100] text-white selection:bg-orange-500/30 selection:text-white">
      <Header />

      {/* Ambient Background Glow */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-gradient-to-b from-orange-600/15 via-orange-950/10 to-transparent blur-[160px] rounded-full" />
        <div className="absolute top-[60%] right-0 w-[500px] h-[500px] bg-orange-950/15 blur-[160px] rounded-full" />
      </div>

      <article className="relative z-10 max-w-[1000px] mx-auto px-6 sm:px-10 pt-36 md:pt-44 pb-28">
        {/* Back Link & Category Bar */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-10 pb-6 border-b border-white/[0.08]">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-xs font-semibold text-white/60 hover:text-white transition-colors group"
          >
            <span className="w-6 h-6 rounded-full bg-white/[0.06] flex items-center justify-center group-hover:bg-white/15 transition-all">
              ←
            </span>
            <span>Back to Journal</span>
          </Link>

          <div className="flex items-center gap-3">
            <span className="px-3.5 py-1 rounded-full text-[11px] font-semibold bg-orange-500/15 border border-orange-500/30 text-orange-300">
              {categoryName}
            </span>
            {blog.readTime && (
              <span className="text-xs text-white/50">{blog.readTime}</span>
            )}
          </div>
        </div>

        {/* Title */}
        <Reveal direction="up" delay={50}>
          <h1
            className="text-white font-semibold leading-[1.08] tracking-tight text-balance mb-8"
            style={{ fontSize: "clamp(34px, 4.5vw, 60px)" }}
          >
            {blog.title}
          </h1>
        </Reveal>

        {/* Excerpt Lead */}
        {blog.excerpt && (
          <Reveal direction="up" delay={120}>
            <p className="text-white/75 text-lg sm:text-xl leading-relaxed mb-10 border-l-2 border-orange-500/60 pl-5 text-balance">
              {blog.excerpt}
            </p>
          </Reveal>
        )}

        {/* Author & Share Bar */}
        <div className="flex flex-wrap items-center justify-between gap-6 py-6 mb-12 border-y border-white/[0.08] bg-white/[0.015] rounded-2xl px-6">
          <div className="flex items-center gap-3.5">
            <div className="w-11 h-11 rounded-full bg-gradient-to-tr from-orange-600 to-amber-500 flex items-center justify-center text-white text-sm font-bold ring-2 ring-white/10 shadow-lg">
              {authorName.charAt(0)}
            </div>
            <div>
              <p className="text-sm font-semibold text-white">{authorName}</p>
              <p className="text-xs text-white/50">{formattedDate}</p>
            </div>
          </div>

          <BlogShareButtons title={blog.title} />
        </div>

        {/* Featured Image */}
        {featuredImage && (
          <div className="relative w-full h-[320px] sm:h-[480px] rounded-3xl overflow-hidden mb-16 border border-white/10 shadow-2xl bg-neutral-950">
            <Image
              src={featuredImage}
              alt={blog.title}
              fill
              className="object-cover"
              priority
              sizes="(max-width: 1024px) 100vw, 1000px"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />
          </div>
        )}

        {/* Blog Rich Content */}
        <div className="max-w-[820px] mx-auto">
          <div
            className="
              text-white/80
              text-[17px] sm:text-[18px]
              leading-[1.85]

              [&_h2]:text-white
              [&_h2]:text-2xl sm:[&_h2]:text-3xl md:[&_h2]:text-4xl
              [&_h2]:font-semibold
              [&_h2]:tracking-tight
              [&_h2]:mt-16
              [&_h2]:mb-6
              [&_h2]:pb-3
              [&_h2]:border-b
              [&_h2]:border-white/[0.08]

              [&_h3]:text-white
              [&_h3]:text-xl sm:[&_h3]:text-2xl
              [&_h3]:font-semibold
              [&_h3]:tracking-tight
              [&_h3]:mt-12
              [&_h3]:mb-4

              [&_h4]:text-white
              [&_h4]:text-lg sm:[&_h4]:text-xl
              [&_h4]:font-semibold
              [&_h4]:mt-8
              [&_h4]:mb-3

              [&_p]:mb-7

              [&_ul]:list-disc
              [&_ul]:pl-7
              [&_ul]:mb-8
              [&_ul]:space-y-2.5

              [&_ol]:list-decimal
              [&_ol]:pl-7
              [&_ol]:mb-8
              [&_ol]:space-y-2.5

              [&_li]:text-white/75
              [&_li]:leading-relaxed

              [&_blockquote]:border-l-4
              [&_blockquote]:border-orange-500
              [&_blockquote]:bg-gradient-to-r
              [&_blockquote]:from-orange-950/30
              [&_blockquote]:to-transparent
              [&_blockquote]:py-4
              [&_blockquote]:px-6
              [&_blockquote]:my-10
              [&_blockquote]:rounded-r-2xl
              [&_blockquote]:italic
              [&_blockquote]:text-white/90
              [&_blockquote]:text-lg

              [&_strong]:text-white
              [&_strong]:font-semibold

              [&_a]:text-orange-400
              [&_a]:underline
              [&_a]:decoration-orange-400/40
              [&_a]:underline-offset-4
              hover:[&_a]:text-orange-300
              hover:[&_a]:decoration-orange-300

              [&_code]:bg-white/[0.08]
              [&_code]:px-2
              [&_code]:py-0.5
              [&_code]:rounded-md
              [&_code]:text-orange-300
              [&_code]:text-sm
              [&_code]:font-mono
            "
          >
            {blog.content?.map((block, index) => {
              switch (block.blockType) {
                case "text":
                  return <RichText key={index} data={block.content} />;

                case "image": {
                  const blockImage =
                    typeof block.image === "object" && block.image
                      ? (block.image as { url?: string; alt?: string }).url
                      : null;

                  if (!blockImage) return null;

                  return (
                    <figure key={index} className="my-14">
                      <div className="relative w-full h-[360px] sm:h-[480px] rounded-2xl overflow-hidden border border-white/10 shadow-xl bg-neutral-900">
                        <Image
                          src={blockImage}
                          alt={block.caption || blog.title}
                          fill
                          className="object-cover"
                          sizes="(max-width: 1024px) 100vw, 820px"
                        />
                      </div>
                      {block.caption && (
                        <figcaption className="mt-3 text-center text-xs text-white/50 tracking-wide">
                          {block.caption}
                        </figcaption>
                      )}
                    </figure>
                  );
                }

                default:
                  return null;
              }
            })}
          </div>

          {/* Tags */}
          {blog.tags && blog.tags.length > 0 && (
            <div className="mt-14 pt-8 border-t border-white/[0.08] flex flex-wrap items-center gap-2">
              <span className="text-xs font-semibold text-white/40 mr-2 uppercase tracking-wider">
                Tags:
              </span>
              {blog.tags.map((tag, i) => (
                <span
                  key={i}
                  className="px-3 py-1 rounded-full text-xs font-medium bg-white/[0.05] border border-white/10 text-white/70"
                >
                  #{tag}
                </span>
              ))}
            </div>
          )}

          {/* Author Card Footer */}
          <div className="mt-14 p-8 rounded-3xl bg-gradient-to-br from-white/[0.04] to-orange-950/20 border border-white/10 backdrop-blur-xl flex flex-col sm:flex-row items-center sm:items-start gap-6">
            <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-orange-600 to-amber-500 flex items-center justify-center text-white text-xl font-bold ring-4 ring-white/10 shadow-xl shrink-0">
              {authorName.charAt(0)}
            </div>
            <div className="text-center sm:text-left">
              <span className="text-[11px] font-bold text-orange-400 uppercase tracking-widest block mb-1">
                Written By
              </span>
              <h4 className="text-lg font-semibold text-white mb-2">{authorName}</h4>
              <p className="text-white/60 text-xs sm:text-sm leading-relaxed mb-4">
                Strategist and researcher exploring AI applications across growth automation, generative creative engines, and high-impact marketing funnels.
              </p>
              <Link
                href="/blog"
                className="inline-flex items-center gap-1 text-xs font-semibold text-orange-400 hover:text-orange-300 transition-colors"
              >
                View more articles by this author <span>→</span>
              </Link>
            </div>
          </div>
        </div>

        {/* Related Articles Section */}
        {relatedDocs.length > 0 && (
          <div className="mt-28 pt-16 border-t border-white/[0.08]">
            <div className="flex items-center justify-between mb-10">
              <div>
                <span className="text-[11px] font-bold text-orange-400 uppercase tracking-widest block mb-1">
                  Keep Reading
                </span>
                <h3 className="text-2xl sm:text-3xl font-semibold text-white tracking-tight">
                  Related Insights
                </h3>
              </div>

              <Link
                href="/blog"
                className="hidden sm:inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/[0.05] hover:bg-white/[0.1] border border-white/10 text-white text-xs font-semibold transition-all"
              >
                <span>All Articles</span>
                <span>→</span>
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {relatedDocs.map((rBlog) => {
                const rImg =
                  typeof rBlog.featuredImage === "object" && rBlog.featuredImage
                    ? (rBlog.featuredImage as { url?: string }).url
                    : "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80";

                let rCat = "AI Marketing";
                if (typeof rBlog.category === "object" && rBlog.category) {
                  rCat = (rBlog.category as { name?: string; title?: string }).name || (rBlog.category as { name?: string; title?: string }).title || "Strategy";
                }

                return (
                  <Link
                    key={rBlog.id}
                    href={`/blog/${rBlog.slug}`}
                    className="group flex flex-col rounded-2xl overflow-hidden bg-white/[0.03] border border-white/[0.08] hover:border-orange-500/40 backdrop-blur-xl transition-all duration-300 hover:-translate-y-1.5 shadow-xl"
                  >
                    <div className="relative h-48 w-full overflow-hidden bg-neutral-900">
                      <Image
                        src={rImg || "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80"}
                        alt={rBlog.title}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                        sizes="(max-width: 768px) 100vw, 33vw"
                      />
                      <div className="absolute top-3 left-3">
                        <span className="px-2.5 py-0.5 rounded-full text-[10px] font-semibold bg-black/60 border border-white/15 text-white/90 backdrop-blur-md">
                          {rCat}
                        </span>
                      </div>
                    </div>
                    <div className="p-5 flex-1 flex flex-col justify-between">
                      <h4 className="text-base font-semibold text-white group-hover:text-orange-300 transition-colors line-clamp-2 mb-2">
                        {rBlog.title}
                      </h4>
                      <p className="text-xs text-white/60 line-clamp-2 mb-4">
                        {rBlog.excerpt}
                      </p>
                      <span className="text-xs font-semibold text-orange-400 inline-flex items-center gap-1">
                        Read Story <span>→</span>
                      </span>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        )}
      </article>
    </main>
  );
}