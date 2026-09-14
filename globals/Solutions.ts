import type { GlobalConfig } from 'payload'
import { sectionControlFields } from './shared/sectionControls'

export const Solutions: GlobalConfig = {
    slug: 'solutions',

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
            name: 'backgroundImage',
            type: 'upload',
            relationTo: 'media',
            admin: {
                description: 'Custom background disc overlay (optional)',
            },
        },
        {
            name: 'dashboardImage',
            type: 'upload',
            relationTo: 'media',
            admin: {
                description: 'Dashboard mockup screenshot inside the browser frame (optional)',
            },
        },
    ],
}