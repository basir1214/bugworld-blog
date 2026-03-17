import { NextRequest, NextResponse } from 'next/server'
import fs from 'fs'
import path from 'path'
import { DEFAULT_AUTHOR } from '@/types'

const ARTICLES_DIR = path.join(process.cwd(), 'content/articles')

const TOPICS = [
  { category: 'Beetles', topic: 'The incredible diversity of beetle species and their ecological roles' },
  { category: 'Butterflies', topic: 'The science of butterfly metamorphosis and migration patterns' },
  { category: 'Ants', topic: 'How ant colonies function as superorganisms with complex social structures' },
  { category: 'Bees & Wasps', topic: 'The critical role of bees in pollination and global food security' },
  { category: 'Ecology', topic: 'Insects as ecosystem engineers: decomposition, nutrient cycling, and soil health' },
  { category: 'Pest Control', topic: 'Integrated pest management: biological control methods that work' },
  { category: 'Insect Behavior', topic: 'Chemical communication in insects: pheromones and their remarkable precision' },
  { category: 'Evolution', topic: "Insects' 400-million-year evolutionary success story" },
  { category: 'Fascinating Facts', topic: 'Record-breaking insects: the biggest, fastest, strongest species on Earth' },
  { category: 'Conservation', topic: 'The global insect decline crisis and what we can do about it' },
  { category: 'Beetles', topic: 'Dung beetles: the unsung heroes of nutrient recycling' },
  { category: 'Butterflies', topic: 'Monarch butterfly migration: one of nature\'s greatest journeys' },
  { category: 'Ants', topic: 'Leafcutter ants and their ancient fungus farming civilization' },
  { category: 'Bees & Wasps', topic: 'Solitary bees: the overlooked pollinators that need our protection' },
  { category: 'Insect Behavior', topic: 'Firefly bioluminescence: the chemistry behind nature\'s light show' },
  { category: 'Ecology', topic: 'How insects shape plant evolution through pollination pressure' },
  { category: 'Pest Control', topic: 'Natural predators as pest control: ladybugs, lacewings, and parasitic wasps' },
  { category: 'Fascinating Facts', topic: 'Insects that survive extreme environments: from Arctic cold to desert heat' },
  { category: 'Evolution', topic: 'The co-evolution of flowering plants and insect pollinators' },
  { category: 'Conservation', topic: 'Creating insect-friendly gardens: plants and habitats that support biodiversity' },
]

const COVER_IMAGES: Record<string, string> = {
  Beetles: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1200&h=630&fit=crop',
  Butterflies: 'https://images.unsplash.com/photo-1444927714506-8492d94b4e3d?w=1200&h=630&fit=crop',
  Ants: 'https://images.unsplash.com/photo-1509099836639-18ba1795216d?w=1200&h=630&fit=crop',
  'Bees & Wasps': 'https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=1200&h=630&fit=crop',
  Ecology: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=1200&h=630&fit=crop',
  'Pest Control': 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=1200&h=630&fit=crop',
  'Insect Behavior': 'https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=1200&h=630&fit=crop',
  Evolution: 'https://images.unsplash.com/photo-1532634896-26909d0d4b9c?w=1200&h=630&fit=crop',
  'Fascinating Facts': 'https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=1200&h=630&fit=crop',
  Conservation: 'https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?w=1200&h=630&fit=crop',
}

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
    .slice(0, 60)
}

function getTodaysTopic() {
  const dayOfYear = Math.floor(
    (Date.now() - new Date(new Date().getFullYear(), 0, 0).getTime()) / 86400000
  )
  return TOPICS[dayOfYear % TOPICS.length]
}

async function generateArticleWithAI(topic: string, category: string): Promise<string> {
  const apiKey = process.env.OPENROUTER_API_KEY

  if (!apiKey) {
    throw new Error('OPENROUTER_API_KEY is not set')
  }

  const prompt = `You are an expert entomologist and science writer. Write a high-quality, SEO-optimized blog article for an entomology website.

Topic: ${topic}
Category: ${category}

Requirements:
- Length: 900-1100 words
- Use proper markdown formatting with ## and ### headings
- Include fascinating scientific facts with specific data/statistics
- Write in an engaging, authoritative but accessible tone
- Include 2-3 interesting examples or case studies
- Add a practical takeaway or conclusion
- Naturally incorporate relevant keywords for SEO

IMPORTANT: Return ONLY the markdown content of the article body (no frontmatter, no title at the top). Start directly with the introduction paragraph.`

  const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
      'HTTP-Referer': process.env.NEXT_PUBLIC_SITE_URL || 'https://bugworld.vercel.app',
      'X-Title': 'BugWorld Blog',
    },
    body: JSON.stringify({
      model: 'anthropic/claude-3-haiku',
      messages: [{ role: 'user', content: prompt }],
      max_tokens: 2000,
      temperature: 0.7,
    }),
  })

  if (!response.ok) {
    const error = await response.text()
    throw new Error(`OpenRouter API error: ${response.status} - ${error}`)
  }

  const data = await response.json()
  return data.choices[0].message.content
}

