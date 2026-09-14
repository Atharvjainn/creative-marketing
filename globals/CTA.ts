import type { GlobalConfig } from 'payload'

export const CTA: GlobalConfig = {
    slug: 'cta',

    fields: [
        {
            name: 'heading',
            type: 'textarea',
            required: true,
        },
        {
            name: 'primaryButton',
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
        {
            name: 'secondaryButton',
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
        {
            name: 'email',
            type: 'email',
        },
    ],
}