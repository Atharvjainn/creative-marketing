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