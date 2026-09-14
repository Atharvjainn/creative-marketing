import { postgresAdapter } from '@payloadcms/db-postgres'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import path from 'path'
import { buildConfig } from 'payload'
import { fileURLToPath } from 'url'
import sharp from 'sharp'
import { Solutions } from './globals/Solutions'
import { Hero } from './globals/Hero'
import { Partners } from './globals/Partners'
import { Features } from './globals/Features'
import { KeyFeatures } from './globals/KeyFeatures'
import { BusinessSolutions } from './globals/BusinessSolutions'
import { Benefits } from './globals/Benefits'

import { Users } from './collections/Users'
import { Media } from './collections/Media'
import { Categories } from './collections/Categories'
import { Projects } from './collections/Projects'
import { Testimonials } from './globals/Testimonials'
import { Pricing } from './globals/Pricing'
import { CTA } from './globals/CTA'
import { Footer } from './globals/Footer'
import { Header } from './globals/Header'
import { SiteSettings } from './globals/SiteSettings'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
    meta: {
      titleSuffix: '— Creative Marketing CMS',
      description: 'Creative Marketing Agency Content Management Platform',
    },
    components: {
      graphics: {
        Logo: './components/admin/Logo',
        Icon: './components/admin/Icon',
      },
      beforeDashboard: ['./components/admin/DashboardBanner'],
    },
  },
  collections: [Users, Media, Categories, Projects],
  globals: [SiteSettings, Solutions, Hero, Partners, Features, KeyFeatures, BusinessSolutions, Benefits, Testimonials, Pricing, CTA, Footer, Header],
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || 'creativemarketing_payload_secret_key_2026_secure',
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  db: postgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URI || '',
    },
  }),
  sharp,
})
