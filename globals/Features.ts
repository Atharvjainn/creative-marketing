import type { GlobalConfig } from 'payload'

export const Features: GlobalConfig = {
    slug: 'features',

    fields: [
        {
            name: 'eyebrow',
            type: 'text',
            required: true,
            defaultValue: 'FEATURES',
        },
        {
            name: 'heading',
            type: 'text',
            required: true,
        },
        {
            name: 'description',
            type: 'textarea',
            required: true,
        },
        {
            name: 'items',
            type: 'array',
            fields: [
                {
                    name: 'title',
                    type: 'text',
                    required: true,
                },
                {
                    name: 'description',
                    type: 'textarea',
                    required: true,
                },
                {
                    name: 'image',
                    type: 'upload',
                    relationTo: 'media',
                    required: true,
                },
            ],
        },
    ],
}