import type { GlobalConfig } from 'payload'

export const Header: GlobalConfig = {
    slug: 'header',

    fields: [
        {
            name: 'brandName',
            type: 'text',
            required: true,
        },
        {
            name: 'navigation',
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
}