import type { GlobalConfig } from 'payload'
import { sectionControlFields } from './shared/sectionControls'

export const BusinessSolutions: GlobalConfig = {
    slug: 'business-solutions',

    fields: [
        ...sectionControlFields,
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