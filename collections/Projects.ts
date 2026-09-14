import type { CollectionConfig } from 'payload'

export const Projects: CollectionConfig = {
  slug: 'projects',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'client', 'category', 'status', 'featured', 'updatedAt'],
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      label: 'Project Title',
    },
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
      label: 'Slug',
      admin: {
        description: 'URL-friendly identifier (e.g. aura-luxe-ai-rebrand)',
      },
    },
    {
      name: 'client',
      type: 'text',
      required: true,
      label: 'Client Name / Brand',
    },
    {
      name: 'category',
      type: 'relationship',
      relationTo: 'categories',
      label: 'Category',
    },
    {
      name: 'summary',
      type: 'textarea',
      required: true,
      label: 'Summary / Excerpt',
      admin: {
        description: 'Short teaser used on cards and showcase previews.',
      },
    },
    {
      name: 'coverImage',
      type: 'upload',
      relationTo: 'media',
      required: true,
      label: 'Cover Image',
    },
    {
      name: 'gallery',
      type: 'array',
      label: 'Project Gallery / Media Showcase',
      fields: [
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media',
          required: true,
        },
        {
          name: 'caption',
          type: 'text',
        },
      ],
    },
    {
      name: 'services',
      type: 'array',
      label: 'Services & Deliverables',
      fields: [
        {
          name: 'service',
          type: 'text',
          required: true,
        },
      ],
    },
    {
      name: 'metrics',
      type: 'array',
      label: 'Key Results & Impact Metrics',
      fields: [
        {
          name: 'value',
          type: 'text',
          required: true,
          label: 'Metric Value (e.g. +340%, 4.8x, $2.4M)',
        },
        {
          name: 'label',
          type: 'text',
          required: true,
          label: 'Metric Label (e.g. ROAS Increase, Pipeline Value)',
        },
        {
          name: 'description',
          type: 'text',
          label: 'Context / Timeframe (e.g. In first 90 days)',
        },
      ],
    },
    {
      name: 'content',
      type: 'richText',
      label: 'Case Study Narrative & Story',
    },
    {
      name: 'testimonial',
      type: 'group',
      label: 'Client Testimonial',
      fields: [
        {
          name: 'quote',
          type: 'textarea',
          label: 'Quote',
        },
        {
          name: 'author',
          type: 'text',
          label: 'Client Name',
        },
        {
          name: 'role',
          type: 'text',
          label: 'Role & Organization',
        },
        {
          name: 'avatar',
          type: 'upload',
          relationTo: 'media',
          label: 'Author Avatar',
        },
      ],
    },
    {
      name: 'year',
      type: 'text',
      label: 'Year',
      defaultValue: '2026',
    },
    {
      name: 'liveUrl',
      type: 'text',
      label: 'Live Campaign / Project URL',
    },
    {
      name: 'featured',
      type: 'checkbox',
      label: 'Feature on Homepage Showcase',
      defaultValue: false,
    },
    {
      name: 'status',
      type: 'select',
      defaultValue: 'draft',
      options: [
        { label: 'Draft', value: 'draft' },
        { label: 'Published', value: 'published' },
      ],
      required: true,
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'publishedDate',
      type: 'date',
      label: 'Published Date',
      admin: {
        position: 'sidebar',
      },
    },
  ],
}
