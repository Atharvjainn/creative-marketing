import type { GlobalConfig } from 'payload'

export const Testimonials: GlobalConfig = {
    slug: 'testimonials',

    fields: [
        {
            name: 'eyebrow',
            type: 'text',
            required: true,
            defaultValue: 'TESTIMONIALS',
        },
        {
            name: 'heading',
            type: 'text',
            required: true,
        },
        {
            name: 'items',
            type: 'array',
            fields: [
                {
                    name: 'name',
                    type: 'text',
                    required: true,
                },
                {
                    name: 'role',
                    type: 'text',
                    required: true,
                },
                {
                    name: 'quote',
                    type: 'textarea',
                    required: true,
                },
                {
                    name: 'avatar',
                    type: 'upload',
                    relationTo: 'media',
                },
            ],
        },
    ],
}