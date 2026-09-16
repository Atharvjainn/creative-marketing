import type { GlobalConfig } from 'payload'
import { sectionControlFields } from './shared/sectionControls'

export const Partners: GlobalConfig = {
    slug: 'partners',

    fields: [
        ...sectionControlFields,
        {
            name: 'eyebrow',
            type: 'text',
            required: true,
            defaultValue: 'OUR PARTNERS',
        },
        {
            name: 'heading',
            type: 'textarea',
            required: true,
            defaultValue: 'Collaborating with\nleading brands\nworldwide.',
            admin: {
                description: 'Partners section heading (support multiple lines)',
            },
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
        {
            name: 'backgroundImage',
            type: 'upload',
            relationTo: 'media',
            admin: {
                description: 'Custom background disc overlay (optional)',
            },
        },
    ],
}