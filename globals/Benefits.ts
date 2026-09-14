import type { GlobalConfig } from 'payload'
import { sectionControlFields } from './shared/sectionControls'

export const Benefits: GlobalConfig = {
    slug: 'benefits',

    fields: [
        ...sectionControlFields,
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