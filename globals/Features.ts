import type { GlobalConfig } from 'payload'
import { sectionControlFields } from './shared/sectionControls'

export const Features: GlobalConfig = {
    slug: 'features',

    fields: [
        ...sectionControlFields,
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