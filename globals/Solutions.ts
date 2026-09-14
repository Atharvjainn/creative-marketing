import type { GlobalConfig } from 'payload'

export const Solutions: GlobalConfig = {
    slug: 'solutions',

    fields: [
        {
            name: 'eyebrow',
            type: 'text',
            required: true,
            defaultValue: 'SOLUTIONS',
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
    ],
}