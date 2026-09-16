"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";

interface AuthorType {
  name?: string | null;
  email?: string | null;
}

interface CategoryType {
  title?: string | null;
  slug?: string | null;
}

interface MediaType {
  url?: string | null;
  alt?: string | null;
}

export interface BlogItem {
  id: string | number;
  title: string;
  slug: string;
  excerpt?: string;
  readTime?: string;
  publishedDate?: string;
  author?: AuthorType | string | number | null;
  category?: CategoryType | string | null;
  featuredImage?: MediaType | string | number | null;
  tags?: string[] | null;
}

interface BlogListClientProps {
  initialBlogs: BlogItem[];
  categories: string[];
}

export default function BlogListClient({
  initialBlogs,
  categories,
}: BlogListClientProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState<string>("");

  const filteredBlogs = useMemo(() => {
    return initialBlogs.filter((blog) => {
      const catTitle =
        typeof blog.category === "object" && blog.category?.title
          ? blog.category.title
          : typeof blog.category === "string"
          ? blog.category
          : "General";

      const matchesCategory =
        selectedCategory === "All" ||
        catTitle.toLowerCase() === selectedCategory.toLowerCase();

      const matchesSearch =
        !searchQuery.trim() ||
        blog.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (blog.excerpt && blog.excerpt.toLowerCase().includes(searchQuery.toLowerCase()));

      return matchesCategory && matchesSearch;
    });
  }, [initialBlogs, selectedCategory, searchQuery]);

  const featuredBlog = filteredBlogs.length > 0 && selectedCategory === "All" && !searchQuery.trim()
    ? filteredBlogs[0]
    : null;

  const standardBlogs = featuredBlog
    ? filteredBlogs.slice(1)
    : filteredBlogs;

  const getImageUrl = (img: MediaType | string | number | null | undefined): string => {
    if (!img || typeof img === "number") {
      return "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&q=80";
    }
    if (typeof img === "object" && img.url) return img.url;
    if (typeof img === "string" && img.trim().length > 0) return img;
    return "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&q=80";
  };

  const getAuthorName = (author: AuthorType | string | number | null | undefined): string => {
    if (!author || typeof author === "number") return "Marketing Strategist";
    if (typeof author === "object" && author.name) return author.name;
    if (typeof author === "string") return author;
    return "Editorial Team";
  };

  const getCategoryTitle = (cat: CategoryType | string | null | undefined): string => {
    if (!cat) return "AI Marketing";
    if (typeof cat === "object" && cat.title) return cat.title;
    if (typeof cat === "string") return cat;
    return "Strategy";
  };

  const formatDate = (dateStr?: string) => {
    if (!dateStr) return "Recently Published";
    try {
      return new Date(dateStr).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      });
    } catch {
      return "Recently Published";
    }
  };

  return (
    <div className="w-full">
      {/* Category Pills & Search Bar */}
      <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-6 mb-14 pb-8 border-b border-white/[0.08]">
        {/* Category Filters */}
        <div className="flex items-center gap-2.5 overflow-x-auto pb-2 md:pb-0 scrollbar-none">
          <button
            onClick={() => setSelectedCategory("All")}
            className={`px-5 py-2.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all duration-200 ${
              selectedCategory === "All"
                ? "bg-gradient-to-r from-orange-500 to-amber-600 text-white shadow-lg shadow-orange-500/25 scale-105"
                : "bg-white/[0.05] hover:bg-white/[0.1] text-white/70 hover:text-white border border-white/[0.08]"
            }`}
          >
            All Articles ({initialBlogs.length})
          </button>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-5 py-2.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all duration-200 ${
                selectedCategory.toLowerCase() === cat.toLowerCase()
                  ? "bg-gradient-to-r from-orange-500 to-amber-600 text-white shadow-lg shadow-orange-500/25 scale-105"
                  : "bg-white/[0.05] hover:bg-white/[0.1] text-white/70 hover:text-white border border-white/[0.08]"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Search Bar */}
        <div className="relative min-w-[260px]">
          <input
            type="text"
            placeholder="Search insights & topics..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-white/[0.04] border border-white/[0.1] focus:border-orange-500/50 rounded-full px-5 py-2.5 pl-11 text-xs text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-orange-500/20 transition-all"
          />
          <svg
            className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </div>
      </div>

      {/* Featured Blog Highlight (when viewing all and no search) */}
      {featuredBlog && (
        <div className="mb-16">
          <div className="flex items-center gap-2 mb-4">
            <span className="w-2 h-2 rounded-full bg-orange-400 animate-pulse" />
            <span className="text-[11px] font-bold text-orange-400 uppercase tracking-widest">
              Featured Insight
            </span>
          </div>

          <Link
            href={`/blog/${featuredBlog.slug}`}
            className="group block relative rounded-3xl overflow-hidden bg-gradient-to-br from-white/[0.06] via-white/[0.03] to-orange-950/20 border border-white/[0.12] hover:border-orange-500/40 backdrop-blur-2xl transition-all duration-300 shadow-2xl hover:shadow-orange-500/10"
          >
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center p-6 sm:p-10">
              {/* Featured Image */}
              <div className="lg:col-span-7 relative h-72 sm:h-96 rounded-2xl overflow-hidden">
                <Image
                  src={getImageUrl(featuredBlog.featuredImage)}
                  alt={featuredBlog.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  sizes="(max-width: 1024px) 100vw, 60vw"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                
                {/* Category pill on image */}
                <div className="absolute top-4 left-4">
                  <span className="px-3.5 py-1.5 rounded-full text-[11px] font-semibold tracking-wide bg-black/60 border border-white/20 text-white backdrop-blur-md">
                    {getCategoryTitle(featuredBlog.category)}
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="lg:col-span-5 flex flex-col justify-center">
                <div className="flex items-center gap-3 text-xs text-white/50 mb-3">
                  <span>{formatDate(featuredBlog.publishedDate)}</span>
                  <span>•</span>
                  <span className="text-orange-400 font-medium">
                    {featuredBlog.readTime || "5 min read"}
                  </span>
                </div>

                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-semibold text-white tracking-tight leading-[1.15] mb-4 group-hover:text-orange-300 transition-colors duration-200">
                  {featuredBlog.title}
                </h2>

                <p className="text-white/70 text-sm sm:text-base leading-relaxed mb-6 line-clamp-3">
                  {featuredBlog.excerpt}
                </p>

                <div className="flex items-center justify-between pt-6 border-t border-white/[0.08]">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-orange-600 to-amber-500 flex items-center justify-center text-white text-xs font-bold ring-2 ring-white/10">
                      {getAuthorName(featuredBlog.author).charAt(0)}
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-white">
                        {getAuthorName(featuredBlog.author)}
                      </p>
                      <p className="text-[11px] text-white/50">Author</p>
                    </div>
                  </div>

                  <div className="inline-flex items-center gap-2 text-xs font-semibold text-white group-hover:text-orange-400 transition-colors">
                    <span>Read Article</span>
                    <span className="w-7 h-7 rounded-full bg-white/10 flex items-center justify-center group-hover:bg-orange-500 group-hover:text-white transition-all transform group-hover:translate-x-1">
                      →
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </Link>
        </div>
      )}

      {/* Grid of Articles */}
      {standardBlogs.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
          {standardBlogs.map((blog) => (
            <Link
              key={blog.id}
              href={`/blog/${blog.slug}`}
              className="group flex flex-col rounded-2xl overflow-hidden bg-gradient-to-b from-white/[0.04] to-white/[0.01] border border-white/[0.08] hover:border-orange-500/40 backdrop-blur-xl transition-all duration-300 hover:-translate-y-1.5 shadow-xl hover:shadow-orange-500/10"
            >
              {/* Card Image */}
              <div className="relative h-52 sm:h-60 w-full overflow-hidden bg-neutral-900">
                <Image
                  src={getImageUrl(blog.featuredImage)}
                  alt={blog.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                
                {/* Category badge */}
                <div className="absolute top-4 left-4">
                  <span className="px-3 py-1 rounded-full text-[10px] font-semibold tracking-wider uppercase bg-black/60 border border-white/15 text-white/90 backdrop-blur-md">
                    {getCategoryTitle(blog.category)}
                  </span>
                </div>

                {/* Read time badge */}
                {blog.readTime && (
                  <div className="absolute bottom-3 right-3">
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-medium bg-orange-950/80 border border-orange-500/30 text-orange-300 backdrop-blur-md">
                      {blog.readTime}
                    </span>
                  </div>
                )}
              </div>

              {/* Card Body */}
              <div className="flex-1 p-6 flex flex-col justify-between">
                <div>
                  <div className="text-[11px] text-white/45 mb-2.5">
                    {formatDate(blog.publishedDate)}
                  </div>
                  <h3 className="text-lg font-semibold text-white leading-snug mb-3 line-clamp-2 group-hover:text-orange-300 transition-colors duration-200">
                    {blog.title}
                  </h3>
                  <p className="text-white/60 text-xs sm:text-sm leading-relaxed mb-6 line-clamp-3">
                    {blog.excerpt}
                  </p>
                </div>

                <div className="pt-4 border-t border-white/[0.06] flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <div className="w-7 h-7 rounded-full bg-gradient-to-tr from-neutral-700 to-neutral-500 flex items-center justify-center text-white text-[10px] font-bold">
                      {getAuthorName(blog.author).charAt(0)}
                    </div>
                    <span className="text-xs text-white/70 font-medium truncate max-w-[120px]">
                      {getAuthorName(blog.author)}
                    </span>
                  </div>

                  <span className="text-xs font-semibold text-orange-400 group-hover:translate-x-1 transition-transform inline-flex items-center gap-1">
                    Read <span>→</span>
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      ) : (
        <div className="py-24 text-center rounded-3xl bg-white/[0.02] border border-white/[0.08] mb-20">
          <div className="w-16 h-16 rounded-full bg-white/[0.05] flex items-center justify-center mx-auto mb-4 text-2xl">
            📰
          </div>
          <h3 className="text-xl font-semibold text-white mb-2">No articles found</h3>
          <p className="text-white/50 text-sm max-w-md mx-auto mb-6">
            {searchQuery
              ? `No articles match "${searchQuery}". Try a different search term or category.`
              : "We're currently preparing insightful articles. Check back soon or browse categories."}
          </p>
          {(searchQuery || selectedCategory !== "All") && (
            <button
              onClick={() => {
                setSearchQuery("");
                setSelectedCategory("All");
              }}
              className="px-6 py-2.5 rounded-full bg-white/10 hover:bg-white/20 text-white text-xs font-semibold transition-colors"
            >
              Reset Filters
            </button>
          )}
        </div>
      )}

      {/* Newsletter Subscription Card */}
      <div className="relative rounded-3xl overflow-hidden p-8 sm:p-12 bg-gradient-to-r from-orange-950/40 via-neutral-900/60 to-black border border-orange-500/20 backdrop-blur-2xl text-center max-w-4xl mx-auto shadow-2xl">
        <div className="relative z-10">
          <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-500/10 border border-orange-500/20 text-orange-400 text-[11px] font-bold uppercase tracking-widest mb-4">
            Weekly Dispatch
          </span>
          <h3 className="text-2xl sm:text-3xl font-semibold text-white tracking-tight mb-3">
            Stay ahead with AI marketing insights
          </h3>
          <p className="text-white/60 text-xs sm:text-sm max-w-lg mx-auto mb-8 leading-relaxed">
            Get exclusive teardowns, generative workflow breakdowns, and strategy playbooks delivered directly to your inbox.
          </p>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              alert("Thank you for subscribing to our dispatch!");
            }}
            className="flex flex-col sm:flex-row items-center justify-center gap-3 max-w-md mx-auto"
          >
            <input
              type="email"
              required
              placeholder="Enter your work email..."
              className="w-full bg-white/[0.08] border border-white/15 focus:border-orange-500 rounded-full px-5 py-3 text-xs text-white placeholder-white/40 focus:outline-none transition-all"
            />
            <button
              type="submit"
              className="w-full sm:w-auto px-7 py-3 rounded-full bg-white text-black hover:bg-neutral-100 font-semibold text-xs whitespace-nowrap transition-all shadow-lg hover:scale-105"
            >
              Subscribe
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
