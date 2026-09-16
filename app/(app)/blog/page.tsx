import Link from "next/link";
import Header from "@/components/Header";
import { getPayloadClient } from "@/lib/payload";

export const dynamic = "force-dynamic";

export default async function BlogListPage() {
    const payload = await getPayloadClient();
    const { docs: blogs } = await payload.find({
        collection: "blogs",
        where: { status: { equals: "published" } },
        sort: "-publishedDate",
        depth: 1,
        limit: 20,
    });

    return (
        <main className="min-h-screen bg-black">
            <Header />
            <section className="max-w-[1200px] mx-auto px-6 pt-40 pb-24">
                <h1 className="text-white text-4xl font-semibold mb-12">Blog</h1>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {blogs.map((blog) => {
                        const image =
                            typeof blog.featuredImage === "object" && blog.featuredImage
                                ? blog.featuredImage.url
                                : null;

                        return (
                            <Link
                                key={blog.id}
                                href={`/blog/${blog.slug}`}
                                className="group block rounded-2xl overflow-hidden bg-white/5 hover:bg-white/10 transition-colors"
                            >
                                {image && (
                                    <img
                                        src={image}
                                        alt={blog.title}
                                        className="w-full h-48 object-cover"
                                    />
                                )}
                                <div className="p-6">
                                    <h2 className="text-white text-lg font-medium mb-2">
                                        {blog.title}
                                    </h2>
                                    <p className="text-white/60 text-sm mb-3">{blog.excerpt}</p>
                                    {blog.readTime && (
                                        <span className="text-orange-500 text-xs">
                                            {blog.readTime}
                                        </span>
                                    )}
                                </div>
                            </Link>
                        );
                    })}
                </div>
            </section>
        </main>
    );
}