import type { CollectionConfig } from "payload";
import {
    lexicalEditor,
    HeadingFeature,
    FixedToolbarFeature,
    LinkFeature,
    InlineToolbarFeature,
} from "@payloadcms/richtext-lexical";

export const Blogs: CollectionConfig = {
    slug: "blogs",

    admin: {
        useAsTitle: "title",
        defaultColumns: [
            "title",
            "author",
            "category",
            "status",
            "publishedDate",
        ],
    },

    access: {
        read: () => true,
    },

    fields: [
        {
            name: "title",
            type: "text",
            required: true,
            label: "Blog Title",
        },

        {
            name: "slug",
            type: "text",
            required: true,
            unique: true,
            label: "Slug",
            admin: {
                description:
                    "URL-friendly identifier (e.g. ai-marketing-trends-2026)",
            },
        },

        {
            name: "author",
            type: "relationship",
            relationTo: "users",
            label: "Author",
        },

        {
            name: "category",
            type: "relationship",
            relationTo: "categories",
            label: "Category",
        },

        {
            name: "excerpt",
            type: "textarea",
            required: true,
            label: "Excerpt / Summary",
            admin: {
                description: "Short teaser shown on blog cards.",
            },
        },

        {
            name: "featuredImage",
            type: "upload",
            relationTo: "media",
            required: true,
            label: "Featured Image",
        },

        {
            name: "content",
            type: "blocks",
            label: "Blog Content",
            required: true,

            blocks: [
                {
                    slug: "text",

                    labels: {
                        singular: "Text",
                        plural: "Text Blocks",
                    },

                    fields: [
                        {
                            name: "content",
                            type: "richText",
                            required: true,

                            editor: lexicalEditor({
                                features: ({ rootFeatures }) => [
                                    ...rootFeatures,

                                    HeadingFeature({
                                        enabledHeadingSizes: ["h2", "h3", "h4"],
                                    }),

                                    FixedToolbarFeature(),

                                    InlineToolbarFeature(),

                                    LinkFeature(),
                                ],
                            }),
                        },
                    ],
                },

                {
                    slug: "image",

                    labels: {
                        singular: "Image",
                        plural: "Images",
                    },

                    fields: [
                        {
                            name: "image",
                            type: "upload",
                            relationTo: "media",
                            required: true,
                        },

                        {
                            name: "caption",
                            type: "text",
                        },
                    ],
                },
            ],
        },

        {
            name: "tags",
            type: "text",
            hasMany: true,
            label: "Tags",
        },

        {
            name: "readTime",
            type: "text",
            label: "Read Time (e.g. 5 min read)",
        },

        {
            name: "status",
            type: "select",
            defaultValue: "draft",

            options: [
                {
                    label: "Draft",
                    value: "draft",
                },
                {
                    label: "Published",
                    value: "published",
                },
            ],

            required: true,

            admin: {
                position: "sidebar",
            },
        },

        {
            name: "publishedDate",
            type: "date",

            label: "Published Date",

            admin: {
                position: "sidebar",
            },
        },
    ],
};