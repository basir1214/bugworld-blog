# 🐛 BugWorld — Entomology Blog Platform

A production-ready, SEO-optimized blogging platform for entomology content with **AI-powered daily article generation**, dark mode, and monetization integrations.

![BugWorld Banner](https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1200&h=400&fit=crop)

## ✨ Features

- **Modern UI** — Nature-inspired design with Tailwind CSS, Framer Motion animations, dark mode
- **SEO Optimized** — Meta tags, OpenGraph, structured data (JSON-LD), sitemap.xml, robots.txt
- **AI Article Generation** — Daily automated articles via OpenRouter API (Claude/GPT)
- **Markdown CMS** — Simple file-based content management, no external service needed
- **Categories** — 10 entomology categories with filtering
- **Newsletter** — Email capture with Mailchimp integration
- **Monetization** — Google AdSense placeholders + Amazon affiliate links in articles
- **Responsive** — Mobile-first design that works on all devices
- **Performance** — Next.js 15 with App Router, image optimization, static generation

---

## 🚀 Quick Start

### 1. Install Dependencies
```bash
cd insect-blog
npm install
```

### 2. Configure Environment
```bash
cp .env.example .env.local
# Edit .env.local with your API keys (see Environment Variables section)
```

### 3. Generate Sample Articles (optional, 3 already included)
```bash
npm run generate-article
```

### 4. Start Development Server
```bash
npm run dev
# Open http://localhost:3000
```

---

## 📁 Project Structure

```
insect-blog/
├── app/                          # Next.js App Router
│   ├── layout.tsx                # Root layout with ThemeProvider
│   ├── page.tsx                  # Homepage
│   ├── globals.css               # Global styles + article typography
│   ├── sitemap.ts                # Auto-generated sitemap
│   ├── robots.ts                 # Robots.txt configuration
│   ├── blog/
│   │   ├── page.tsx              # Blog listing page
│   │   └── [slug]/page.tsx       # Individual article pages
│   ├── category/
│   │   └── [category]/page.tsx   # Category listing pages
│   └── api/
│       ├── generate-article/     # AI article generation endpoint
│       └── newsletter/           # Newsletter subscription endpoint
│
├── components/
│   ├── layout/
│   │   ├── Header.tsx            # Responsive header with dark mode toggle
│   │   └── Footer.tsx            # Footer with links
│   ├── home/
│   │   ├── Hero.tsx              # Full-screen animated hero
│   │   ├── FeaturedPosts.tsx     # Featured articles grid
│   │   ├── CategoryGrid.tsx      # Category browsing grid
│   │   └── Newsletter.tsx        # Email signup section
│   ├── blog/
│   │   ├── PostCard.tsx          # Article card (4 variants)
│   │   ├── TableOfContents.tsx   # Sticky TOC with active tracking
│   │   ├── AuthorSection.tsx     # Author bio block
│   │   ├── RelatedPosts.tsx      # Related articles section
│   │   └── AffiliateSection.tsx  # Affiliate product links
│   ├── ads/
│   │   └── AdUnit.tsx            # Google AdSense unit (with placeholder)
│   └── ui/
│       ├── Badge.tsx             # Category/tag badges
│       ├── Button.tsx            # Button component
│       └── Card.tsx              # Card container
│
├── content/
│   └── articles/                 # Markdown articles (CMS)
│       ├── the-secret-life-of-ant-colonies.md
│       ├── monarch-butterfly-migration-mystery.md
│       └── beetles-most-successful-animal-group.md
│
├── lib/
│   ├── posts.ts                  # Article reading/parsing utilities
│   ├── seo.ts                    # SEO metadata generators
│   └── utils.ts                  # Helper functions
│
├── scripts/
│   └── generate-article.ts       # CLI article generation script
│
├── types/
│   └── index.ts                  # TypeScript types + category definitions
│
├── .github/
│   └── workflows/
│       └── daily-article.yml     # GitHub Actions daily cron job
│
├── .env.example                  # Environment variables template
├── .env.local                    # Your local config (gitignored)
├── vercel.json                   # Vercel cron + function config
├── next.config.ts                # Next.js configuration
├── tailwind.config.ts            # Tailwind + custom colors
└── package.json
```

---

## 🔑 Environment Variables

Copy `.env.example` to `.env.local` and fill in your values:

| Variable | Required | Description |
|----------|----------|-------------|
| `OPENROUTER_API_KEY` | **Yes** | OpenRouter API key for AI article generation |
| `NEXT_PUBLIC_SITE_URL` | Yes | Your production URL (e.g., `https://bugworld.vercel.app`) |
| `NEXT_PUBLIC_SITE_NAME` | Yes | Site name shown in metadata |
| `CRON_SECRET` | Yes | Secret string to authenticate cron job requests |
| `MAILCHIMP_API_KEY` | No | Mailchimp API key for newsletter |
| `MAILCHIMP_LIST_ID` | No | Mailchimp audience/list ID |
| `MAILCHIMP_SERVER_PREFIX` | No | Mailchimp server (e.g., `us1`) |
| `NEXT_PUBLIC_ADSENSE_ID` | No | Google AdSense publisher ID |

---

## 🤖 AI Article Generation

### Manual Generation (CLI)
```bash
# Generate a random topic article
npm run generate-article

# Generate a specific topic
npm run generate-article -- 0 "The fascinating life cycle of dung beetles" "Beetles"

# Topics 0-9 index the default topic list
npm run generate-article -- 3   # Generates bee pollination article
```

