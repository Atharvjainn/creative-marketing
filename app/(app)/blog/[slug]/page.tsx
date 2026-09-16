import { notFound } from "next/navigation";
import Header from "@/components/Header";
import { getPayloadClient } from "@/lib/payload";
import { RichText } from "@payloadcms/richtext-lexical/react";

export const dynamic = "force-dynamic";

export default async function BlogDetailPage({
    params,
}: {
    params: Promise<{ slug: string }>;
}) {
    const { slug } = await params;

    const payload = await getPayloadClient();

    const { docs } = await payload.find({
        collection: "blogs",

        where: {
            and: [
                {
                    slug: {
                        equals: slug,
                    },
                },
                {
                    status: {
                        equals: "published",
                    },
                },
            ],
        },

        depth: 2,
        limit: 1,
    });

    const blog = docs[0];

    if (!blog) {
        return notFound();
    }

    const featuredImage =
        typeof blog.featuredImage === "object" && blog.featuredImage
            ? blog.featuredImage.url
            : null;

    const author =
        typeof blog.author === "object" && blog.author
            ? blog.author.name
            : null;

    return (
        <main className="min-h-screen bg-black">
            <Header />

            <article className="max-w-[800px] mx-auto px-6 pt-40 pb-24">
                {/* Title */}
                <h1 className="text-white text-4xl md:text-5xl font-semibold tracking-tight mb-5">
                    {blog.title}
                </h1>

                {/* Meta */}
                <div className="flex flex-wrap items-center gap-4 text-white/50 text-sm mb-10">
                    {author && <span>{author}</span>}

                    {blog.publishedDate && (
                        <span>
                            {new Date(blog.publishedDate).toLocaleDateString("en-US", {
                                month: "long",
                                day: "numeric",
                                year: "numeric",
                            })}
                        </span>
                    )}

                    {blog.readTime && <span>· {blog.readTime}</span>}
                </div>

                {/* Featured Image */}
                {featuredImage && (
                    <img
                        src={featuredImage}
                        alt={blog.title}
                        className="w-full rounded-2xl mb-14"
                    />
                )}

                {/* Blog Content */}
                <div
                    className="
            max-w-none
            text-white/80

            [&_h2]:text-white
            [&_h2]:text-3xl
            [&_h2]:md:text-4xl
            [&_h2]:font-semibold
            [&_h2]:tracking-tight
            [&_h2]:mt-14
            [&_h2]:mb-6

            [&_h3]:text-white
            [&_h3]:text-2xl
            [&_h3]:md:text-3xl
            [&_h3]:font-semibold
            [&_h3]:tracking-tight
            [&_h3]:mt-10
            [&_h3]:mb-4

            [&_h4]:text-white
            [&_h4]:text-xl
            [&_h4]:font-semibold
            [&_h4]:mt-8
            [&_h4]:mb-3

            [&_p]:text-white/70
            [&_p]:text-base
            [&_p]:md:text-lg
            [&_p]:leading-8
            [&_p]:mb-6

            [&_ul]:list-disc
            [&_ul]:pl-6
            [&_ul]:mb-6

            [&_ol]:list-decimal
            [&_ol]:pl-6
            [&_ol]:mb-6

            [&_li]:text-white/70
            [&_li]:text-base
            [&_li]:md:text-lg
            [&_li]:leading-8
            [&_li]:mb-2

            [&_strong]:text-white
            [&_a]:text-orange-400
            [&_a]:underline
          "
                >
                    {blog.content?.map((block, index) => {
                        switch (block.blockType) {
                            case "text":
                                return (
                                    <RichText
                                        key={index}
                                        data={block.content}
                                    />
                                );

                            case "image": {
                                const blockImage =
                                    typeof block.image === "object" && block.image
                                        ? block.image.url
                                        : null;

                                if (!blockImage) {
                                    return null;
                                }

                                return (
                                    <figure
                                        key={index}
                                        className="my-12"
                                    >
                                        <img
                                            src={blockImage}
                                            alt={block.caption || blog.title}
                                            className="w-full rounded-2xl"
                                        />

                                        {block.caption && (
                                            <figcaption className="mt-3 text-center text-sm text-white/40">
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
            </article>
        </main>
    );
}