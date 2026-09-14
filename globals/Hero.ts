import type { GlobalConfig } from 'payload'
import { sectionControlFields } from './shared/sectionControls'

export const Hero: GlobalConfig = {
    slug: 'hero',

    fields: [
        ...sectionControlFields,
        {
            name: 'heading',
            type: 'text',
            required: true,
        },
        {
            name: 'trustText',
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
            name: 'avatars',
            type: 'array',
            fields: [
                {
                    name: 'image',
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
                description: 'Custom background glowing disc visual (optional)',
            },
        },
    ],
}