import type { GlobalConfig } from 'payload'

export const KeyFeatures: GlobalConfig = {
    slug: 'key-features',

    fields: [
        {
            name: 'eyebrow',
            type: 'text',
            required: true,
            defaultValue: 'ABOUT OUR PLATFORM',
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
                    name: 'number',
                    type: 'text',
                    required: true,
                },
                {
                    name: 'label',
                    type: 'text',
                    required: true,
                },
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
                {
                    name: 'imageLeft',
                    type: 'checkbox',
                    defaultValue: false,
                },
                {
                    name: 'button',
                    type: 'group',
                    fields: [
                        {
                            name: 'label',
                            type: 'text',
                            defaultValue: 'Get Started',
                        },
                        {
                            name: 'url',
                            type: 'text',
                            defaultValue: '#',
                        },
                    ],
                },
            ],
        },
    ],
}