### Via API (for automation)
```bash
# POST to the generation endpoint
curl -X POST http://localhost:3000/api/generate-article \
  -H "Authorization: Bearer your-cron-secret" \
  -H "Content-Type: application/json" \
  -d '{"topic": "Firefly bioluminescence", "category": "Fascinating Facts"}'
```

### Automatic Daily Generation
Two options are available (choose one):

**Option A — Vercel Cron** (configured in `vercel.json`):
- Runs automatically at 8:00 AM UTC daily on Vercel Pro/Team plans
- No additional setup needed after deployment

**Option B — GitHub Actions** (configured in `.github/workflows/daily-article.yml`):
- Works on free plans
- Add `OPENROUTER_API_KEY` to your GitHub repository secrets
- Articles are committed directly to the repository, triggering Vercel auto-deployment

---

## 📦 GitHub Repository Setup

```bash
cd insect-blog

# Initialize git
git init
git add .
git commit -m "🚀 Initial commit: BugWorld entomology blog"

# Create GitHub repository (replace with your details)
gh repo create bugworld-blog --public --source=. --remote=origin --push
# OR
git remote add origin https://github.com/yourusername/bugworld-blog.git
git branch -M main
git push -u origin main
```

### Add GitHub Secrets
Go to **Settings → Secrets and Variables → Actions** and add:
- `OPENROUTER_API_KEY` — your OpenRouter key
- `NEXT_PUBLIC_SITE_URL` — your Vercel URL after deployment

---

## 🚀 Vercel Deployment

### Option A: Deploy Button
[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new)

### Option B: CLI
```bash
npm install -g vercel
vercel login

# Deploy to production
vercel --prod
```

### Option C: GitHub Integration (Recommended)
1. Push code to GitHub
2. Go to [vercel.com](https://vercel.com) → New Project
3. Import your GitHub repository
4. Add environment variables in Vercel dashboard
5. Deploy

### Environment Variables in Vercel
Add all variables from `.env.example` in **Settings → Environment Variables**.

---

## 💰 Monetization Setup

### Google AdSense
1. Apply at [adsense.google.com](https://adsense.google.com)
2. Once approved, add your Publisher ID to `NEXT_PUBLIC_ADSENSE_ID`
3. Uncomment the AdSense script tag in `app/layout.tsx`
4. The `AdUnit` component will automatically activate

Ad placements are already configured at:
- Homepage (between sections)
- Blog list page (between article rows)
- Article pages (sidebar + inline)

### Amazon Affiliates
1. Join the [Amazon Associates program](https://affiliate-program.amazon.com)
2. Replace the placeholder Amazon links in generated articles with your tagged affiliate URLs
3. Add your affiliate tag to the article generation script in `scripts/generate-article.ts`

### Newsletter Monetization
1. Set up Mailchimp (free up to 500 subscribers)
2. Add your API credentials to environment variables
3. Consider sponsored newsletter content once you reach 1,000+ subscribers

---

## 📈 SEO Configuration

The platform includes:
- **Automatic sitemaps** at `/sitemap.xml` (updates with each new article)
- **Robots.txt** at `/robots.txt`
- **JSON-LD structured data** on every article (Article schema)
- **Open Graph tags** for social sharing
- **Twitter Card** metadata
- **Canonical URLs** on all pages

To index your site:
1. Submit sitemap to [Google Search Console](https://search.console.google.com)
2. Submit to [Bing Webmaster Tools](https://www.bing.com/webmasters)

---

## 🎨 Customization

### Colors
Edit `tailwind.config.ts` to change the color palette. The current palette uses:
- `forest` — Primary greens (buttons, links, accents)
- `earth` — Warm browns (secondary accents)
- `moss` — Muted greens (backgrounds)

### Adding Articles Manually
Create a file in `content/articles/your-slug.md` with this frontmatter:
```markdown
---
title: "Your Article Title"
excerpt: "Brief description"
category: "Beetles"  # Must match a category in types/index.ts
tags: ["beetles", "ecology"]
publishedAt: "2024-03-15T08:00:00.000Z"
coverImage: "https://your-image-url.jpg"
featured: false
author:
  name: "Author Name"
  avatar: "https://avatar-url.jpg"
  bio: "Author bio"
  role: "Author role"
---

Your article content here in markdown...
```

---

## 🛠 Development Commands

```bash
npm run dev          # Start development server
npm run build        # Production build
npm run start        # Start production server
npm run lint         # Run ESLint
npm run generate-article  # Generate AI article
```

---

## 📊 Recommended Tools

- **Analytics**: [Vercel Analytics](https://vercel.com/analytics) or Google Analytics 4
- **Search Console**: [Google Search Console](https://search.console.google.com)
- **Email**: [Mailchimp](https://mailchimp.com) (free up to 500 subs)
- **AI Generation**: [OpenRouter](https://openrouter.ai) (access to Claude, GPT-4, etc.)
- **Images**: [Unsplash](https://unsplash.com) (free high-quality photos)
- **Domain**: [Namecheap](https://namecheap.com) or [Google Domains](https://domains.google)

---

## 📄 License

MIT License — free to use for personal and commercial projects.

---

*Built with passion for the insect world 🪲 — BugWorld Editorial Team*
