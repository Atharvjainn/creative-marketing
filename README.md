# Creative Marketing

A marketing agency landing page built with **Next.js 16** (App Router) and **Payload CMS 3**. Every section of the page (Hero, Features, Pricing, Testimonials, etc.) is content-managed through the Payload admin panel — no copy is hardcoded in the components.

## Tech Stack

- **Framework:** Next.js 16.3.3 (App Router) + React 19.2.8
- **CMS:** Payload CMS 3.89 (`@payloadcms/next`, `@payloadcms/richtext-lexical`)
- **Database:** PostgreSQL (`@payloadcms/db-postgres`)
- **Styling:** Tailwind CSS v4
- **Animation:** GSAP, Lenis (smooth scroll)
- **Image processing:** Sharp
- **Language:** TypeScript

## Project Structure

```
app/
  (app)/
    page.tsx, layout.tsx, globals.css   → public marketing homepage
    blog/page.tsx                       → blog listing (published posts only)
    blog/[slug]/page.tsx                → single blog post page
  (payload)/         → Payload admin UI (/admin) + REST & GraphQL API routes
collections/          → Users, Media, Categories, Projects, Blogs
globals/              → one config per landing page section (Hero, Features, Pricing, etc.) + SiteSettings, Header
components/           → React components matching each global/section
lib/payload.ts        → server-side Payload client helper
payload.config.ts     → main Payload config
payload-types.ts      → auto-generated types (do not edit by hand)
```

## Content Model

**Collections**
- `users` — admin/editor accounts (auth-enabled login for the `/admin` panel)
- `media` — file/image uploads, used by any global/collection that needs an image
- `categories` — shared taxonomy (name + slug + description), used by both Blogs and Projects
- `projects` — case studies (client, summary, cover image, gallery, services, metrics, testimonial, rich-text narrative, featured flag, draft/published status). No public listing page exists yet — currently editable/readable via the admin panel and API only.
- `blogs` — blog posts (title, slug, author, category, excerpt, featured image, block-based content with text/image blocks, tags, read time, draft/published status, published date). Powers the public `/blog` routes.

**Globals** (one editable "page section" each, no separate entries/list — just one record per section)
Site Settings (SEO/meta), Header, Hero, Solutions, Partners, Features, Key Features, Business Solutions, Benefits, Testimonials, Pricing, CTA, Footer

---

## Getting Started

### 1. Prerequisites

- Node.js 20+
- A PostgreSQL database — [Neon](https://neon.tech) is the easiest free option, or use local Postgres/Supabase

### 2. Clone and install

```bash
git clone https://github.com/Atharvjainn/creative-marketing.git
cd creative-marketing
npm install
```

### 3. Set up environment variables

Create a `.env` file in the project root:

```
DATABASE_URI=your_postgres_connection_string
PAYLOAD_SECRET=your_random_secret_string
```

- **`DATABASE_URI`** — your Postgres connection string.
  Example (Neon): `postgresql://user:password@host/dbname?sslmode=require`
- **`PAYLOAD_SECRET`** — any long random string; Payload uses it to sign auth tokens/cookies. Generate one with:

  ```bash
  node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
  ```

Never commit `.env` — it's already in `.gitignore`.

### 4. Run the dev server

```bash
npm run dev
```

- Public site → http://localhost:3000
- Payload admin → http://localhost:3000/admin

On your first visit to `/admin`, Payload will prompt you to create your first admin user (name, email, password). This account logs you into the CMS going forward.

---

## How to Use (editing site content)

1. Log in at `/admin` with your admin account.
2. In the sidebar, under **Globals**, you'll see one entry per page section (Hero, Features, Pricing, etc.). Click any of them to edit that section's text, images, and buttons — changes save directly to Postgres.
3. To add/replace images, go to the **Media** collection (or upload inline from a global's image field) — files are stored in the `media/` folder.
4. To manage admin/editor accounts, use the **Users** collection.
5. Refresh the public site (http://localhost:3000) to see your changes — the homepage fetches globals live on each request (`export const dynamic = "force-dynamic"` in `app/(app)/page.tsx`), so there's no rebuild or cache to bust in dev.

### Adding a blog post

1. In `/admin`, go to the **Categories** collection first (if the post needs a category) and create one — `name` + `slug`.
2. Go to the **Blogs** collection → **Create New**. Fill in `title`, `slug` (URL-friendly, e.g. `ai-marketing-trends-2026`), `excerpt`, and a **Featured Image**.
3. Build the post body under **Blog Content** using `text` blocks (rich text) and `image` blocks, in any order/combination.
4. Optionally set `author`, `category`, `tags`, and `readTime`.
5. Set **Status** to `Published` and add a **Published Date** to make it appear on the site — draft posts are excluded from `/blog`.
6. View it at `http://localhost:3000/blog` (listing) and `http://localhost:3000/blog/<slug>` (detail page).

### Public routes

| Route | Description |
|---|---|
| `/` | Homepage (all globals) |
| `/blog` | Published blog posts, newest first |
| `/blog/[slug]` | Single blog post |
| `/admin` | Payload CMS admin panel |

> **Note:** The `projects` collection exists in the schema (for case studies) but doesn't have public-facing routes yet — it's editable via `/admin` and queryable via the API, but there's no `/projects` or `/projects/[slug]` page in `app/(app)/` yet.

### Regenerating types

Whenever you change a collection or global's fields in code, regenerate types and the admin import map so TypeScript and the admin UI stay in sync:

```bash
npm run generate:types
npm run generate:importmap
```

## Available Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start the dev server |
| `npm run build` | Production build |
| `npm run start` | Start the production server (after `build`) |
| `npm run lint` | Run ESLint |
| `npm run generate:types` | Regenerate `payload-types.ts` from collections/globals |
| `npm run generate:importmap` | Regenerate the Payload admin import map |

## Deployment Notes

- Set `DATABASE_URI` and `PAYLOAD_SECRET` as environment variables on your hosting provider (Vercel, etc.) — do not commit `.env` files, and replace the hardcoded fallback secret in `payload.config.ts` before going live.
- Uploaded media is currently stored locally (`staticDir: "media"`) — fine for local testing, but this won't persist on platforms with an ephemeral filesystem (like Vercel). Before deploying, switch to a cloud storage adapter such as **Cloudinary** (`@payloadcms/storage-cloudinary`) or **S3** (`@payloadcms/storage-s3`) so uploads survive redeploys.
- If you add new image domains for remote images, update `remotePatterns` in `next.config.ts`.