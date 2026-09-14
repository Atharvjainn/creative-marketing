import type { GlobalConfig } from 'payload'

export const Footer: GlobalConfig = {
    slug: 'footer',

    fields: [
        {
            name: 'brandName',
            type: 'text',
            required: true,
        },
        {
            name: 'email',
            type: 'email',
            required: true,
        },
        {
            name: "backgroundImage",
            type: "upload",
            relationTo: "media",
            required: false,
        },
        {
            name: 'menuLinks',
            type: 'array',
            fields: [
                {
                    name: 'label',
                    type: 'text',
                    required: true,
                },
                {
                    name: 'url',
                    type: 'text',
                    required: true,
                },
            ],
        },
        {
            name: 'socialLinks',
            type: 'array',
            fields: [
                {
                    name: 'label',
                    type: 'text',
                    required: true,
                },
                {
                    name: 'url',
                    type: 'text',
                    required: true,
                },
            ],
        },
        {
            name: 'copyright',
            type: 'text',
            required: true,
        },
    ],
}