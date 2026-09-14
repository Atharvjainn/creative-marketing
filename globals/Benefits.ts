import type { GlobalConfig } from 'payload'

export const Benefits: GlobalConfig = {
    slug: 'benefits',

    fields: [
        {
            name: 'eyebrow',
            type: 'text',
            required: true,
            defaultValue: 'BENEFITS',
        },
        {
            name: 'heading',
            type: 'textarea',
            required: true,
        },
        {
            name: 'stats',
            type: 'array',
            fields: [
                {
                    name: 'value',
                    type: 'text',
                    required: true,
                },
                {
                    name: 'label',
                    type: 'text',
                    required: true,
                },
            ],
        },
    ],
}