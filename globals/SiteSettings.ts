import type { GlobalConfig } from 'payload';

export const SiteSettings: GlobalConfig = {
  slug: 'site-settings',
  label: 'Site Settings & SEO',
  fields: [
    {
      name: 'siteName',
      type: 'text',
      defaultValue: 'Creative Marketing Agency',
      required: true,
      admin: {
        description: 'Main brand/business name',
      },
    },
    {
      name: 'metaTitle',
      type: 'text',
      defaultValue: 'Creative Marketing Agency | Next-Gen AI Marketing Solutions',
      required: true,
      admin: {
        description: 'Default browser tab title and SEO title',
      },
    },
    {
      name: 'metaDescription',
      type: 'textarea',
      defaultValue:
        'Elevate your marketing with AI Solutions. Discover how our AI-driven strategies transform your marketing with unparalleled efficiency.',
      required: true,
      admin: {
        description: 'Search engine preview description',
      },
    },
    {
      name: 'ogImage',
      type: 'upload',
      relationTo: 'media',
      admin: {
        description: 'Social sharing preview image (OpenGraph)',
      },
    },
  ],
};