async function generateTitleAndMeta(topic: string, content: string, category: string) {
  const apiKey = process.env.OPENROUTER_API_KEY

  const prompt = `Based on this entomology article about "${topic}", generate:
1. An SEO-optimized title (60-70 chars, compelling, includes main keyword)
2. A meta description (150-160 chars, includes keyword, compelling CTA)
3. A short excerpt (2-3 sentences summarizing the article)
4. 5-7 relevant tags (comma-separated)

Article preview: ${content.slice(0, 300)}

Return as JSON:
{
  "title": "...",
  "metaDescription": "...",
  "excerpt": "...",
  "tags": ["tag1", "tag2", ...]
}`

  const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
      'HTTP-Referer': process.env.NEXT_PUBLIC_SITE_URL || 'https://bugworld.vercel.app',
      'X-Title': 'BugWorld Blog',
    },
    body: JSON.stringify({
      model: 'anthropic/claude-3-haiku',
      messages: [{ role: 'user', content: prompt }],
      max_tokens: 500,
      temperature: 0.5,
    }),
  })

  if (!response.ok) {
    throw new Error('Failed to generate metadata')
  }

  const data = await response.json()
  try {
    const text = data.choices[0].message.content
    const jsonMatch = text.match(/\{[\s\S]*\}/)
    if (jsonMatch) return JSON.parse(jsonMatch[0])
  } catch {
    // Fall back to defaults
  }

  return {
    title: topic,
    metaDescription: `Discover fascinating facts about ${topic} in this expert entomology guide.`,
    excerpt: `Explore the fascinating world of ${topic} with scientific insights and expert analysis.`,
    tags: [category.toLowerCase(), 'entomology', 'insects'],
  }
}

export async function POST(req: NextRequest) {
  // Verify cron secret
  const authHeader = req.headers.get('authorization')
  const cronSecret = process.env.CRON_SECRET

  if (cronSecret && authHeader !== `Bearer ${cronSecret}`) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    // Get today's topic or allow override via request body
    let topicData = getTodaysTopic()

    try {
      const body = await req.json()
      if (body.topic && body.category) {
        topicData = { topic: body.topic, category: body.category }
      }
    } catch {
      // Use default topic
    }

    const { topic, category } = topicData
    console.log(`Generating article about: ${topic} (${category})`)

    // Generate article content
    const content = await generateArticleWithAI(topic, category)

    // Generate metadata
    const meta = await generateTitleAndMeta(topic, content, category)

    // Build slug
    const slug = `${slugify(meta.title)}-${Date.now()}`

    // Build frontmatter
    const frontmatter = `---
title: "${meta.title.replace(/"/g, '\\"')}"
excerpt: "${meta.excerpt.replace(/"/g, '\\"')}"
metaTitle: "${meta.title.replace(/"/g, '\\"')}"
metaDescription: "${meta.metaDescription.replace(/"/g, '\\"')}"
category: "${category}"
tags: ${JSON.stringify(meta.tags)}
publishedAt: "${new Date().toISOString()}"
coverImage: "${COVER_IMAGES[category] || COVER_IMAGES['Fascinating Facts']}"
author:
  name: "${DEFAULT_AUTHOR.name}"
  avatar: "${DEFAULT_AUTHOR.avatar}"
  bio: "${DEFAULT_AUTHOR.bio}"
  role: "${DEFAULT_AUTHOR.role}"
featured: false
affiliateLinks:
  - title: "Field Guide to Insects of North America"
    url: "https://amazon.com/s?k=insect+field+guide"
    description: "Essential reference for identifying insects in the wild"
  - title: "Professional Entomology Equipment Kit"
    url: "https://amazon.com/s?k=entomology+equipment"
    description: "High-quality tools for insect collection and study"
---

`

    const fullContent = frontmatter + content

    // Ensure articles directory exists
    if (!fs.existsSync(ARTICLES_DIR)) {
      fs.mkdirSync(ARTICLES_DIR, { recursive: true })
    }

    // Save file
    const filePath = path.join(ARTICLES_DIR, `${slug}.md`)
    fs.writeFileSync(filePath, fullContent, 'utf-8')

    console.log(`Article saved: ${filePath}`)

    return NextResponse.json({
      success: true,
      slug,
      title: meta.title,
      category,
      filePath,
      message: 'Article generated and saved successfully!',
    })
  } catch (error) {
    console.error('Article generation failed:', error)
    return NextResponse.json(
      {
        error: 'Failed to generate article',
        details: error instanceof Error ? error.message : String(error),
      },
      { status: 500 }
    )
  }
}

export async function GET(req: NextRequest) {
  // Convenience: allow GET requests with secret in header (for testing)
  return POST(req)
}
