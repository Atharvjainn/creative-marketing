import type { GlobalConfig } from 'payload'

export const Pricing: GlobalConfig = {
    slug: 'pricing',

    fields: [
        {
            name: 'eyebrow',
            type: 'text',
            required: true,
            defaultValue: 'PRICING',
        },
        {
            name: 'heading',
            type: 'text',
            required: true,
        },
        {
            name: 'plans',
            type: 'array',
            fields: [
                {
                    name: 'name',
                    type: 'text',
                    required: true,
                },
                {
                    name: 'tagline',
                    type: 'textarea',
                    required: true,
                },
                {
                    name: 'price',
                    type: 'text',
                    required: true,
                },
                {
                    name: 'period',
                    type: 'text',
                    defaultValue: '/mo',
                },
                {
                    name: 'highlight',
                    type: 'checkbox',
                    defaultValue: false,
                },
                {
                    name: 'features',
                    type: 'array',
                    fields: [
                        {
                            name: 'feature',
                            type: 'text',
                            required: true,
                        },
                    ],
                },
                {
                    name: 'cta',
                    type: 'group',
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
            ],
        },
    ],
}