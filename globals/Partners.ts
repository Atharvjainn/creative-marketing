import type { GlobalConfig } from 'payload'

export const Partners: GlobalConfig = {
    slug: 'partners',

    fields: [
        {
            name: 'eyebrow',
            type: 'text',
            required: true,
            defaultValue: 'OUR PARTNERS',
        },
        {
            name: 'heading',
            type: 'text',
            required: true,
        },
        {
            name: 'partners',
            type: 'array',
            fields: [
                {
                    name: 'name',
                    type: 'text',
                    required: true,
                },
                {
                    name: 'logo',
                    type: 'upload',
                    relationTo: 'media',
                    required: true,
                },
            ],
        },
    ],
}